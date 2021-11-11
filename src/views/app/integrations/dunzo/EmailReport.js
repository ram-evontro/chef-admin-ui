import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, CustomInput, FormGroup } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const EmailReport = ({ modalOpen, toggleModal, sendEmail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
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

    if (!formdata.email) {
      tempErrors.email = "Please enter email";
    }
    if (!formdata.datefrom) {
      tempErrors.datefrom = "Please enter From date";
    }
    if (!formdata.dateto) {
        tempErrors.dateto = "Please enter To date";
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
    await sendEmail(formdata);
    toggleModal(false);
    setIsLoading(false);
  };
  const setDate = (val,param) => {
    let temp = { ...formdata };
    temp[param] = val;
    setFormdata(temp);
    let tempErrors = { ...errors };
    delete tempErrors[param];
    setErrors(tempErrors);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
      <ModalHeader toggle={toggleModal}>Email Reports</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.email" />
          </Label>
          <Input type="text" name="email" value={formdata.email ? formdata.email : ""} onChange={handleChange} />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.date_from" />
          </Label>
          <DatePicker  selected={Date.parse(formdata.datefrom)} onChange={(val) => setDate(val,'datefrom')} shouldCloseOnSelect />
          {errors.datefrom && <div className="invalid-feedback d-block">{errors.datefrom}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.date_to" />
          </Label>
          <DatePicker selected={Date.parse(formdata.dateto)} onChange={(val) => setDate(val,'dateto')} shouldCloseOnSelect />
          {errors.dateto && <div className="invalid-feedback d-block">{errors.dateto}</div>}
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

export default EmailReport;
