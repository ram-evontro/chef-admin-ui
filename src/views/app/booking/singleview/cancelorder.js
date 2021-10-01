import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, CustomInput, FormGroup } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
const Cancelorder = ({ modalOpen, toggleModal,requestCancel }) => {
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

    if (!formdata.amount) {
      tempErrors.amount = "Please enter refund amount";
    }
    if (!formdata.desc) {
      tempErrors.desc = "Please enter description";
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
    await requestCancel(formdata);
    setIsLoading(false);
}
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.cancel_order" />
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.refund_amount" />
          </Label>
          <Input type="number" name="amount" value={formdata.amount ? formdata.amount : ""} onChange={handleChange} />
          {errors.amount && <div className="invalid-feedback d-block">{errors.amount}</div>}
        </FormGroup>
        <FormGroup>
          <Label>
            <IntlMessages id="forms.desc" />
          </Label>
          <Input type="textarea" rows="6" name="desc" value={formdata.desc ? formdata.desc : ""} onChange={handleChange} />
          {errors.desc && <div className="invalid-feedback d-block">{errors.desc}</div>}
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

export default Cancelorder;
