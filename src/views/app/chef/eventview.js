import React, { useState, useEffect } from "react";
import { Row, Nav, NavItem, ButtonDropdown, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, TabContent, TabPane } from "reactstrap";
import { NavLink } from "react-router-dom";
import Singleview from "./events/Singleview";
import qs from "query-string";
import Custombreadcrumb from "../elements/Custombreadcrum";
import Bookings from "./events/Bookings";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import classnames from "classnames";
import moment from "moment";
import download from "downloadjs";
const Eventview = ({ match, history }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [event, setEvent] = useState({});
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [diners, setDiners] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [p, setP] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOnPage, setIsLoadingOnPage] = useState(false);
  useEffect(async () => {
    setIsLoading(true);
    let values1 = qs.parse(history.location.search);
    let forDiners = [];
    setP(values1.p);
    try {
      let response = await api.get(axiosURLS.EVENT + "/" + values1.event);
      setEvent(response.data);
      
      if (response.data.bookings.length > 0) {
        response.data.bookings.map((booking) => {
          booking.diners.map((diner) => {
            let dinerwithhost = { ...diner };
            dinerwithhost["hostname"] = booking.user.name;
            dinerwithhost["hostmobile"] = booking.user.mobile;
            dinerwithhost["hostemail"] = booking.user.email;
            dinerwithhost["date"] = moment(booking.booking_date).format("DD MMM YYYY HH:mm:ss");
            dinerwithhost["booking_id"] = booking.id;
            dinerwithhost["order_number"] = booking.order_number;
            dinerwithhost["meal"] = booking.meal;
            forDiners.push(dinerwithhost);
          });
        });
      }
      setDiners(forDiners);
      response = await api.get(axiosURLS.CHEFS_ALL);
      setChefs(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  }, []);
  const downloadDetails = async () => {
    setIsLoadingOnPage(true);
    try {
      let response;

      response = await api.post(axiosURLS.EVENT_DOWNLOAD + "/" + event.id, {}, { responseType: "blob" });
      const content = response.headers["content-type"];
      download(response.data, event.title + ".csv", content);
      console.log(response);
    } catch (err) {
      console.log(err);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoadingOnPage(false);
  };
  return isLoading ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="text-zero top-right-button-container">
            <ButtonDropdown isOpen={dropdownSplitOpen} toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}>
              <div className="btn btn-primary btn-lg ">
                <div className="mb-0 d-inline-block">{!isLoadingOnPage ? <IntlMessages id="pages.actions" /> : <IntlMessages id="pages.please_wait" />}</div>
              </div>
              <DropdownToggle caret color="primary" className="dropdown-toggle-split btn-lg" />
              <DropdownMenu right>
                <DropdownItem onClick={downloadDetails}>
                  <IntlMessages id="pages.download_details" />
                </DropdownItem>                
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <h1>{event.title}</h1>
          {p ? (
            <Custombreadcrumb append={`/view?p=${event.chef.id}`} appendname={event.chef.name} match={match} />
          ) : (
            <Custombreadcrumb append={`/events`} appendname={"Events"} match={match} />
          )}
          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "details",
                  "nav-link": true,
                })}
                onClick={() => {
                  setActiveTab("details");
                }}
                location={{}}
                to={"?event=" + event.id}
              >
                <IntlMessages id="pages.details" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "bookings",
                  "nav-link": true,
                })}
                onClick={() => {
                  setActiveTab("bookings");
                }}
                location={{}}
                to={"?event=" + event.id}
              >
                <IntlMessages id="pages.bookings" />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="details">
              <Singleview chefs={chefs} event={event} setEvent={setEvent} />
            </TabPane>
            <TabPane tabId="bookings">
              <Bookings diners={diners} />
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};
export default Eventview;
