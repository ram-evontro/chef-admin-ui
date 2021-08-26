import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';
const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './dashboards')
);
const Booking = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './booking')
);
const Chef = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './chef')
);
const Settings = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './settings')
);
const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboards`} />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/booking`}
              render={(props) => <Booking {...props} />}
            />
            <Route
              path={`${match.url}/chef`}
              render={(props) => <Chef {...props} />}
            />
            <Route
              path={`${match.url}/settings`}
              render={(props) => <Settings {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
