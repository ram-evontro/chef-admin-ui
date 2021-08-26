import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Cheftypes = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './Cheftypes')
);
const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/chef_types`} />
      <Route
        path={`${match.url}/chef_types`}
        render={(props) => <Cheftypes {...props} />}
      />
      
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Settings;
