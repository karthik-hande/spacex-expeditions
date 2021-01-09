import React, { useContext } from "react";

import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

import { RootStoreContext } from "../../store/rootStore";
import FilterPanel from "../../components/FilterPanel";
import LaunchInfoCard from "../../components/LaunchInfoCard";
import Loader from "../../components/Loader";
import NoResult from "../../components/NoResult";

interface IProps {}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DashboardPage: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { launches, loadingLaunchData } = rootStore.spacexStore;

  let query = useQuery();

  return (
    <>
      <main className="dashboard-page">
        <aside className="filter-panel-container">
          <FilterPanel
            year={query.get("year")}
            landStatus={query.get("land_success")}
            launchStatus={query.get("launch_success")}
          ></FilterPanel>
        </aside>
        <section className="launch-result-container">
          {loadingLaunchData && <Loader />}
          {!loadingLaunchData && launches.length === 0 && <NoResult />}
            {launches.map((launch) => {
              return (
                <div key={launch.flight_number} className="card-container">
                  <LaunchInfoCard launch={launch} />
                </div>
              );
            })}
        </section>
      </main>
    </>
  );
};

export default observer(DashboardPage);
