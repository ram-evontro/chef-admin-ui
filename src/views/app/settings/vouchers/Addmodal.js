import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, CustomInput, FormGroup } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const Addmodal = ({ modalOpen, toggleModal, fetchData, editformdata, modalFor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setId(editformdata["id"]);
    let temp = { ...editformdata };
    delete temp["id"];
    delete temp["status"];
    delete temp["times_used"];
    setFormdata(temp);
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

    if (!formdata.code) {
      tempErrors.code = "Please enter code";
    }
    if (!formdata.expiry) {
      tempErrors.expiry = "Please enter expiry date";
    }
    if (!formdata.type) {
      tempErrors.type = "Please select type";
    }
    if (!formdata.value) {
      tempErrors.value = "Please enter value";
    }
    if (!formdata.max_uses) {
      tempErrors.max_uses = "Please enter max uses";
    }
    if (!formdata.min_order_value) {
      tempErrors.min_order_value = "Please enter minimum order value";
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
        await api.patch(axiosURLS.VOUCHER + "/" + id, formdata);
        NotificationManager.success("Voucher Edited successfully", "Success", 3000, null, null, "");
      } else {
        await api.post(axiosURLS.VOUCHER, formdata);
        NotificationManager.success("Voucher Added successfully", "Success", 3000, null, null, "");
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
  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  const setExpiry = (val) => {
    let temp = { ...formdata };
    temp["expiry"] = val;
    setFormdata(temp);
    let tempErrors = { ...errors };
    delete tempErrors["expiry"];
    setErrors(tempErrors);
  };
  const shuffleCode = () => {
    let temp = { ...formdata };
    temp["code"] = randomString(7, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    setFormdata(temp);
    let tempErrors = { ...errors };
    delete tempErrors["code"];
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
            <IntlMessages id="forms.code" />
            <a onClick={shuffleCode} href="javascript:;">
              <i className="glyph-icon simple-icon-shuffle"></i>
            </a>
          </Label>
          <Input type="text" name="code" value={formdata.code ? formdata.code : ""} onChange={handleChange} />
          {errors.code && <div className="invalid-feedback d-block">{errors.code}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.expiry" />
          </Label>
          <DatePicker minDate={new Date()} selected={Date.parse(formdata.expiry)} onChange={(val) => setExpiry(val)} shouldCloseOnSelect />
          {errors.expiry && <div className="invalid-feedback d-block">{errors.expiry}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.type" />
          </Label>
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="type"
            label="PERCENTAGE"
            onChange={handleChange}
            value="Percentage"
            checked={formdata.type === "Percentage" ? true : false}
          />
          <CustomInput
            type="radio"
            id="extype2"
            name="type"
            label="AMOUNT"
            onChange={handleChange}
            value="Amount"
            checked={formdata.type === "Amount" ? true : false}
          />
          {errors.type && <div className="invalid-feedback d-block">{errors.type}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.value" />
          </Label>
          <Input type="number" name="value" value={formdata.value ? formdata.value : ""} onChange={handleChange} />
          {errors.value && <div className="invalid-feedback d-block">{errors.value}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.max_uses" />
          </Label>
          <Input type="number" min="1" name="max_uses" value={formdata.max_uses ? formdata.max_uses : ""} onChange={handleChange} />
          {errors.max_uses && <div className="invalid-feedback d-block">{errors.max_uses}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.min_order_value" />
          </Label>
          <Input type="number" name="min_order_value" value={formdata.min_order_value ? formdata.min_order_value : ""} onChange={handleChange} />
          {errors.min_order_value && <div className="invalid-feedback d-block">{errors.min_order_value}</div>}
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
