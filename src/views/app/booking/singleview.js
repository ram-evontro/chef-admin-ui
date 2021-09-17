import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Breadcrumb from "containers/navs/Breadcrumb";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import SingleLightbox from "components/pages/SingleLightbox";
import Log from "./singleview/log";
import Diners from "./singleview/diners";
import qs from "query-string";
import api from "helpers/api";
import moment from "moment";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import { adminRoot } from "constants/defaultValues";
import Rating from "components/common/Rating";
import ThumbnailImage from "components/cards/ThumbnailImage";
import download from "downloadjs";
import Dunzodetails from "./singleview/dunzodetails";
const Singleview = ({ match, history }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForLog, setIsLoadingForLog] = useState(false);
  const [isLoadingDunzo, setIsLoadingDunzo] = useState(false);
  const [booking, setBookingState] = useState({});
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dunzoDetails, setDunzoDetails] = useState({});
  const setBooking = (bookingdata) => {
    if (bookingdata.feedbacks) {
      let temp = { ...bookingdata };
      temp["feedbacks"] = {};
      bookingdata.feedbacks.map((feedback) => {
        let toReturn = {};
        temp["feedbacks"][feedback["from"]] = feedback;
        return toReturn;
      });
      setBookingState(temp);
    } else {
      setBookingState(bookingdata);
    }
  };
  useEffect(async () => {
    setIsLoading(true);
    let values1 = qs.parse(history.location.search);
    if (!values1.b) {
      history.push(`${adminRoot}/booking`);
    } else {
      setBookingId(values1.b);
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
    }
    setIsLoading(false);
  }, []);
  const logAction = async (action, formdata) => {
    setIsLoadingForLog(true);
    try {
      let response;
      if (action === "add") {
        response = await api.patch(axiosURLS.BOOKING_LOG + "/" + booking.id, formdata);
      }
      if (action === "delete") {
        response = await api.delete(axiosURLS.BOOKING_LOG + "/" + booking.id + "/" + formdata.logId);
      }
      setBooking(response.data);
      NotificationManager.success("Log updated successfully", "Updated", 3000, null, null, "");
    } catch (err) {
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoadingForLog(false);
  };
  const downloadDetails = async () => {
    setIsLoadingForLog(true);
    try {
      let response;

      response = await api.post(axiosURLS.BOOKING_DOWNLOAD + "/" + booking.id, {}, { responseType: "blob" });
      const content = response.headers["content-type"];
      download(response.data, booking.order_number + ".pdf", content);
      console.log(response);
    } catch (err) {
      console.log(err);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoadingForLog(false);
  };
  const updateDunzo = async (task_id) => {
    setIsLoadingDunzo(true);
    try {
      let { data } = await api.post(axiosURLS.DUNZO + "/" + task_id);
      console.log(data);
      NotificationManager.success("Status refreshed successfully", "Updated", 3000, null, null, "");
    } catch (err) {
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoadingDunzo(false);
  };
  const viewDunzo = async () => {
    setModalOpen(true);
  };
  const markAsCompleted = async () => {
    let response;
    try {
      response = await api.post(axiosURLS.BOOKING_MARKCOMPLETED + "/" + booking.id);
      setBooking(response.data);
      NotificationManager.success("Order marked as completed", "Updated", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row>
      <Colxx xxs="12">
        <div className="text-zero top-right-button-container">
          <ButtonDropdown isOpen={dropdownSplitOpen} toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}>
            <div className="btn btn-primary btn-lg ">
              <div className="mb-0 d-inline-block">{!isLoadingForLog ? <IntlMessages id="pages.actions" /> : <IntlMessages id="pages.please_wait" />}</div>
            </div>
            <DropdownToggle caret color="primary" className="dropdown-toggle-split btn-lg" />
            <DropdownMenu right>
              <DropdownItem onClick={downloadDetails}>
                <IntlMessages id="pages.download_details" />
              </DropdownItem>
              {booking.type === "chefs_table" &&(booking.status==="Order Placed") ? (
                <DropdownItem onClick={requestPayment}>
                  <IntlMessages id="pages.request_payment" />
                </DropdownItem>
              ) : (
                ""
              )}

              <DropdownItem onClick={markAsCompleted}>
                <IntlMessages id="pages.mark_as_completed" />
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
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
              to={`${adminRoot}/booking/view/?b=${bookingId}`}
            >
              <IntlMessages id="pages.details" />
            </NavLink>
          </NavItem>
          {booking.type === "virtual_dining" && (booking.menu_selection === "diner" || booking.delivery_selection === "diner") ? (
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
                to={`${adminRoot}/booking/view/?b=${bookingId}`}
              >
                <IntlMessages id="pages.diners" />
              </NavLink>
            </NavItem>
          ) : (
            ""
          )}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <Row>
              <Colxx xxs="12" lg="5" className="mb-4 col-left">
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
                      <b>Booking date:</b> {moment(booking.booking_date).format("MMM D, Y")}
                    </p>
                    <p>
                      <b>Meal:</b> {booking.meal}
                    </p>
                    <p>
                      <b>City:</b> {booking.city}
                    </p>
                    <p>
                      <b>Order status:</b> {booking.status}
                    </p>
                    <p>
                      <b>Additional message:</b> {booking.message}
                    </p>
                    {booking.type === "virtual_dining" ? (
                      <p>
                        <b>Menu Selection:</b> {booking.menu_selection === "diner" ? "Different for each diner" : "Common menu"}
                      </p>
                    ) : (
                      ""
                    )}
                    {booking.type === "virtual_dining" ? (
                      <p>
                        <b>Delivery Selection:</b> {booking.delivery_selection === "diner" ? "Different for each diner" : "Common location"}
                      </p>
                    ) : (
                      ""
                    )}
                  </CardBody>
                </Card>
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
                    {booking.feedbacks && booking.feedbacks[booking.user.id] ? (
                      <p>
                        <b>Feedback:</b> <br />
                        {booking.feedbacks[booking.user.id].message}
                        <br />
                        {booking.feedbacks[booking.user.id].rating.map((rate) => (
                          <Row key={rate.id}>
                            <Colxx xss="12" md="4">
                              {rate.param}
                            </Colxx>
                            <Colxx xss="12" md="8">
                              <Rating total={5} rating={rate.value} interactive={false} />
                            </Colxx>
                          </Row>
                        ))}
                      </p>
                    ) : (
                      ""
                    )}
                  </CardBody>
                </Card>
                <Card className="mb-2">
                  <CardBody>
                    <CardTitle>
                      <h3>Payment Details</h3>
                    </CardTitle>
                    {booking.status === "Order Paid" || booking.status === "Order Completed" ? (
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
                        <b>Status:</b> {booking.status === "Order Placed" ? "Not Paid" : ""}
                      </p>
                    )}
                  </CardBody>
                </Card>
                {booking.type === "chef_table" ? (
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle>
                        <h3>Cuisines Prefered</h3>
                      </CardTitle>
                      {booking.cuisines.map((cuisine) => (
                        <div key={cuisine.id}>
                          <Row>
                            <Colxx xxs="12">
                              <p>{cuisine.name}</p>
                            </Colxx>
                          </Row>
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                ) : (
                  ""
                )}
              </Colxx>
              <Colxx xxs="12" lg="7" className="mb-4 col-right">
                <Log logAction={logAction} isLoadingForLog={isLoadingForLog} data={booking.log} className="mb-4" />
                {booking.delivery_selection === "common" ? (
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle>
                        <h3>Common Delivery Details</h3>
                      </CardTitle>
                      <p>
                        <b>Address:</b> {booking.common_address.address1}
                      </p>
                      <p>
                        <b>Locality:</b> {booking.common_address.address2}
                      </p>
                      <p>
                        <b>Landmark:</b> {booking.common_address.lankmark}
                      </p>
                      <p>
                        <b>Pincode:</b> {booking.common_address.pincode}
                      </p>
                      <p>
                        <b>Type:</b> {booking.common_address.type.toUpperCase()}
                      </p>
                      {booking.dunzo_taskids.map((taskid) => (
                        <React.Fragment key={taskid.task_id}>
                          <p>
                            <b>Dunzo Ref Id:</b> {taskid.task_id}
                          </p>
                          <p>
                            <b>Dunzo delivery status:</b> {taskid.state}{" "}
                            <button
                              onClick={() => {
                                updateDunzo(taskid.task_id);
                              }}
                              className="btn btn-outline-primary"
                            >
                              <i className={` ${isLoadingDunzo ? "animate-spin" : ""}  simple-icon-refresh`} />
                            </button>
                            <button
                              onClick={() => {
                                viewDunzo(taskid.task_id);
                              }}
                              className="btn btn-outline-primary"
                            >
                              <i className="simple-icon-eye" />
                            </button>
                          </p>
                        </React.Fragment>
                      ))}
                    </CardBody>
                  </Card>
                ) : (
                  ""
                )}
                {booking.type === "virtual_dining" && booking.menu_selection === "host" ? (
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle>
                        <h3>Common Menu Details</h3>
                      </CardTitle>
                      <SingleLightbox thumb={booking.common_menu.cover_picture} large={booking.common_menu.cover_picture} className="card-img-top" />
                      <NavLink location={{}} to={`${adminRoot}/chef/menuview/?menu=${booking.common_menu.id}`}>
                        <p className="mt-4">
                          <b>Menu Name:</b> {booking.common_menu.title}
                        </p>
                        <p>
                          <b>Menu Desc:</b> {booking.common_menu.desc}
                        </p>
                      </NavLink>
                    </CardBody>
                  </Card>
                ) : (
                  ""
                )}
                {booking.type === "chef_table" ? (
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle>
                        <h3>Chefs Requested</h3>
                      </CardTitle>
                      <Row>
                        {booking.chefs.map((chef) => (
                          <Colxx key={chef.id} xxs="12" md="6">
                            <NavLink location={{}} to={`${adminRoot}/chef/view/?p=${chef.id}`}>
                              <ThumbnailImage rounded small src={chef.picture} alt="profile" className="m-2" /> {chef.name},({chef.mobile})
                            </NavLink>
                          </Colxx>
                        ))}
                      </Row>
                    </CardBody>
                  </Card>
                ) : (
                  ""
                )}
              </Colxx>
            </Row>
          </TabPane>
          {booking.type === "virtual_dining" && (booking.menu_selection === "diner" || booking.delivery_selection === "diner") ? (
            <TabPane tabId="diners">
              <Row>
                <Diners
                  menu={booking.menu_selection === "diner" ? true : false}
                  delivery={booking.delivery_selection === "diner" ? true : false}
                  diners={booking.diners}
                  booking={booking}
                  updateDunzo={updateDunzo}
                  viewDunzo={viewDunzo}
                  isLoadingDunzo={isLoadingDunzo}
                  setDunzoDetails={setDunzoDetails}
                />
              </Row>
            </TabPane>
          ) : (
            ""
          )}
        </TabContent>
      </Colxx>
      <Dunzodetails details={dunzoDetails} modalOpen={modalOpen} toggleModal={() => setModalOpen(!modalOpen)} />
    </Row>
  );
};
export default Singleview;
