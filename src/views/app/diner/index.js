import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './list')
);
const Diner = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
       <Route
        path={`${match.url}/list`}
        render={(props) => <List {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Diner;
