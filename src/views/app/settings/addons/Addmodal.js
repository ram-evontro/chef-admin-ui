import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import DropzoneComponent from "react-dropzone-component";
const ReactDOMServer = require("react-dom/server");
import "dropzone/dist/min/dropzone.min.css";
import fileapi from "helpers/fileupload";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const Addmodal = ({ modalOpen, toggleModal, fetchData, editformdata, modalFor }) => {
  const { upload } = fileapi();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  const [picture, setPicture] = useState(null);
  let componentConfig = { postUrl: "no-url" };
  let eventHandlers = { addedfile: (file) => setPicture(file) };
  const djsConfig = {
    thumbnailHeight: 160,
    maxFilesize: 2,
    maxFiles: 1,
    autoProcessQueue: false,
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
    if (!formdata.price) {
      tempErrors.price = "Please enter price";
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
    if (picture) {
      let fileurl = await upload(picture);
      formdata["image"] = fileurl;
    }
    try {
      if (modalFor === "edit") {
        await api.patch(axiosURLS.ADDONS_CATEGORIES + "/" + id, formdata);
        NotificationManager.success("AddOns  Edited successfully", "Success", 3000, null, null, "");
      } else {
        await api.post(axiosURLS.ADDONS_CATEGORIES, formdata);
        NotificationManager.success("AddOns Added successfully", "Success", 3000, null, null, "");
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
            <IntlMessages id="forms.addons" />
          </Label>
          <Input type="text" name="name" value={formdata.name ? formdata.name : ""} onChange={handleChange} />
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.price" />
          </Label>
          <Input type="text" name="price" value={formdata.price ? formdata.price : ""} onChange={handleChange} />
          {errors.price && <div className="invalid-feedback d-block">{errors.price}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.image" />
          </Label>
          {modalFor === "edit"?<img src={formdata.image} />:''}
          <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
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
