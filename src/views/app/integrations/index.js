import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Mailchimp = React.lazy(() =>
  import(/* webpackChunkName: "Mailchimp" */ './Mailchimp')
);
const Googlemaps = React.lazy(() =>
  import(/* webpackChunkName: "Googlemaps" */ './Googlemaps')
);
const Dunzo = React.lazy(() =>
  import(/* webpackChunkName: "Dunzo" */ './Dunzo')
);
const Calendly = React.lazy(() =>
  import(/* webpackChunkName: "Calendly" */ './Calendly')
);
const Razorpay = React.lazy(() =>
  import(/* webpackChunkName: "Razorpay" */ './Razorpay')
);
const Integrations = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/mailchimp`} />
      <Route
        path={`${match.url}/mailchimp`}
        render={(props) => <Mailchimp {...props} />}
      />
      <Route
        path={`${match.url}/google_maps`}
        render={(props) => <Googlemaps {...props} />}
      />
      <Route
        path={`${match.url}/dunzo`}
        render={(props) => <Dunzo {...props} />}
      />
       <Route
        path={`${match.url}/razorpay`}
        render={(props) => <Razorpay {...props} />}
      />
      <Route
        path={`${match.url}/calendly`}
        render={(props) => <Calendly {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Integrations;
