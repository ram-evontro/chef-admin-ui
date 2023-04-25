import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Row } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import Select from "react-select";
import CustomSelectInput from "components/common/CustomSelectInput";
const Addmodal = ({ modalOpen, toggleModal, id, fetchData }) => {
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedChef, setSelectedChef] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!modalOpen) {
      setErrors({});
      setFormdata({});
      setSelectedChef({});
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
  const handleChefSelect = (val) => {
    setFormdata({ ...formdata, chef: val.value });
    setSelectedChef(val);
    let tempErrors = { ...errors };
    delete tempErrors["chef"];
    setErrors(tempErrors);
  };
  const validate = (e) => {
    let tempErrors = {};
    if (!formdata["title"] || formdata["title"] === "") {
      tempErrors.title = "Please enter title";
    }
    if (!formdata["description"] || formdata["description"] === "") {
      tempErrors.description = "Please enter some description";
    }
    if (!formdata["rating"] || formdata["rating"] === "") {
      tempErrors.rating = "Please enter rating";
    }
    if (!formdata["from"] || formdata["from"] === "") {
      tempErrors.from = "Please enter from";
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
      if (id) {
        formdata["to"] = id;
      }

      await api.post(axiosURLS.CREATE_FEEDBACK, formdata);
      NotificationManager.success("Feedback Added successfully", "Added", 3000, null, null, "");

      fetchData();
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
    toggleModal();
  };
  const setTime = (val, param) => {
    let temp = { ...formdata };
    temp[param] = val;
    setFormdata(temp);
    let tempErrors = { ...errors };
    delete tempErrors[param];
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
            <IntlMessages id="forms.title" />
          </Label>
          <Input type="text" name="title" value={formdata.title ? formdata.title : ""} onChange={handleChange} />
          {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.description" />
          </Label>
          <Input type="textarea" name="description" value={formdata.description ? formdata.description : ""} onChange={handleChange} />
          {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.rating" />
          </Label>
          <Input type="number" max="5" min="0" name="rating" value={formdata.rating ? formdata.rating : ""} onChange={handleChange} />
          {errors.rating && <div className="invalid-feedback d-block">{errors.rating}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.from" />
          </Label>
          <Input type="text" name="from" value={formdata.from ? formdata.from : ""} onChange={handleChange} />
          {errors.from && <div className="invalid-feedback d-block">{errors.from}</div>}
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
