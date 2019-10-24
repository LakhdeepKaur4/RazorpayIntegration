import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Tops from "./tops";
import LatestCollection from "./latestCollection";
import BestSelling from "./bestSelling";
import DealOfTheDay from "./dealOfTheDay";


const Gogo = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/t-shirts`} />
      <Route path={`${match.url}/tops`} component={Tops} />
      <Route path={`${match.url}/latest-collection`} component={LatestCollection} />
      <Route path={`${match.url}/best-selling`} component={BestSelling} />
      <Route path={`${match.url}/deal-of-the-day`} component={DealOfTheDay} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Gogo;
