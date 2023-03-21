import React, { Suspense } from "react";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Schdulecalls = React.lazy(() => import(/* webpackChunkName: "second" */ "./schedulecalls"));
const Contactus = React.lazy(() => import(/* webpackChunkName: "second" */ "./contactus"));
const Joinrequest = React.lazy(() => import(/* webpackChunkName: "second" */ "./joinrequest"));
const Patron = React.lazy(() => import(/* webpackChunkName: "second" */ "./patron"));
const Partner = React.lazy(() => import(/* webpackChunkName: "second" */ "./partner"));
const Requests = ({ match }) => {
  useEffect(() => {
    console.log("match: ", match);
  }, [match]);
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/schedule_call`} />
        <Route path={`${match.url}/schedule_call`} render={(props) => <Schdulecalls {...props} />} />
        <Route path={`${match.url}/contact_us`} render={(props) => <Contactus {...props} />} />
        <Route path={`${match.url}/join_requests`} render={(props) => <Joinrequest {...props} />} />
        <Route path={`${match.url}/patron`} render={(props) => <Patron {...props} />} />
        <Route path={`${match.url}/partner`} render={(props) => <Partner {...props} />} />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Requests;
