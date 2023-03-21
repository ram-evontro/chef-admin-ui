import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import Account from './Account';
import Support from './Support';
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
const Diner = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './diner')
);
const Requests = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './requests')
);
const Settings = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './settings')
);
const Integrations = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './integrations')
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
              path={`${match.url}/diner`}
              render={(props) => <Diner {...props} />}
            />
            <Route
              path={`${match.url}/request`}
              render={(props) => <Requests {...props} />}
            />
            <Route
              path={`${match.url}/chef`}
              render={(props) => <Chef {...props} />}
            />
            <Route
              path={`${match.url}/settings`}
              render={(props) => <Settings {...props} />}
            />
             <Route
              path={`${match.url}/integrations`}
              render={(props) => <Integrations {...props} />}
            />
            <Route
              path={`${match.url}/account`}
              render={(props) => <Account {...props} />}
            />
            <Route
              path={`${match.url}/support`}
              render={(props) => <Support {...props} />}
            />
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
