import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import emailTemplateVariables from "data/email_template_variables";
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import PopoverItem from "../../elements/PopoverItem";
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
    delete temp["preview"];
    setFormdata(temp);
  }, [editformdata]);
  useEffect(() => {
    if (!formdata.slug || formdata.slug === "") {
      setBadges([]);
    }
  }, [formdata]);
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
    if (!formdata.subject) {
      tempErrors.subject = "Please enter subject";
    }
    if (!formdata.slug) {
      tempErrors.slug = "Please select type";
    }
    if (!formdata.body_html) {
      tempErrors.body_html = "Please enter mail content";
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
    delete tempErrors["slug"];
    setErrors(tempErrors);
    if (val != "") {
      setBadges([...emailTemplateVariables[val]]);
    } else {
      setBadges([]);
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
        await api.patch(axiosURLS.EMAIL_TEMPLATES + "/" + id, formdata);
        NotificationManager.success("Email Template Edited successfully", "Success", 3000, null, null, "");
      } else {
        await api.post(axiosURLS.EMAIL_TEMPLATES, formdata);
        NotificationManager.success("Email Template Added successfully", "Success", 3000, null, null, "");
      }
      fetchData();
      toggleModal();
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" backdrop="static">
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
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.type" />
          </Label>
          <select className="form-control" name="slug" value={formdata.slug ? formdata.slug : ""} onChange={setSlug} id="slug">
            <option key={"slugs_select-1"} value="">
              Select Template
            </option>
            {Object.keys(emailTemplateVariables).map((data, index) => {
              return (
                <option key={data} value={data}>
                  {data.split("_").join(" ").toUpperCase()}
                </option>
              );
            })}
          </select>
          {errors.slug && <div className="invalid-feedback d-block">{errors.slug}</div>}
        </FormGroup>
        <p>
          {badges.map((data, index) => (
            <PopoverItem id={index} key={index} item={{ body: data.val, text: data.title, placement: "top" }} />
          ))}
        </p>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.subject" />
          </Label>
          <Input
            type="textarea"
            name="subject"
            value={formdata.subject ? formdata.subject : ""}
            onChange={handleChange}
            placeholder="You can select tags for dynamic values"
          />
          {errors.subject && <div className="invalid-feedback d-block">{errors.subject}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.body_html" />
          </Label>
          <Input
            type="textarea"
            name="body_html"
            value={formdata.body_html ? formdata.body_html.replaceAll("&lt;", "<") : ""}
            onChange={handleChange}
            rows={30}
          />
          {errors.body_html && <div className="invalid-feedback d-block">{errors.body_html}</div>}
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
