import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import fileapi from "helpers/fileupload";
import { NotificationManager } from "components/common/react-notifications";
import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
const Addmodal = ({ modalOpen, toggleModal, fetchData, editformdata, modalFor, chefTypes }) => {
  const ReactDOMServer = require("react-dom/server");
  const { upload } = fileapi();
  let componentConfig = { postUrl: "no-url", multiple: false };
  let eventHandlers = { addedfile: (file) => setPicture(file) };
  const djsConfig = {
    thumbnailHeight: 160,
    maxFilesize: 2,
    maxFiles: 1,
    autoProcessQueue: false,
    multiple: false,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview mb-3">
        <div className="d-flex flex-row ">
          <div className="p-0 w-30 position-relative">
            <div className="dz-error-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="dz-success-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="preview-container">
              {/*  eslint-disable-next-line jsx-a11y/alt-text */}
              <img data-dz-thumbnail className="img-thumbnail border-0" />
              <i className="simple-icon-doc preview-icon" />
            </div>
          </div>
          <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
            <div>
              <span data-dz-name />
            </div>
            <div className="text-primary text-extra-small" data-dz-size />
            <div className="dz-progress">
              <span className="dz-upload" data-dz-uploadprogress />
            </div>
            <div className="dz-error-message">
              <span data-dz-errormessage />
            </div>
          </div>
        </div>
        <a href="#/" className="remove" data-dz-remove>
          <i className="glyph-icon simple-icon-trash" />
        </a>
      </div>
    ),
  };
  const [picture, setPicture] = useState(null);
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
    if (name === "chef_type") {
      tempdata["details"] = { chef_type: val };
    } else {
      tempdata[name] = val;
    }

    setFormdata(tempdata);
    let tempErrors = { ...errors };
    delete tempErrors[name];
    setErrors(tempErrors);
  };
  const validate = (e) => {
    let tempErrors = {};
    if (!formdata.name) {
      tempErrors.name = "Please enter chef name";
    }
    if (!formdata.email) {
      tempErrors.email = "Please enter email";
    }
    if (formdata.email) {
      var re = /\S+@\S+\.\S+/;
      if (!re.test(formdata.email)) {
        tempErrors.email = "Please enter valid email";
      }
    }
    if (!formdata.mobile) {
      tempErrors.mobile = "Please enter mobile";
    }
    if (!formdata.details || !formdata.details.chef_type) {
      tempErrors.chef_type = "Please enter chef type";
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
      if (picture) {
        let fileurl = await upload(picture);
        formdata["picture"] = fileurl;
      }

      formdata["password"] = "CAP1@" + formdata["mobile"];
      await api.post(axiosURLS.USERS, formdata);
      NotificationManager.success("Chef Added successfully", "Added", 3000, null, null, "");

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
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.email" />
          </Label>
          <Input type="text" name="email" value={formdata.email ? formdata.email : ""} onChange={handleChange} />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.mobile" />
          </Label>
          <Input type="number" name="mobile" value={formdata.mobile ? formdata.mobile : ""} onChange={handleChange} />
          {errors.mobile && <div className="invalid-feedback d-block">{errors.mobile}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.chef_type" />
          </Label>
          <select
            className="form-control"
            onChange={handleChange}
            name="chef_type"
            value={formdata.details && formdata.details.chef_type ? formdata.details.chef_type : ""}
            id="chef_type"
          >
            <option value="">Select Value</option>
            {chefTypes.map((chefType) => (
              <option key={chefType.id} value={chefType.name}>
                {chefType.name}
              </option>
            ))}
          </select>
          {errors.chef_type && <div className="invalid-feedback d-block">{errors.chef_type}</div>}
        </FormGroup>
        <Label className="mt-3">
          <IntlMessages id="forms.picture" />
        </Label>
        <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
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
