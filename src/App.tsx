import React from "react";

import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
  Redirect,
} from "react-router-dom";



import Navbar from "./components/Navbar";
import DashboardPage from "./feature/dashboard/DashboardPage";
import PageNotFound from "./components/PageNotFound";

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <main className="app">
      <Navbar title={"SpaceX Launch Programs"} />
      <div className="fragment-container">
        <React.Suspense fallback={<span>Loading...</span>}>
          <Switch>
            <Route path="/dashboard" component={DashboardPage} />,
            <Redirect exact from="/" to="/dashboard" />
            <Route component={PageNotFound} />
          </Switch>
        </React.Suspense>
      </div>
    </main>
  );
};

export default withRouter(observer(App));
