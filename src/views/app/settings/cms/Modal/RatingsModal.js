import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import "react-tagsinput/react-tagsinput.css";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const ratingsModal = ({ modalOpen, toggleModal, fetchData }) => {
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
    if (!formdata["title"] || formdata["title"] === "") {
      tempErrors.title = "Please enter title";
    }
    if (!formdata["rating"] || formdata["rating"] === "") {
      tempErrors.rating = "Please enter rating";
    }
    if (formdata["rating"] !== "" && (formdata["rating"] < 1 || formdata["rating"] > 5)) {
      tempErrors.rating = "Please enter valid ratings";
    }
    if (!formdata["description"] || formdata["description"] === "") {
      tempErrors.description = "Please enter description";
    }

    if (!formdata["reviewer"] || formdata["reviewer"] === "") {
      tempErrors.reviewer = "Please enter Reviewer details";
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
      fetchData(formdata);
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
        <IntlMessages id="bookExperience.reviews.ratingsModal" />
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>
            <IntlMessages id="bookExperience.reviews.ratingsModal.title" />
          </Label>
          <Input type="text" name="title" value={formdata.title ? formdata.title : ""} onChange={handleChange} />
          {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="bookExperience.reviews.ratingsModal.rating" />
          </Label>
          <Input type="number" name="rating" value={formdata.rating ? formdata.rating : ""} onChange={handleChange} />
          {errors.rating && <div className="invalid-feedback d-block">{errors.rating}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="bookExperience.reviews.ratingsModal.description" />
          </Label>
          <Input type="textarea" name="description" value={formdata.description ? formdata.description : ""} onChange={handleChange} />
          {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="bookExperience.reviews.ratingsModal.reviewer" />
          </Label>
          <Input type="text" name="reviewer" value={formdata.reviewer ? formdata.reviewer : ""} onChange={handleChange} />
          {errors.reviewer && <div className="invalid-feedback d-block">{errors.reviewer}</div>}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="bookExperience.reviews.ratingsModal.cancel" />
        </Button>
        <Button color="primary" className={`btn-shadow btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleClick}>
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">
            <IntlMessages id="bookExperience.reviews.ratingsModal.submit" />
          </span>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ratingsModal;
