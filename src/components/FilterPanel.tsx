import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../store/rootStore";
import { IActiveFilter } from "../models";
import FilterCard from "./FilterCard";

interface IProps {
  year: string | null;
  landStatus: string | null;
  launchStatus: string | null;
}

const FilterPanel: React.FC<IProps> = ({ year, landStatus, launchStatus }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    yearFilters,
    landingStatusFilter,
    launchStatusFilter,
    filterParamChanged,
    setFilterUrl,
  } = rootStore.spacexStore;

  useEffect(() => {
    let filterParam: IActiveFilter = {
      year: null,
      landingStatus: null,
      launchStatus: null,
    };
    if (year !== null) {
      filterParam.year = +year;
    }
    if (landStatus != null) {
      filterParam.landingStatus = landStatus === "true" ? true : false;
    }
    if (launchStatus != null) {
      filterParam.launchStatus = launchStatus === "true" ? true : false;
    }
    filterParamChanged(filterParam);
  }, [year, landStatus, launchStatus, filterParamChanged]);

  return (
    <div className="filter-panel">
      <div className="filter-header">Filters</div>
      <FilterCard
        title="Launch Year"
        filterOptions={yearFilters}
        onFilterOption={setFilterUrl}
      />
      <FilterCard
        title="Successful Launch"
        filterOptions={launchStatusFilter}
        onFilterOption={setFilterUrl}
      />
      <FilterCard
        title="Successful Landing"
        filterOptions={landingStatusFilter}
        onFilterOption={setFilterUrl}
      />
    </div>
  );
};

export default observer(FilterPanel);
