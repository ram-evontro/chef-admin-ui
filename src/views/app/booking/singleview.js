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
import RequestPayment from "./singleview/requestpayment";
import Cancelorder from "./singleview/cancelorder";
import Deletealert from "../elements/Deletealert";
import Editbooking from "./singleview/editbooking";
const Singleview = ({ match, history }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForLog, setIsLoadingForLog] = useState(false);
  const [isLoadingDunzo, setIsLoadingDunzo] = useState(false);
  const [booking, setBookingState] = useState({});
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dunzoDetails, setDunzoDetails] = useState({});
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [actions, setActions] = useState({});
  const [selectedTask, setSelectedTask] = useState();
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
      download(response.data, booking.order_number + ".csv", content);
      console.log(response);
    } catch (err) {
      console.log(err);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoadingForLog(false);
  };
  const updateDunzo = (task_id) => {
    setSelectedTask(task_id);
    setEditModalOpen(true);
  };
  const updateBookingTime = () => {
    setSelectedTask(null);
    setEditModalOpen(true);
  };
  const viewDunzo = () => {
    setModalOpen(true);
  };
  const fetchAndViewDunzo = async (task_id) => {
    setIsLoadingDunzo(true);
    try {
      let { data } = await api.post(axiosURLS.DUNZO + "/" + booking.id + "/" + task_id);
      setDunzoDetails(data);
      setModalOpen(true);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoadingDunzo(false);
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
  const requestPaymentPopup = () => {
    if (!booking.payment || (booking.payment && (!booking.payment.invoice_id || booking.payment.invoice_id === ""))) {
      setPaymentModalOpen(true);
    } else {
      requestPayment({ amount: 1000, desc: "Some random desc" });
    }
  };
  const requestPayment = async (data) => {
    let response;
    try {
      response = await api.post(axiosURLS.BOOKING_REQUESTPAYMENT + "/" + booking.id, data);
      setBooking(response.data);
      setPaymentModalOpen(false);
      NotificationManager.success("Payment requested", "Updated", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const requestCancel = async (data) => {
    let response;
    try {
      response = await api.post(axiosURLS.BOOKING_ACTION + "/cancel" + "/" + booking.id, data);
      setBooking(response.data);
      setCancelModalOpen(false);
      NotificationManager.success("Cancel requested", "Cancelled", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const confirmAction = (action, data) => {
    setActions({ action: action, data: data });
    setDeleteAlert(true);
  };
  const performAction = async (res) => {
    if (!res) {
      return false;
    }
    console.log("in perfrom action", actions.action);
    if (actions.action === "choose_chef") {
      setIsLoadingForLog(true);
      let formdata = {};
      formdata["chosen_chef"] = actions.data;
      try {
        let { data } = await api.post(axiosURLS.BOOKING_ACTION + "/" + "choose_chef" + "/" + booking.id, formdata);
        NotificationManager.success("Chef chosen successfully", "Sucess", 3000, null, null, "");
        setBooking(data);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
      setIsLoadingForLog(false);
    }
    if (actions.action === "schedule_delivery_all") {
      setIsLoadingForLog(true);
      let formdata = {};
      formdata["chosen_chef"] = actions.data;
      try {
        let { data } = await api.post(axiosURLS.BOOKING_ACTION + "/" + "schedule_delivery_all" + "/" + booking.id, formdata);
        NotificationManager.success("Delivery scheduled successfully", "Sucess", 3000, null, null, "");
        setBooking(data);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
      setIsLoadingForLog(false);
    }
    if (actions.action === "cancel_unpaid_order") {
      requestCancel({ amount: 0, desc: "Cancel unpaid order" });
    }
  };
  const cancelOrder = () => {
    if (booking.status !== "Order Placed") {
      setCancelModalOpen(true);
    } else {
      confirmAction("cancel_unpaid_order", {});
    }
  };
  const resendLink = async (user_id, forstep) => {
    setIsLoadingDunzo(true);
    try {
      let { data } = await api.post(axiosURLS.BOOKING_RESEND_LINK + "/" + booking.id + "/" + user_id, { forstep: forstep });
      NotificationManager.success("Link resent successfully", "Success", 3000, null, null, "");
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoadingDunzo(false);
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
              {booking.type === "chef_table" && booking.status === "Order Placed" ? (
                <DropdownItem onClick={requestPaymentPopup}>
                  <IntlMessages id="pages.request_payment" />
                </DropdownItem>
              ) : (
                ""
              )}
              {booking.status === "Order Paid" ? (
                <DropdownItem onClick={markAsCompleted}>
                  <IntlMessages id="pages.mark_as_completed" />
                </DropdownItem>
              ) : (
                ""
              )}
              {booking.status !== "Order Completed" && booking.status !== "Order Cancelled" ? (
                <DropdownItem onClick={cancelOrder}>
                  <IntlMessages id="pages.cancel_order" />
                </DropdownItem>
              ) : (
                ""
              )}
              {booking.type === "virtual_dining" && booking.status == "Order Paid" ? (
                <DropdownItem
                  onClick={() => {
                    confirmAction("schedule_delivery_all", {});
                  }}
                >
                  <IntlMessages id="pages.schedule_delivery_all" />
                </DropdownItem>
              ) : (
                ""
              )}
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
          {booking.type === "chef_event" || (booking.type === "virtual_dining" && (booking.menu_selection === "diner" || booking.delivery_selection === "diner")) ? (
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
                      <b>Type:</b> {booking.type === "virtual_dining" ? "Virtual Dining" : booking.type === "chef_table" ? "Chef's Table" : "Chef's Event"}
                    </p>
                    <p>
                      <b>Diner Count:</b> {booking.diner_count}
                    </p>
                    <p>
                      <b>Experience date:</b> {moment.utc(booking.booking_date).format("MMM D, Y HH:mm")}
                      {booking.dunzo_taskids && booking.dunzo_taskids.length === 0 && booking.type === "virtual_dining" ? (
                        <button onClick={updateBookingTime} className="btn btn-outline-primary" title="Edit delivery Time">
                          <i className="simple-icon-pencil" />
                        </button>
                      ) : (
                        ""
                      )}
                    </p>
                    {booking.type !== "chef_event" ? (
                      <>
                        <p>
                          <b>Meal:</b> {booking.meal}
                        </p>
                        <p>
                          <b>City:</b> {booking.city}
                        </p>
                        <p>
                          <b>Additional message:</b> {booking.message}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                    <p>
                      <b>Order status:</b> {booking.status}
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
                    ) : booking.status === "Order Completed" ? (
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${isLoadingDunzo ? "show-spinner" : ""}`}
                        onClick={() => {
                          resendLink(booking.user.id, "get_user_feedback");
                        }}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="pages.request_feedback" />
                        </span>
                      </Button>
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
                    {(booking.status === "Order Paid" || booking.status === "Order Completed") && booking.payment ? (
                      <>
                        <p>
                          <b>Total:</b> {booking.total}
                        </p>
                        {booking.type === "virtual_dining" || booking.type === "chef_event" ? (
                          <>
                            <p>
                              <b>Meal Cost:</b> {booking.payment.meal}
                            </p>
                            <p>
                              <b>Taxes:</b> {booking.payment.taxes}
                            </p>
                            {booking.type !== "chef_event" ? (
                              <>
                                <p>
                                  <b>Delivery Charges:</b> {booking.payment.delivery_charges}
                                </p>
                                <p>
                                  <b>Mood Bag:</b> {booking.payment.mood_bag}
                                </p>
                              </>
                            ) : (
                              ""
                            )}

                            <p>
                              <b>Discount:</b> {booking.payment.discount}
                            </p>
                            <p>
                              <b>Voucher:</b> {booking.payment.voucher}
                            </p>
                            <p>
                              <b>Razorpay Order Number:</b> {booking.payment.order_number}
                            </p>
                            <p>
                              <b>Razorpay Payment Id:</b> {booking.payment.payment_id}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              <b>Razorpay Invoice Id:</b> {booking.payment.invoice_id}
                            </p>
                            <p>
                              <b>Razorpay Payment Id:</b> {booking.payment.payment_id}
                            </p>
                          </>
                        )}
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
                {booking.type === "virtual_dining" && booking.delivery_selection === "common" ? (
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
                            <b>Dunzo Ref Id:</b> {taskid.task_id}{" "}
                            <button
                              onClick={() => {
                                fetchAndViewDunzo(taskid.task_id);
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
                {booking.type === "chef_event" ? (
                  <Card className="mb-2">
                    <CardBody>
                      <CardTitle>
                        <h3>Event Details</h3>
                      </CardTitle>
                      <p>
                        <b>Title:</b> {booking.event.title}
                      </p>
                      <p>
                        <b>Description:</b> {booking.event.desc}
                      </p>
                      <p>
                        <b>Venue:</b> {booking.event.venue.address}
                      </p>
                      <p>
                        <b>Time From:</b> {booking.event.timefrom}
                      </p>
                      <p>
                        <b>Time Till:</b> {booking.event.timetill}
                      </p>
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
                  <>
                    {booking.chosen_chef ? (
                      <Card className="mb-2">
                        <CardBody>
                          <CardTitle>
                            <h3>Chef Chosen</h3>
                          </CardTitle>
                          <Row>
                            <Colxx xxs="12">
                              <NavLink location={{}} to={`${adminRoot}/chef/view/?p=${booking.chosen_chef.id}`}>
                                <ThumbnailImage rounded small src={booking.chosen_chef.picture} alt="profile" className="m-2" /> {booking.chosen_chef.name},(
                                {booking.chosen_chef.mobile})
                              </NavLink>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Card>
                    ) : (
                      ""
                    )}
                    <Card className="mb-2">
                      <CardBody>
                        <CardTitle>
                          <h3>Chefs Requested</h3>
                        </CardTitle>
                        <Row>
                          {booking.chefs.map((chef) => (
                            <React.Fragment key={chef.id}>
                              <Colxx xxs="8">
                                <NavLink location={{}} to={`${adminRoot}/chef/view/?p=${chef.id}`}>
                                  <ThumbnailImage rounded small src={chef.picture} alt="profile" className="m-2" /> {chef.name},({chef.mobile})
                                </NavLink>
                                {!booking.chosen_chef && (booking.status === "Order Placed" || booking.status === "Order Paid") ? (
                                  <Button
                                    color="primary"
                                    className={`btn-shadow btn-multiple-state ${isLoadingForLog ? "show-spinner" : ""}`}
                                    onClick={() => {
                                      confirmAction("choose_chef", chef.id);
                                    }}
                                  >
                                    <span className="spinner d-inline-block">
                                      <span className="bounce1" />
                                      <span className="bounce2" />
                                      <span className="bounce3" />
                                    </span>
                                    <span className="label">
                                      <IntlMessages id="pages.choose" />
                                    </span>
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </Colxx>
                              <Colxx xxs="4"></Colxx>
                            </React.Fragment>
                          ))}
                        </Row>
                      </CardBody>
                    </Card>
                  </>
                ) : (
                  ""
                )}
              </Colxx>
            </Row>
          </TabPane>
          {booking.type === "chef_event" ||
          (booking.type === "virtual_dining" && (booking.menu_selection === "diner" || booking.delivery_selection === "diner")) ? (
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
                  setIsLoadingDunzo={setIsLoadingDunzo}
                  setBooking={setBooking}
                />
              </Row>
            </TabPane>
          ) : (
            ""
          )}
        </TabContent>
      </Colxx>
      <Dunzodetails details={dunzoDetails} modalOpen={modalOpen} toggleModal={() => setModalOpen(!modalOpen)} />
      <RequestPayment requestPayment={requestPayment} modalOpen={paymentModalOpen} toggleModal={() => setPaymentModalOpen(!paymentModalOpen)} />
      <Deletealert modalOpen={deleteAlert} toggleModal={() => setDeleteAlert(!deleteAlert)} setSureDelete={performAction} />
      <Cancelorder requestCancel={requestCancel} modalOpen={cancelModalOpen} toggleModal={() => setCancelModalOpen(!cancelModalOpen)} />
      <Editbooking
        modalOpen={editModalOpen}
        setBooking={setBooking}
        selectedTask={selectedTask}
        bookingId={bookingId}
        toggleModal={() => setEditModalOpen(!editModalOpen)}
      />
    </Row>
  );
};
export default Singleview;
