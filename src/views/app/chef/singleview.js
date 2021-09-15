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

const Singleview = ({ match, history }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [chefTypes, setChefTypes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(async () => {
   let id = history.location.search.replace("?p=", "");
    setId(id);
  },[]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{userName}</h1>
          <div className="text-zero top-right-button-container">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" size="lg" outline className="top-right-button top-right-button-single">
                <IntlMessages id="pages.actions" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <IntlMessages id="pages.delete" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="pages.add_menu" />
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
                to={('?p='+id)}
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
                to={('?p='+id)}
              >
                <IntlMessages id="pages.menu" />
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
                to={('?p='+id)}
              >
                <IntlMessages id="pages.feedback" />
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="details">
              <Details setFeedbacks={setFeedbacks} setChefTypesForView={setChefTypes} setUserName={setUserName} id={id} />
            </TabPane>
            <TabPane tabId="menu">
              <Menu id={id} chefTypes={chefTypes} />
            </TabPane>
            <TabPane tabId="feedback">
              <Feedback feedbacks={feedbacks}  />
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};
export default Singleview;
