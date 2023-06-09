import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  CardText,
  Col,
  Form,
} from "reactstrap";
import classnames from "classnames";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import BookExp from "./cms/bookexp";
import AboutUs from "./cms/aboutUs";
import OurChef from "./cms/ourChefs";
import Privee from "./cms/privee";
import SupperClub from "./cms/supperClub";
import CorporateBookings from "./cms/corporateBookings";
import Patron from "./cms/patron";
import GiftCards from "./cms/giftCards";
import JoinUs from "./cms/joinUs";
import ContactUs from "./cms/contactUs";
import CommonFooter from "./cms/commonFooter";

const Cms = ({ match }) => {
  const [bookExperience, setBookExperience] = useState({});
  const [forChef, setForChef] = useState({});
  const [ourChef, setOurChef] = useState({});
  const [aboutUs, setAboutUs] = useState({});

  const [formdata, setFormdata] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleChangeBookExp = (e) => {
    let tempdata = { ...bookExperience };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    console.log(tempdata.header[title]);

    // setBookExperience(tempdata);
  };
  const handleClickBookExp = async () => {
    setIsLoading(true);
    let newfomdata = { key_name: "cms", key_value: { ...bookExperience } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, newfomdata);
      NotificationManager.success("Saved successfully", "Saved", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setIsLoading(false);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Update Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
  };
  const handleClick = async () => {
    setIsLoading(true);
    let newfomdata = { key_name: "website_settings", key_value: { ...formdata } };
    try {
      await api.patch(axiosURLS.INTEGRATION + "/website_settings", newfomdata);
      NotificationManager.success("Saved successfully", "Saved", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setIsLoading(false);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Update Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  // useEffect(async () => {
  //   try {
  //     let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE);
  //     // let { fr } = await api.get(axiosURLS.BASE_URL + axiosURLS.FOR_CHEFS);
  //     // let { our } = await api.get(axiosURLS.BASE_URL + axiosURLS.OUR_CHEFS);
  //     // let { abt } = await api.get(axiosURLS.BASE_URL + axiosURLS.ABOUT_US);
  //     setBookExperience(data.book_experience);

  //     // console.log(exp);
  //     // setForChef(fr);
  //     // setOurChef(our);
  //     // setAboutUs(abt);
  //     // setFormdata(exp);
  //   } catch (err) {
  //     console.log(err);
  //     console.log(err.response);
  //     if (err.response) {
  //       NotificationManager.error(err.response.data.message, "Fetch Error", 3000, null, null, "");
  //     }
  //   }
  // }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.website_settings" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Private
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              Ticketed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}
            >
              Our Chefs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "5" })}
              onClick={() => {
                toggle("5");
              }}
            >
              Corporate Bookings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "6" })}
              onClick={() => {
                toggle("6");
              }}
            >
              Become a Patron
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "7" })}
              onClick={() => {
                toggle("7");
              }}
            >
              Gift Cards
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "8" })}
              onClick={() => {
                toggle("8");
              }}
            >
              Join Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "9" })}
              onClick={() => {
                toggle("9");
              }}
            >
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "10" })}
              onClick={() => {
                toggle("10");
              }}
            >
              Contact Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "11" })}
              onClick={() => {
                toggle("11");
              }}
            >
              Common Footer
            </NavLink>
          </NavItem>
        </Nav>
        <br></br>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <BookExp />
          </TabPane>
          <TabPane tabId="2">
            <Privee />
          </TabPane>
          <TabPane tabId="3">
            <SupperClub />
          </TabPane>
          <TabPane tabId="4">
            <OurChef />
          </TabPane>
          <TabPane tabId="5">
            <CorporateBookings />
          </TabPane>
          <TabPane tabId="6">
            <Patron />
          </TabPane>
          <TabPane tabId="7">
            <GiftCards />
          </TabPane>
          <TabPane tabId="8">
            <JoinUs />
          </TabPane>
          <TabPane tabId="9">
            <AboutUs />
          </TabPane>
          <TabPane tabId="10">
            <ContactUs/>
          </TabPane>
          <TabPane tabId="11">
            <CommonFooter/>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};
export default Cms;
