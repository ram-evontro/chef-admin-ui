import React, { useState, useEffect } from "react";
import { Row, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, TabContent, TabPane } from "reactstrap";
import { NavLink } from "react-router-dom";
import Details from "./singleview/details";
import Menu from "./singleview/menu";
import Feedback from "./singleview/feedback";
import classnames from "classnames";
import Breadcrumb from "containers/navs/Breadcrumb";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import Deletealert from "../elements/Deletealert";
import Events from "./events";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import { adminRoot } from "constants/defaultValues";
const Singleview = ({ match, history }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [chefTypes, setChefTypes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [action, setAction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [updateDetails, setUpdateDetails] = useState(false);
  const confirmAction = (action) => {
    setAction(action);
    setDeleteAlert(true);
  };
  const performAction = (res) => {
    if (!res) {
      return false;
    }
    if (action === "delete") {
      deleteUser();
    }
    if (action === "activate") {
      toggleStatus(true);
    }
    if (action === "deactivate") {
      toggleStatus(false);
    }
    if (action === "featured") {
      featured(true);
    }
    if (action === "notfeatured") {
      featured(false);
    }
  };
  const toggleStatus = async (status) => {
    setIsLoading(true);
    let formdata = { status: status };
    try {
      await api.patch(axiosURLS.USERS + "/" + id, formdata);
      setUpdateDetails(!updateDetails);
      NotificationManager.success("Chef status changed successfully", "Changed", 3000, null, null, "");
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const featured = async (featured) => {
    setIsLoading(true);
    let formdata = { details: { is_featured: featured } };
    try {
      await api.post(axiosURLS.USER_DETAILS_UPDATE + "/" + id, formdata);
      setUpdateDetails(!updateDetails);
      NotificationManager.success("Chef status changed successfully", "Changed", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const deleteUser = async () => {
    setIsLoading(true);
    try {
      await api.delete(axiosURLS.USERS + "/" + id);
      NotificationManager.success("Chef deleted changed successfully", "Changed", 3000, null, null, "");
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
    history.push(`${adminRoot}/chef`);
  };
  useEffect(async () => {
    let id = history.location.search.replace("?p=", "");
    setId(id);
  }, []);
  useEffect(async () => {
    if(activeTab==="events")
    {
      let {data} = await api.get(axiosURLS.EVENTS_FOR_USER + "/" + id);
      console.log(data);
      //paginate user events

    }
  }, [activeTab]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{userName}</h1>
          <div className="text-zero top-right-button-container">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" size="lg" outline className="top-right-button top-right-button-single">
                {!isLoading ? <IntlMessages id="pages.actions" /> : <IntlMessages id="pages.please_wait" />}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    confirmAction("delete");
                  }}
                >
                  <IntlMessages id="pages.delete" />
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    confirmAction("activate");
                  }}
                >
                  <IntlMessages id="pages.activate" />
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    confirmAction("deactivate");
                  }}
                >
                  <IntlMessages id="pages.deactivate" />
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    confirmAction("featured");
                  }}
                >
                  <IntlMessages id="pages.make_featured" />
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    confirmAction("notfeatured");
                  }}
                >
                  <IntlMessages id="pages.remove_featured" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

          <Breadcrumb match={match} />

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
                to={"?p=" + id}
              >
                <IntlMessages id="pages.details" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "menu",
                  "nav-link": true,
                })}
                onClick={() => {
                  setActiveTab("menu");
                }}
                location={{}}
                to={"?p=" + id}
              >
                <IntlMessages id="pages.menu" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "events",
                  "nav-link": true,
                })}
                onClick={() => {
                  setActiveTab("events");
                }}
                location={{}}
                to={"?p=" + id}
              >
                <IntlMessages id="pages.events" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "feedback",
                  "nav-link": true,
                })}
                onClick={() => {
                  setActiveTab("feedback");
                }}
                location={{}}
                to={"?p=" + id}
              >
                <IntlMessages id="pages.feedback" />
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="details">
              <Details updateDetails={updateDetails} setFeedbacks={setFeedbacks} setChefTypesForView={setChefTypes} setUserName={setUserName} id={id} />
            </TabPane>
            <TabPane tabId="menu">
              <Menu id={id} chefTypes={chefTypes} />
            </TabPane>
            <TabPane tabId="feedback">
              <Feedback feedbacks={feedbacks} />
            </TabPane>
            <TabPane tabId="events">
            {activeTab==="events"?(<Events match={match} history={history} forchef={id} />):('')}
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
      <Deletealert modalOpen={deleteAlert} toggleModal={() => setDeleteAlert(!deleteAlert)} setSureDelete={performAction} />
    </>
  );
};
export default Singleview;
