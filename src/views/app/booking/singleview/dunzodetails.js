import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, CustomInput } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
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
              <b>Progress:</b><br />
              {details.locations_order
                ? details.locations_order.map((step) => (<>{step.type.toUpperCase()}: {step.state} <br /></>))
                : ""}
            </p>
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
