import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Add = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './add')
);
const List = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './list')
);
const Singleview = React.lazy(() =>
  import(/* webpackChunkName: "singleview" */ './singleview')
);
const Menuview = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './menuview')
);
const Allmenus = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './allmenus')
);
const Chefrequests = React.lazy(() =>
  import(/* webpackChunkName: "menuview" */ './chefrequests')
);
const Chef = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/add`}
        render={(props) => <Add {...props} />}
      />
       <Route
        path={`${match.url}/list`}
        render={(props) => <List {...props} />}
      />
      <Route
        path={`${match.url}/view`}
        render={(props) => <Singleview {...props} />}
      />
      <Route
        path={`${match.url}/menuview`}
        render={(props) => <Menuview {...props} />}
      />
      <Route
        path={`${match.url}/allmenus`}
        render={(props) => <Allmenus {...props} />}
      />
      <Route
        path={`${match.url}/chefrequests`}
        render={(props) => <Chefrequests {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Chef;
