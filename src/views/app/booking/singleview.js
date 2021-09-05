import React, { useState, useEffect } from "react";
import { Row, Card, CardBody, Nav, NavItem, Button, TabContent, TabPane, Badge, CardTitle, CardSubtitle, CardText, CardImg } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Breadcrumb from "containers/navs/Breadcrumb";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import UserCardBasic from "components/cards/UserCardBasic";
import { dinerData } from "data/diners";
import posts from "data/posts";
import Log from "./singleview/log";
import Diners from "./singleview/diners";
import qs from "query-string";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const Singleview = ({ match, history }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [b, setB] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState({});
  useEffect(async () => {
    setIsLoading(true);
    let values1 = qs.parse(history.location.search);
    setB(values1.b);
    try {
      let response = await api.get(axiosURLS.BOOKING + "/" + values1.b);
      setBooking(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  }, []);
  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading={booking.order_number} match={match} />
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
              to="#"
            >
              <IntlMessages id="pages.details" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "diners",
                "nav-link": true,
              })}
              onClick={() => {
                setActiveTab("diners");
              }}
              location={{}}
              to="#"
            >
              <IntlMessages id="pages.diners" />
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <Row>
              <Colxx xxs="12" lg="5" className="mb-4 col-left">
                <Card className="mb-2">
                  <CardBody>
                    <CardTitle>
                      <h3>Host Details</h3>
                    </CardTitle>
                    <p>
                      <b>Name:</b> {booking.user.name}
                    </p>
                    <p>
                      <b>Email:</b> {booking.user.email}
                    </p>
                    <p>
                      <b>Phone:</b> {booking.user.mobile}
                    </p>
                  </CardBody>
                </Card>
                <Card className="mb-2">
                  <CardBody>
                    <CardTitle>
                      <h3>Order Details</h3>
                    </CardTitle>
                    <p>
                      <b>Order No:</b> {booking.order_number}
                    </p>
                    <p>
                      <b>Type:</b> {booking.type === "virtual_dining" ? "Virtual Dining" : "Chef's Table"}
                    </p>
                    <p>
                      <b>Diner Count:</b> {booking.diner_count}
                    </p>
                    <p>
                      <b>Order status:</b> {booking.status}
                    </p>
                    <p>
                      <b>Additional message:</b> {booking.message}
                    </p>
                  </CardBody>
                </Card>
                <Card className="mb-2">
                  <CardBody>
                    <CardTitle>
                      <h3>Payment Details</h3>
                    </CardTitle>
                    {booking.status === "Order Paid" ? (
                      <>
                        <p>
                          <b>Total:</b> {booking.payment.total}
                        </p>
                        <p>
                          <b>Razorpay Order Number:</b> {booking.payment.order_number}
                        </p>
                        <p>
                          <b>Meal Cost:</b> {booking.payment.meal}
                        </p>
                        <p>
                          <b>Taxes:</b> {booking.payment.taxes}
                        </p>
                        <p>
                          <b>Delivery Charges:</b> {booking.payment.delivery_charges}
                        </p>
                        <p>
                          <b>Mood Bag:</b> {booking.payment.mood_bag}
                        </p>
                        <p>
                          <b>Discount:</b> {booking.payment.discount}
                        </p>
                        <p>
                          <b>Voucher:</b> {booking.payment.voucher}
                        </p>{" "}
                      </>
                    ) : (
                      <p>
                        <b>Status:</b> {booking.status}
                      </p>
                    )}
                  </CardBody>
                </Card>
                <Card className="mb-2">
                  <CardBody>
                    <CardTitle>
                      <h3>Delivery Details</h3>
                    </CardTitle>
                    <p>
                      <b>Dunzo Ref Id:</b> {booking.delivery}
                    </p>
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="12" lg="7" className="mb-4 col-right">
                <Log data={booking.log} className="mb-4" />;
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="diners">
            <Row>
              <Diners diners={dinerData} />
            </Row>
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};
export default Singleview;
