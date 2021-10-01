import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, CustomInput, FormGroup } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import TimePicker from "react-time-picker";
import api from "helpers/api";
import moment from "moment";
import * as axiosURLS from "helpers/endpoints";
const Editbooking = ({ modalOpen, toggleModal, selectedTask, bookingId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  const validate = (e) => {
    let tempErrors = {};

    if (!formdata.time) {
      tempErrors.time = "Please enter new time";
    }

    setErrors(tempErrors);
    if (tempErrors && Object.keys(tempErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const setTime = (val) => {
    let temp = { ...formdata };
    temp["time"] = val;
    setFormdata(temp);
    let tempErrors = { ...errors };
    delete tempErrors["time"];
    setErrors(tempErrors);
  };
  const handleClick = async () => {
    if (!validate()) {
      return false;
    }
    setIsLoading(true);
    formdata["booking_id"] = bookingId;
    try{
    let { data } = await api.post(axiosURLS.DUNZO_EDIT + "/" + selectedTask, formdata);
    toggleModal();
    }
    catch(err)
    {
      console.log(err);
    }
    setIsLoading(false);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.edit_booking" />
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.new_booking_time" />
          </Label>
          <TimePicker value={formdata.time ? formdata.time : ""} onChange={(val) => setTime(val)} />
          {errors.time && <div className="invalid-feedback d-block">{errors.time}</div>}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button color="primary" className={`btn-shadow btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleClick}>
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">
            <IntlMessages id="pages.submit" />
          </span>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Editbooking;
