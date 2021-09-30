import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Badge, Alert } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";
import moment from "moment";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { adminRoot } from "constants/defaultValues";
const DinerItem = ({ item, menu, delivery, deliveryObj, updateDunzo, viewDunzo, isLoadingDunzo, setDunzoDetails, message, booking }) => {
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
                    </p>
                    <p>
                      <b>Dunzo Status:</b> {deliveryObj[item._id]["state"] ? deliveryObj[item._id]["state"] : ""}{" "}
                      <button
                        onClick={() => {
                          updateDunzo(deliveryObj[item._id]["task_id"]);
                        }}
                        className="btn btn-outline-primary"
                      >
                        <i className={` ${isLoadingDunzo ? "animate-spin" : ""}  simple-icon-refresh`} />
                      </button>
                      <button
                        onClick={() => {
                          setDunzoDetails(deliveryObj[item._id]["details"]);
                          viewDunzo(deliveryObj[item._id]["task_id"]);
                        }}
                        className="btn btn-outline-primary"
                      >
                        <i className="simple-icon-eye" />
                      </button>
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
      </Card>
    </Colxx>
  );
};

const Diners = ({ menu, delivery, diners, booking, updateDunzo, viewDunzo, isLoadingDunzo, setDunzoDetails }) => {
  const [message, setMessage] = useState("");
  const [deliveryObj, setDeliveryObj] = useState({});
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
          let { data } = await api.post(axiosURLS.DUNZO + "/" + task.task_id);
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
  return (
    <>
      {diners.map((item, index) => (
        <DinerItem
          key={`todo_item_${index}`}
          updateDunzo={updateDunzo}
          viewDunzo={viewDunzo}
          isLoadingDunzo={isLoadingDunzo}
          deliveryObj={deliveryObj}
          menu={menu}
          delivery={delivery}
          item={item}
          setDunzoDetails={setDunzoDetails}
          message={message}
          booking={booking}
        />
      ))}
    </>
  );
};

export default Diners;
