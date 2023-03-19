import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
const Cheftypes = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Cheftypes"));
const Mealtypes = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Mealtypes"));
const Mealtimes = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Mealtimes"));
const Feedbackparams = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Feedbackparams"));
const Mealcourses = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Mealcourses"));
const Countries = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Countries"));
const PartnerTypes = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./PartnerTypes"));
const PatronTypes = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./PatronTypes"));
const Cities = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Cities"));
const Cuisines = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Cuisines"));
const Vouchers = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./Vouchers"));
const SmsTemplates = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./SmsTemplates"));
const EmailTemplates = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./EmailTemplates"));
const WebsiteSettings = React.lazy(() => import(/* webpackChunkName: "menuview" */ "./WebsiteSettings"));
const BookingSettings = React.lazy(() => import(/* webpackChunkName: "BookingSettings" */ "./BookingSettings"));
const Cms = React.lazy(() => import(/* webpackChunkName: "BookingSettings" */ "./Cms"));
const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/chef_types`} />
      <Route path={`${match.url}/chef_types`} render={(props) => <Cheftypes {...props} />} />
      <Route path={`${match.url}/meal_types`} render={(props) => <Mealtypes {...props} />} />
      <Route path={`${match.url}/meal_time`} render={(props) => <Mealtimes {...props} />} />
      <Route path={`${match.url}/feedback_parameters`} render={(props) => <Feedbackparams {...props} />} />
      <Route path={`${match.url}/meal_courses`} render={(props) => <Mealcourses {...props} />} />
      <Route path={`${match.url}/cuisine`} render={(props) => <Cuisines {...props} />} />
      <Route path={`${match.url}/website_settings`} render={(props) => <WebsiteSettings {...props} />} />
      <Route path={`${match.url}/booking_settings`} render={(props) => <BookingSettings {...props} />} />
      <Route path={`${match.url}/vouchers`} render={(props) => <Vouchers {...props} />} />
      <Route path={`${match.url}/sms_templates`} render={(props) => <SmsTemplates {...props} />} />
      <Route path={`${match.url}/country`} render={(props) => <Countries {...props} />} />
      <Route path={`${match.url}/partner_type`} render={(props) => <PartnerTypes {...props} />} />
      <Route path={`${match.url}/patron_type`} render={(props) => <PatronTypes {...props} />} />
      <Route path={`${match.url}/city`} render={(props) => <Cities {...props} />} />
      <Route path={`${match.url}/email_templates`} render={(props) => <EmailTemplates {...props} />} />
      <Route path={`${match.url}/cms`} render={(props) => <Cms {...props} />} />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Settings;
