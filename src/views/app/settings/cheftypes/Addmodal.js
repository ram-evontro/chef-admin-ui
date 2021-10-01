import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import { simplelineicons } from "data/icons";
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

    if (!formdata.name) {
      tempErrors.name = "Please enter chef type";
    }
    if (!formdata.icon) {
      tempErrors.icon = "Please select some icon";
    }
    if (!formdata.price) {
      tempErrors.price = "Please enter price";
    }
    if (!formdata.description) {
      tempErrors.description = "Please enter description";
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
      if (modalFor === "edit") {
        await api.patch(axiosURLS.CHEF_TYPES + "/" + id, formdata);
        NotificationManager.success("Chef Type Edited successfully", "Success", 3000, null, null, "");
      } else {
        await api.post(axiosURLS.CHEF_TYPES, formdata);
        NotificationManager.success("Chef Type Added successfully", "Success", 3000, null, null, "");
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
      <ModalBody >
        <FormGroup>
          <Label>
            <IntlMessages id="forms.chef_type" />
          </Label>
          <Input type="text" name="name" value={formdata.name ? formdata.name : ""} onChange={handleChange} />
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.icon" />
          </Label>
          <select name="icon" value={formdata.icon ? formdata.icon : ""} onChange={handleChange} id="icon" className="form-control">
            <option value="" key="blank">
              Select Icon
            </option>
            {simplelineicons.map((data, index) => {
              return (
                <option value={data} key={`sli_${index}`}>
                  {data.replace("simple-icon-", "").toUpperCase()}
                </option>
              );
            })}
          </select>
          {errors.icon && <div className="invalid-feedback d-block">{errors.icon}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.price" />
          </Label>
          <Input type="number" name="price" value={formdata.price ? formdata.price : ""} onChange={handleChange} />
          {errors.price && <div className="invalid-feedback d-block">{errors.price}</div>}
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>
            <IntlMessages id="forms.description" />
          </Label>
          <Input type="textarea" name="description" value={formdata.description ? formdata.description : ""} onChange={handleChange} />
          {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
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
