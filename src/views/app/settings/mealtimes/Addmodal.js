import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import TimePicker from 'react-time-picker';
const Addmodal = ({ modalOpen, toggleModal, fetchData, editformdata, modalFor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (editformdata) {
      setId(editformdata["id"]);
      let temp = { ...editformdata };
      delete temp["id"];
      setFormdata(temp);
    }
  }, [editformdata]);
  useEffect(() => {
    if (!modalOpen) {
      setErrors({});
      setFormdata({});
    }
  }, [modalOpen]);
  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
    let tempErrors = { ...errors };
    delete tempErrors[name];
    setErrors(tempErrors);
  };
  const validate = (e) => {
    let tempErrors = {};

    if (!formdata.name) {
      tempErrors.name = "Please enter value";
    }
    if (!formdata.time) {
      tempErrors.time = "Please select time";
    }
    setErrors(tempErrors);
    if (tempErrors && Object.keys(tempErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleClick = async () => {
    if (!validate()) {
      return false;
    }
    setIsLoading(true);
    let newformdata;
    try {
      if (modalFor === "edit") {
        await api.patch(axiosURLS.MEAL_TIMES + "/" + id, formdata);
        NotificationManager.success("Meal Time Edited successfully", "Success", 3000, null, null, "");
      } else {
        await api.post(axiosURLS.MEAL_TIMES, formdata);
        NotificationManager.success("Meal Time Added successfully", "Success", 3000, null, null, "");
      }
      toggleModal();
      fetchData();
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const setTime = (val) => {
    let temp = { ...formdata };
    temp["time"] = val;
    setFormdata(temp);
    let tempErrors = { ...errors };
    delete tempErrors["time"];
    setErrors(tempErrors);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} wrapClassName="modal-right" backdrop="static">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.add-new-modal-title" />
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.name" />
          </Label>
          <Input type="text" name="name" value={formdata.name ? formdata.name : ""} onChange={handleChange} />
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.time" />
          </Label>
          <TimePicker value={formdata.time ? formdata.time : ""}  onChange={(val) => setTime(val)}/>
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

export default Addmodal;
