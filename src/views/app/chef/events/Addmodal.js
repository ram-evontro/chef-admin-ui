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
const Addmodal = ({ modalOpen, toggleModal, chefTypes, id, fetchData, chefs }) => {
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
    if (!id) {
      if (!formdata["chef"] || formdata["chef"] === "") {
        tempErrors.chef = "Please select chef";
      }
    }
    if (!formdata["title"] || formdata["title"] === "") {
      tempErrors.title = "Please enter title";
    }
    if (!formdata["desc"] || formdata["desc"] === "") {
      tempErrors.desc = "Please enter some description";
    }
    if (!formdata["venue"] || formdata["venue"] === "") {
      tempErrors.venue = "Please enter venue";
    }
    if (!formdata["seats"] || formdata["seats"] === "") {
      tempErrors.seats = "Please enter seats";
    }
    if (!formdata["price"] || formdata["price"] === "") {
      tempErrors.price = "Please enter an amount";
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
        formdata["chef"] = id;
      }

      await api.post(axiosURLS.EVENT, formdata);
      NotificationManager.success("Event Added successfully", "Added", 3000, null, null, "");

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
        {!id ? (
          <FormGroup>
            <Label>
              <IntlMessages id="forms.chef" />
            </Label>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              options={chefs.map((chef, i) => {
                return { label: chef.name, value: chef.id, key: chef.id };
              })}
              value={selectedChef}
              onChange={handleChefSelect}
            />
            {errors.chef && <div className="invalid-feedback d-block">{errors.chef}</div>}
          </FormGroup>
        ) : (
          ""
        )}
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
          <Input type="textarea" name="desc" value={formdata.desc ? formdata.desc : ""} onChange={handleChange} />
          {errors.desc && <div className="invalid-feedback d-block">{errors.desc}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.venue" />
          </Label>
          <Input type="textarea" name="venue" value={formdata.venue ? formdata.venue : ""} onChange={handleChange} />
          {errors.venue && <div className="invalid-feedback d-block">{errors.venue}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.seats" />
          </Label>
          <Input type="number" name="seats" value={formdata.seats ? formdata.seats : ""} onChange={handleChange} />
          {errors.seats && <div className="invalid-feedback d-block">{errors.seats}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.price" />
          </Label>
          <Input type="number" name="price" value={formdata.price ? formdata.price : ""} onChange={handleChange} />
          {errors.price && <div className="invalid-feedback d-block">{errors.price}</div>}
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
