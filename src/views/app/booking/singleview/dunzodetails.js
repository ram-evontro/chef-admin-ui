import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, CustomInput } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import moment from "moment";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const Dunzodetails = ({ modalOpen, toggleModal, details }) => {
  const [formdata, setFormdata] = useState({});

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.delivery_details" />
      </ModalHeader>
      <ModalBody>
        {details ? (
          <>
            <p>
              <b>Status:</b> {details.state}
            </p>
            <p>
              <b>Delivery Person details:</b>{" "}
              {details.runner ? (
                <>
                  {details.runner.name} ({details.runner.phone_number})
                </>
              ) : (
                ""
              )}
            </p>
            <p>
              <b>Progress:</b>
              <br />
              {details.locations_order
                ? details.locations_order.map((step) => (
                    <>
                      <b>{step.state}: </b>
                      {step.type ? step.type.toUpperCase() : "NA"}
                      <br />
                    </>
                  ))
                : ""}
            </p>
            <hr />
            <p>
              <b>Timeline:</b>
              <br />
            </p>
            {details.timeline
              ? details.timeline.map((tline) => (
                  <>
                    {moment(tline.details.event_timestamp).format("MMM , D Y H:mm")}--------- {tline.state.toUpperCase()}{" "}
                    {tline.details.runner ? "-----" + tline.details.runner.name + " (" + tline.details.runner.phone_number + ")" : ""}
                    {tline.details.price ? "----- Price:" + tline.details.price : ""}
                     <br />
                  </>
                ))
              : ""}
          </>
        ) : (
          ""
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Dunzodetails;
