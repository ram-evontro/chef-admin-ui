import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  CustomInput,
  Badge,
} from 'reactstrap';
import smsTemplateVariables from 'data/sms_template_variables';
import 'react-datepicker/dist/react-datepicker.css';
import IntlMessages from 'helpers/IntlMessages';
import api from 'helpers/api';
import * as axiosURLS from 'helpers/endpoints';
import toast from 'react-hot-toast';
const Addmodal = ({
  modalOpen,
  toggleModal,
  fetchData,
  editformdata,
  modalFor,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [badges, setBadges] = useState([]);
  const [formdata, setFormdata] = useState({});
  useEffect(() => {
    setId(editformdata['id']);
    let temp = { ...editformdata };
    delete temp['id'];
    setFormdata(temp);
  }, [editformdata]);
  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
  };
  const setSlug = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    tempdata['slug'] = val;
    setFormdata(tempdata);
    if(val!=''){
      setBadges([...smsTemplateVariables[val]]);
    } else {
      setBadges([]);
    }
  };
  const insertTag = (tag) => {
    let tempdata = { ...formdata };
    if (tempdata['message']) {
      tempdata['message'] = tempdata['message'] + tag;
    } else {
      tempdata['message'] = tag;
    }
    setFormdata(tempdata);
  };
  const handleClick = async () => {
    setIsLoading(true);
    let newformdata;
    try {
      if (modalFor === 'edit') {
        await api.patch(axiosURLS.SMS_TEMPLATES + '/' + id, formdata);
        toast.success('Sms Template Edited successfully');
      } else {
        await api.post(axiosURLS.SMS_TEMPLATES, formdata);
        toast.success('Sms Template Added successfully');
      }

      fetchData();
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
    setIsLoading(false);
    toggleModal();
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.add-new-modal-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="forms.name" />
        </Label>
        <Input
          type="text"
          name="name"
          value={formdata.name ? formdata.name : ''}
          onChange={handleChange}
        />
        <Label className="mt-4">
          <IntlMessages id="forms.url" />
        </Label>
        <Input
          type="textarea"
          name="url"
          value={formdata.url ? formdata.url : ''}
          onChange={handleChange}
          placeholder="Enter API URL from SMS provider. with [MOBILE NUMBER] and [MESSAGE] as dynamic fields"
        />
        <Label className="mt-4">
          <IntlMessages id="forms.message" />
        </Label>
        <Input
          type="textarea"
          name="message"
          value={formdata.message ? formdata.message : ''}
          onChange={handleChange}
        />
        <Label className="mt-4">
          <IntlMessages id="forms.type" />
        </Label>
        <select
          className="form-control"
          name="slug"
          value={formdata.slug ? formdata.slug : ''}
          onChange={setSlug}
          id="slug"
        >
          <option key={'slugs_select-1'} value="">
            Select Template
          </option>
          {Object.keys(smsTemplateVariables).map((data, index) => {
            return (
              <option key={data} value={data}>
                {(data.split('_').join(' ').toUpperCase())}
              </option>
            );
          })}
        </select>
        {badges.map((data, index) => (
          <Badge
            onClick={() => {
              insertTag(data.val);
            }}
            key={data.key}
            color="primary"
          >
            {data.title}
          </Badge>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button
          color="primary"
          className={`btn-shadow btn-multiple-state ${
            isLoading ? 'show-spinner' : ''
          }`}
          onClick={handleClick}
        >
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
