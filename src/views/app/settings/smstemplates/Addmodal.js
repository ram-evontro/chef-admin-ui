import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Badge, FormGroup } from "reactstrap";
import smsTemplateVariables from "data/sms_template_variables";
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const Addmodal = ({ modalOpen, toggleModal, fetchData, editformdata, modalFor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [badges, setBadges] = useState([]);
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setId(editformdata["id"]);
    let temp = { ...editformdata };
    delete temp["id"];
    setFormdata(temp);
  }, [editformdata]);
  useEffect(() => {
    if (!modalOpen) {
      setErrors({});
      setFormdata({});
      setBadges([]);
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
      tempErrors.name = "Please enter name";
    }
    if (!formdata.message) {
      tempErrors.message = "Please enter template";
    }
    if (!formdata.slug) {
      tempErrors.slug = "Please select slug";
    }
    setErrors(tempErrors);
    if (tempErrors && Object.keys(tempErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const setSlug = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    tempdata["slug"] = val;
    setFormdata(tempdata);
    let tempErrors = { ...errors };
    delete tempErrors['slug'];
    setErrors(tempErrors);
    if (val != "") {
      setBadges([...smsTemplateVariables[val]]);
    } else {
      setBadges([]);
    }
  };
  const insertTag = (tag) => {
    let tempdata = { ...formdata };
    if (tempdata["message"]) {
      tempdata["message"] = tempdata["message"] + tag;
    } else {
      tempdata["message"] = tag;
    }
    setFormdata(tempdata);
  };
  const handleClick = async () => {
    if (!validate()) {
      return false;
    }
    setIsLoading(true);
    let newformdata;
    try {
      if (modalFor === "edit") {
        await api.patch(axiosURLS.SMS_TEMPLATES + "/" + id, formdata);
        NotificationManager.success("Sms Template Edited successfully", "Success", 3000, null, null, "");
      } else {
        await api.post(axiosURLS.SMS_TEMPLATES, formdata);
        NotificationManager.success("Sms Template Added successfully", "Success", 3000, null, null, "");
      }
      fetchData();
      toggleModal();
    } catch (err) {
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
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
        {/* <Label className="mt-4">
          <IntlMessages id="forms.url" />
        </Label>
        <Input
          type="textarea"
          name="url"
          value={formdata.url ? formdata.url : ""}
          onChange={handleChange}
          placeholder="Enter API URL from SMS provider. with [MOBILE NUMBER] and [MESSAGE] as dynamic fields"
        /> */}
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.message" />
          </Label>
          <Input rows={8} type="textarea" name="message" value={formdata.message ? formdata.message : ""} onChange={handleChange} />
          {errors.message && <div className="invalid-feedback d-block">{errors.message}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.type" />
          </Label>
          <select className="form-control" name="slug" value={formdata.slug ? formdata.slug : ""} onChange={setSlug} id="slug">
            <option key={"slugs_select-1"} value="">
              Select Template
            </option>
            {Object.keys(smsTemplateVariables).map((data, index) => {
              return (
                <option key={data} value={data}>
                  {data.split("_").join(" ").toUpperCase()}
                </option>
              );
            })}
          </select>
          {errors.slug && <div className="invalid-feedback d-block">{errors.slug}</div>}
        </FormGroup>
        {badges.map((data, index) => (
          <Badge
            onClick={() => {
              insertTag(data.val);
            }}
            key={data.key}
            color="primary"
          >
            {data.title}
          </Badge>
        ))}
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
