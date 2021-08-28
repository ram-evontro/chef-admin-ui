import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Cheftypes = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './Cheftypes')
);
const Feedbackparams = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './Feedbackparams')
);
const Mealcourses = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './Mealcourses')
);
const Cuisines = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './Cuisines')
);
const Vouchers = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './Vouchers')
);
const SmsTemplates = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './SmsTemplates')
);
const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/chef_types`} />
      <Route
        path={`${match.url}/chef_types`}
        render={(props) => <Cheftypes {...props} />}
      />
      <Route
        path={`${match.url}/feedback_parameters`}
        render={(props) => <Feedbackparams {...props} />}
      />
      <Route
        path={`${match.url}/meal_courses`}
        render={(props) => <Mealcourses {...props} />}
      />
      <Route
        path={`${match.url}/cuisine`}
        render={(props) => <Cuisines {...props} />}
      />
      <Route
        path={`${match.url}/vouchers`}
        render={(props) => <Vouchers {...props} />}
      />
      <Route
        path={`${match.url}/sms_templates`}
        render={(props) => <SmsTemplates {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Settings;
