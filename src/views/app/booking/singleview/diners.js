import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Badge, Alert, CardFooter, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";
import IntlMessages from "helpers/IntlMessages";
import moment from "moment";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { adminRoot } from "constants/defaultValues";
import { NotificationManager } from "components/common/react-notifications";
const DinerItem = ({ item, menu, delivery, deliveryObj, resendLink, isLoadingDunzo, isLoading, scheduleDelivery, fetchTaskDetails, message, booking }) => {
  return (
    <Colxx xxs="12" md="4">
      <Card className="card mb-3">
        <div className="position-relative">
          <Badge color={item.is_ready ? "primary" : "secondary"} pill className="position-absolute badge-top-right">
            {item.is_ready ? "Details Filled" : "Details Pending"}
          </Badge>
        </div>
        <div style={{ width: "100%" }} className=" min-width-full">
          <CardBody className="align-self-center d- min-width-zero align-items-md-center">
            <span className="align-middle d-inline-block">{item.user.name}</span>
            <p className="mb-1 text-muted text-small  w-xs-100">{item.user.mobile}</p>
          </CardBody>
        </div>
        <div className="card-body pt-1">
          <p>
            <b>Number of Meals:</b> {item.meals}
          </p>
          <p>
            <b>Mood Bag requested:</b>
            {item.mood_bag ? "Yes" : "No"}
          </p>
          {item.avoid.length > 0 ? (
            <p>
              <b>Allergic to:</b> {item.avoid.join(",")}
            </p>
          ) : (
            ""
          )}
          {menu && item.menu ? (
            <p>
              <b>Menu Selected:</b>{" "}
              <NavLink location={{}} to={`${adminRoot}/chef/menuview/?menu=${item.menu.id}`}>
                {item.menu.title}
              </NavLink>
            </p>
          ) : (
            ""
          )}
          {delivery && item.address && item.address.address1 ? (
            <>
              <p>
                <b>Address Selected:</b> {item.address.address1}
                <br />
                {item.address.address2}
                <br />
                <b>Lankmark:</b> {item.address.landmark}
                <br />
                <b>Pincode:</b> {item.address.pincode}
                <br />
                <b>Address Type:</b> {item.address.type}
                <br />
              </p>
              {deliveryObj && Object.keys(deliveryObj).length > 0 ? (
                deliveryObj[item._id] ? (
                  <>
                    <p>
                      <b>Dunzo Ref:</b> {deliveryObj[item._id]["task_id"] ? deliveryObj[item._id]["task_id"] : ""}
                      <Button
                        color="secondary"
                        outline
                        className={`btn-multiple-state ${isLoadingDunzo ? "show-spinner" : ""}`}
                        onClick={() => {
                          fetchTaskDetails(deliveryObj[item._id]["task_id"]);
                        }}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <i className="simple-icon-eye" />
                        </span>
                      </Button>
                    </p>
                  </>
                ) : (
                  <Alert color="warning" className="rounded">
                    {deliveryObj["error"]}
                  </Alert>
                )
              ) : message ? (
                <Alert color="warning" className="rounded">
                  {message}
                </Alert>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {booking.feedbacks && booking.feedbacks[item.user.id] ? (
            <p>
              <b>Feedback:</b> <br />
              {booking.feedbacks[item.user.id].message}
              <br />
              {booking.feedbacks[item.user.id].rating.map((rate) => (
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
        </div>
        {booking.status === "Order Paid" && (!deliveryObj || Object.keys(deliveryObj).length == 0 || !deliveryObj[item._id]) ? (
          <CardFooter>
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={() => {
                resendLink(item._id, "fill_details");
              }}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="pages.resend_link" />
              </span>
            </Button>
            {booking.delivery_selection === "diner" ? (
              <Button
                color="primary"
                className={`btn-shadow ml-3 btn-multiple-state ${isLoadingDunzo ? "show-spinner" : ""}`}
                onClick={() => {
                  scheduleDelivery(item._id);
                }}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="pages.schedule_delivery" />
                </span>
              </Button>
            ) : (
              ""
            )}
          </CardFooter>
        ) : (
          ""
        )}
        {booking.status === "Order Completed" && !booking.feedbacks[item.user.id] ? (
          <CardFooter>
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={() => {
                resendLink(item._id, "get_feedback");
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
          </CardFooter>
        ) : (
          ""
        )}
      </Card>
    </Colxx>
  );
};

const Diners = ({ menu, delivery, diners, booking, updateDunzo, viewDunzo, isLoadingDunzo, setDunzoDetails, setIsLoadingDunzo, setBooking }) => {
  const [message, setMessage] = useState("");
  const [deliveryObj, setDeliveryObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(async () => {
    if (moment().add(7, "days").isBefore(booking.booking_date)) {
      setMessage("Details will be shared 7 days before booking date");
    } else {
      await fetchDeliveryData();
    }
  }, [booking]);

  const fetchDeliveryData = async () => {
    let tempDeliveryObj = {};
    await Promise.all(
      booking.dunzo_taskids.map(async (task) => {
        if (task.task_id) {
          let { data } = await api.post(axiosURLS.DUNZO + "/" + booking.id + "/" + task.task_id);
          data.locations_order.map((step) => {
            if (step.type === "drop") {
              let diner_id = step.reference_id.split("-")[2];
              if (diner_id) {
                tempDeliveryObj[diner_id] = {
                  task_id: task.task_id,
                  state: step.state,
                  details: data,
                };
              }
            }
          });
        } else {
          tempDeliveryObj["error"] = task.state;
        }
      })
    );
    setDeliveryObj(tempDeliveryObj);
  };
  const resendLink = async (diner_id, forstep) => {
    setIsLoading(true);
    try {
      let { data } = await api.post(axiosURLS.BOOKING_RESEND_LINK + "/" + booking.id + "/" + diner_id, { forstep: forstep });
      NotificationManager.success("Link resent successfully", "Success", 3000, null, null, "");
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const scheduleDelivery = async (diner_id) => {
    setIsLoadingDunzo(true);
    try {
      let { data } = await api.post(axiosURLS.BOOKING_SCHEDULE_DINER + "/" + booking.id + "/" + diner_id);
      setBooking(data);
      NotificationManager.success("Delivery scheduled successfully", "Success", 3000, null, null, "");
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoadingDunzo(false);
  };
  const fetchTaskDetails = async (task_id) => {
    setIsLoadingDunzo(true);
    try {
      let { data } = await api.post(axiosURLS.DUNZO + "/" + booking.id + "/" + task_id);
      setDunzoDetails(data);
      viewDunzo(task_id);
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoadingDunzo(false);
  };
  return (
    <>
      {diners.map((item, index) => (
        <DinerItem
          key={`todo_item_${index}`}
          updateDunzo={updateDunzo}
          isLoadingDunzo={isLoadingDunzo}
          deliveryObj={deliveryObj}
          menu={menu}
          delivery={delivery}
          item={item}
          message={message}
          booking={booking}
          resendLink={resendLink}
          scheduleDelivery={scheduleDelivery}
          isLoading={isLoading}
          fetchTaskDetails={fetchTaskDetails}
        />
      ))}
    </>
  );
};

export default Diners;
