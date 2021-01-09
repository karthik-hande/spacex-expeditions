import { action, computed, observable, reaction, runInAction } from "mobx";

import { RootStore } from "./rootStore";
import history from "../history";
import { IFilterOption, IActiveFilter, ILaunch } from "./../models";
import api from "./../api/api";

const years = [
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
];

const yearFilters: IFilterOption[] = years.map((y) => ({
  name: y.toString(),
  value: y,
  selected: false,
  type: "year",
}));

const launchStatusFilter: IFilterOption[] = [
  { name: "True", value: 1, selected: false, type: "launch" },
  { name: "False", value: 0, selected: false, type: "launch" },
];

const landingStatusFilter: IFilterOption[] = [
  { name: "True", value: 1, selected: false, type: "land" },
  { name: "False", value: 0, selected: false, type: "land" },
];

export default class SpacexStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.activeFilters,
      () => {
        this.launchDataMap.clear();
        this.loadLaunchData();
      }
    );
  }

  @observable launchDataMap = new Map();

  @observable activeFilters: IActiveFilter = {
    year: null,
    launchStatus: null,
    landingStatus: null,
  };
  @observable yearFilters: IFilterOption[] = yearFilters;
  @observable launchStatusFilter: IFilterOption[] = launchStatusFilter;
  @observable landingStatusFilter: IFilterOption[] = landingStatusFilter;
  @observable loadingLaunchData = false;

  @action setFilterUrl = (filter: IFilterOption) => {
    let activeFilter = { ...this.activeFilters };
    let isSelected = !filter.selected;
    let url = "/dashboard?";

    if (filter.type === "year") {
      activeFilter.year = isSelected ? filter.value : null;
    }

    if (filter.type === "launch") {
      activeFilter.launchStatus = isSelected
        ? filter.value === 1
          ? true
          : false
        : null;
    }

    if (filter.type === "land") {
      activeFilter.landingStatus = isSelected
        ? filter.value === 1
          ? true
          : false
        : null;
    }

    if (activeFilter.year) {
      url = url + `year=${activeFilter.year}&`;
    }
    if (activeFilter.launchStatus !== null) {
      url = url + `launch_success=${activeFilter.launchStatus}&`;
    }
    if (activeFilter.landingStatus !== null) {
      url = url + `land_success=${activeFilter.landingStatus}&`;
    }
    history.push(url.slice(0, -1));
  };

  @action filterParamChanged = (filterParam: IActiveFilter) => {
    this.activeFilters = filterParam;
    this.yearFilters.forEach((y) => (y.selected = false));
    this.landingStatusFilter.forEach((l) => (l.selected = false));
    this.launchStatusFilter.forEach((l) => (l.selected = false));

    if (filterParam.year) {
      let yearOption = this.yearFilters.find(
        (y) => y.value === filterParam.year
      );
      yearOption && (yearOption.selected = !yearOption.selected);
    }

    if (filterParam.launchStatus !== null) {
      let status = filterParam.launchStatus ? 1 : 0;
      let launchOption = this.launchStatusFilter.find(
        (l) => l.value === status
      );
      launchOption && (launchOption.selected = !launchOption.selected);
    }

    if (filterParam.landingStatus !== null) {
      let status = filterParam.landingStatus ? 1 : 0;
      let landingOption = this.landingStatusFilter.find(
        (l) => l.value === status
      );
      landingOption && (landingOption.selected = !landingOption.selected);
    }
  };

  @computed get launchParams() {
    const params = new URLSearchParams();
    params.append("limit", String(100));
    if (this.activeFilters.year) {
      params.append("launch_year", this.activeFilters.year.toString());
    }
    if (this.activeFilters.launchStatus !== null) {
      params.append(
        "launch_success",
        this.activeFilters.launchStatus.toString()
      );
    }
    if (this.activeFilters.landingStatus !== null) {
      params.append(
        "land_success",
        this.activeFilters.landingStatus.toString()
      );
    }
    return params;
  }

  @computed get launches(): ILaunch[] {
    return Array.from(this.launchDataMap.values());
  }

  @action loadLaunchData = async () => {
    this.loadingLaunchData = true;
    try {
      const response = await api.Launches.all(this.launchParams);
      runInAction("loading launch data", () => {
        response.forEach((launch: ILaunch) => {
          this.launchDataMap.set(launch.flight_number, launch);
        });
        this.loadingLaunchData = false;
      });
    } catch (error) {
      runInAction("load launch error", () => {
        this.loadingLaunchData = false;
      });
    }
  };
}
