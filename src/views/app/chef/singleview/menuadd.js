import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import fileapi from "helpers/fileupload";
import { NotificationManager } from "components/common/react-notifications";
import DropzoneComponent from "react-dropzone-component";
import Select from "react-select";
import CustomSelectInput from "components/common/CustomSelectInput";
import "dropzone/dist/min/dropzone.min.css";
const Menuadd = ({ modalOpen, toggleModal, chefTypes, id, fetchData, chefs }) => {
  const { upload } = fileapi();
  const ReactDOMServer = require("react-dom/server");
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedChef, setSelectedChef] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mealTypes, setMealTypes] = useState([]);
  const [cuisines, setCuisines] = useState([]);
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
  useEffect(async () => {
    try {
      let response = await api.get(axiosURLS.MEAL_TYPES_ALL);
      setMealTypes(response.data);
      response = await api.get(axiosURLS.CUISINES_ALL);
      setCuisines(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error", 3000, null, null, "");
      }
    }
  }, []);
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
    setFormdata({ ...formdata, user: val.value });
    setSelectedChef(val);
    let tempErrors = { ...errors };
    delete tempErrors["user"];
    setErrors(tempErrors);
  };
  const validate = (e) => {
    let tempErrors = {};
    if (!id) {
      if (!formdata["user"] || formdata["user"] === "") {
        tempErrors.user = "Please select chef";
      }
    }
    if (!formdata["title"] || formdata["title"] === "") {
      tempErrors.title = "Please enter title";
    }
    if (!formdata["desc"] || formdata["desc"] === "") {
      tempErrors.desc = "Please enter some description";
    }
    if (!formdata.cuisine) {
      tempErrors.cuisine = "Please select cuisine";
    }
    if (!formdata.chef_type) {
      tempErrors.chef_type = "Please select menu type";
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
        formdata["cover_picture"] = fileurl;
      }
      if (id) {
        formdata["user"] = id;
      }

      await api.post(axiosURLS.MENU, formdata);
      NotificationManager.success("Menu Added successfully", "Added", 3000, null, null, "");

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
            {errors.user && <div className="invalid-feedback d-block">{errors.user}</div>}
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
            <IntlMessages id="forms.meal_type" />
          </Label>
          <select className="form-control" onChange={handleChange} name="meal_type" value={formdata.meal_type ? formdata.meal_type : ""} id="menu_type">
            <option value="">Select Value</option>
            {mealTypes &&
              mealTypes.map((mealType) => (
                <option key={mealType.id} value={mealType.name}>
                  {mealType.name}
                </option>
              ))}
          </select>
          {errors.meal_type && <div className="invalid-feedback d-block">{errors.meal_type}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.cuisine" />
          </Label>
          <select className="form-control" onChange={handleChange} name="cuisine" value={formdata.cuisine ? formdata.cuisine : ""} id="menu_type">
            <option value="">Select Value</option>
            {cuisines &&
              cuisines.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.name}>
                  {cuisine.name}
                </option>
              ))}
          </select>
          {errors.cuisine && <div className="invalid-feedback d-block">{errors.cuisine}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.chef_type" />
          </Label>
          <select
            className="form-control"
            onChange={handleChange}
            name="chef_type"
            value={formdata && formdata.chef_type ? formdata.chef_type.id : ""}
            id="chef_type"
          >
            <option value="">Select Value</option>

            {chefTypes &&
              chefTypes.map((chefType) => (
                <option key={chefType.id} value={chefType.id}>
                  {chefType.name}
                </option>
              ))}
          </select>
          {errors.chef_type && <div className="invalid-feedback d-block">{errors.chef_type}</div>}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label>
            <IntlMessages id="forms.cover_picture" />
          </Label>
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

export default Menuadd;
