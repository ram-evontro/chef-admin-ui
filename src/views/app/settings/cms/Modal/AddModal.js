import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import "react-tagsinput/react-tagsinput.css";
import DropzoneComponent from "react-dropzone-component";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const addModal = ({
  modalOpen,
  toggleModal,
  fetchData,
  isImage = false,
  isDescription = true,
  isButton = false,
  index = 0,
  title = "",
  isBehindScene = false,
  isName = false,
  isLocation= false,
}) => {
  const ReactDOMServer = require("react-dom/server");
  let componentConfig = { postUrl: "no-url", multiple: false };
  let eventHandlers = { addedfile: (file) => setImage(file) };
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
  const [image, setImage] = useState(null);
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
    if ((!formdata["title"] || formdata["title"] === "") && !isBehindScene) {
      tempErrors.title = "Please enter title";
    }
    if (isDescription) {
      if (!formdata["description"] || formdata["description"] === "") {
        tempErrors.description = "Please enter description";
      }
    }
    if (isButton) {
      if (!formdata["button"] || formdata["button"] === "") {
        tempErrors.button = "Please Enter Button Text";
      }
    }
    if (isBehindScene) {
      if (!formdata["name"] || formdata["name"] === "") {
        tempErrors.name = "Please enter name";
      }
      if (!formdata["location"] || formdata["location"] === "") {
        tempErrors.location = "Please enter location";
      }
    }
    if ((!formdata["location"] || formdata["location"] === "") && isLocation) {
      tempErrors.location = "Please enter location";
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
    try {
      NotificationManager.success("Added successfully", "Added", 3000, null, null, "");
      let data = formdata;
      if (isImage) {
        data = { ...formdata, image };
      }
      fetchData(data, index);
      setImage(null);
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
        {/* <IntlMessages id="bookExperience.addModal" /> */}
        Add New {title}
      </ModalHeader>
      <ModalBody>
        {!isBehindScene ? (
          <FormGroup>
            <Label>
              <IntlMessages id="bookExperience.addModal.title" />
            </Label>
            <Input type="text" name="title" value={formdata.title ? formdata.title : ""} onChange={handleChange} />
            {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
          </FormGroup>
        ) : (
          <div>
            <FormGroup>
              <Label>
                <IntlMessages id="bookExperience.addModal.name" />
              </Label>
              <Input type="text" name="name" value={formdata.name ? formdata.name : ""} onChange={handleChange} />
              {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
            </FormGroup>
            <FormGroup>
              <Label>
                <IntlMessages id="bookExperience.addModal.location" />
              </Label>
              <Input type="text" name="location" value={formdata.location ? formdata.location : ""} onChange={handleChange} />
              {errors.location && <div className="invalid-feedback d-block">{errors.location}</div>}
            </FormGroup>
          </div>
        )}
        {isName ? (
          <FormGroup>
            <Label>
              <IntlMessages id="bookExperience.addModal.name" />
            </Label>
            <Input type="text" name="name" value={formdata.name ? formdata.name : ""} onChange={handleChange} />
            {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
          </FormGroup>
        ) : (
          <div></div>
        )}
        {isDescription ? (
          <FormGroup className="mt-3">
            <Label>
              <IntlMessages id="bookExperience.addModal.description" />
            </Label>
            <Input type="textarea" name="description" value={formdata.description ? formdata.description : ""} onChange={handleChange} />
            {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
          </FormGroup>
        ) : (
          <div></div>
        )}
        {isImage ? (
          <FormGroup className="mt-3">
            <Label className="mt-3">
              <IntlMessages id="bookExperience.addModal.image" />
            </Label>
            <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
          </FormGroup>
        ) : (
          <div></div>
        )}
        {isButton ? (
          <FormGroup className="mt-3">
            <Label className="mt-3">
              <IntlMessages id="bookExperience.addModal.button" />
            </Label>
            <Input type="text" name="button" value={formdata.button ? formdata.button : ""} onChange={handleChange} />
            {errors.button && <div className="invalid-feedback d-block">{errors.button}</div>}
          </FormGroup>
        ) : (
          <div></div>
        )}
        {isLocation ? (
          <FormGroup>
            <Label>
              <IntlMessages id="bookExperience.addModal.location" />
            </Label>
            <Input type="text" name="location" value={formdata.location ? formdata.location : ""} onChange={handleChange} />
            {errors.location && <div className="invalid-feedback d-block">{errors.location}</div>}
          </FormGroup>
        ) : (
          <div></div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="bookExperience.addModal.cancel" />
        </Button>
        <Button color="primary" className={`btn-shadow btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleClick}>
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">
            <IntlMessages id="bookExperience.addModal.submit" />
          </span>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default addModal;
