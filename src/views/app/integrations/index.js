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
const GoogleCalendar = React.lazy(() =>
  import(/* webpackChunkName: "GoogleCalendar" */ './GoogleCalendar')
);
const Razorpay = React.lazy(() =>
  import(/* webpackChunkName: "Razorpay" */ './Razorpay')
);
const S3 = React.lazy(() =>
  import(/* webpackChunkName: "S3" */ './S3')
);
const Plivo = React.lazy(() =>
  import(/* webpackChunkName: "Plivo" */ './Plivo')
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
        path={`${match.url}/google_calendar`}
        render={(props) => <GoogleCalendar {...props} />}
      />
       <Route
        path={`${match.url}/s3`}
        render={(props) => <S3 {...props} />}
      />
      <Route
        path={`${match.url}/plivo`}
        render={(props) => <Plivo {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Integrations;
