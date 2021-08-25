import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Viewall = React.lazy(() =>
  import(/* webpackChunkName: "Viewall" */ './viewall')
);
const Singleview = React.lazy(() =>
  import(/* webpackChunkName: "singleview" */ './singleview')
);
const Booking = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/viewall`} />
      <Route
        path={`${match.url}/viewall`}
        render={(props) => <Viewall {...props} />}
      />
       <Route
        path={`${match.url}/view`}
        render={(props) => <Singleview {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Booking;
