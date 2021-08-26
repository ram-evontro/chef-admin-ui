import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboarddetails = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './details')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/details`} />
      <Route
        path={`${match.url}/details`}
        render={(props) => <Dashboarddetails {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
