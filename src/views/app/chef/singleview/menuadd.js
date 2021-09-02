import React, { useState } from "react";
import { Row, Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import DatePicker from "react-datepicker";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/common/CustomBootstrap";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import fileapi from "helpers/fileupload";
import { NotificationManager } from "components/common/react-notifications";
import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
const Menuadd = ({ modalOpen, toggleModal,chefTypes,id,fetchData }) => {
  const { upload } = fileapi();
  const ReactDOMServer = require("react-dom/server");
  const [formdata, setFormdata] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tagsLO, setTagsLO] = useState([]);
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

  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
  };
  const handleClick = async () => {
    let error = '';
    if(!formdata['title']||formdata['title']==='')
    {
      error = 'Title Required'
    }
    if(!formdata['desc']||formdata['desc']==='')
    {
      error = 'Description Required'
    }
    if(error!='')
    {
      NotificationManager.error(error, "Error", 3000, null, null, "");
      return false;
    }
    setIsLoading(true);
    
    let newformdata;
    try {
      if(picture)
      {
        let fileurl = await upload(picture);
        formdata["cover_picture"] = fileurl;
      }
      formdata['user'] =id;
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
        <Label>
          <IntlMessages id="forms.title" />
        </Label>
        <Input type="text" name="title" value={formdata.title ? formdata.title : ""} onChange={handleChange} />
        <Label className="mt-3">
          <IntlMessages id="forms.description" />
        </Label>
        <Input type="textarea" name="desc" value={formdata.desc ? formdata.desc : ""} onChange={handleChange} />
        <Label className="mt-3">
          <IntlMessages id="forms.menu_type" />
        </Label>
        <select
          className="form-control"
          onChange={handleChange}
          name="menu_type"
          value={formdata.menu_type ? formdata.menu_type : ""}
          id="menu_type"
        >
          <option value="">Select Value</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non Vegetarian">Non Vegetarian</option>
        </select>
        <Label className="mt-3">
          <IntlMessages id="forms.chef_type" />
        </Label>
        <select
          className="form-control"
          onChange={handleChange}
          name="chef_type"
          value={formdata && formdata.chef_type ? formdata.chef_type : ""}
          id="chef_type"
        >
          <option value="">Select Value</option>
          {chefTypes&&chefTypes.map((chefType) => (
            <option key={chefType.id} value={chefType.name}>
              {chefType.name}
            </option>
          ))}
        </select>

        <Label className="mt-3">
          <IntlMessages id="forms.cover_picture" />
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

export default Menuadd;
