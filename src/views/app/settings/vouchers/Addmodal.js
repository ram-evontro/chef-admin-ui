import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  CustomInput
} from 'reactstrap';
import DatePicker from 'react-datepicker';
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
  const [formdata, setFormdata] = useState({});
  useEffect(() => {
    setId(editformdata['id']);
    let temp = { ...editformdata };
    delete temp['id'];
    delete temp['status'];
    delete temp['times_used'];
    setFormdata(temp);
  }, [editformdata]);
  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
  };
  const handleClick = async () => {
    setIsLoading(true);
    let newformdata;
    try {
      if (modalFor === 'edit') {
        await api.patch(axiosURLS.VOUCHER + '/' + id, formdata);
        toast.success('Voucher Edited successfully');
      } else {
        await api.post(axiosURLS.VOUCHER, formdata);
        toast.success('Voucher Added successfully');
      }

      fetchData();
    } catch (err) {
      console.log(err);
      console.log(err.response);
      toast.error(err.response.data.message);
    }
    setIsLoading(false);
    toggleModal();
  };
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  const setExpiry = (val) => {
    let temp = { ...formdata };
    temp['expiry'] = val;
    setFormdata(temp);
  };
  const shuffleCode = () => {
    let temp = { ...formdata };
    temp['code'] = randomString(7, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    setFormdata(temp);
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
          <IntlMessages id="forms.code" />
          <a onClick={shuffleCode} href="javascript:;">
            <i className="glyph-icon simple-icon-shuffle"></i>
          </a>
        </Label>
        <Input
          type="text"
          name="code"
          value={formdata.code ? formdata.code : ''}
          onChange={handleChange}
        />
        <Label className="mt-4">
          <IntlMessages id="forms.expiry" />
        </Label>
        <DatePicker
         selected={Date.parse(formdata.expiry)}
          onChange={(val) => setExpiry(val)}
          shouldCloseOnSelect
        />
        <Label className="mt-4">
          <IntlMessages id="forms.type" />
        </Label>
        <CustomInput
          type="radio"
          id="exCustomRadio"
          name="type"
          label="PERCENTAGE"
          onChange={handleChange}
          value="Percentage"
          checked={formdata.type==="Percentage"?true:false}
        />
        <CustomInput
          type="radio"
          id="extype2"
          name="type"
          label="AMOUNT"
          onChange={handleChange}
          value="Amount"
          checked={formdata.type==="Amount"?true:false}
        />
        <Label className="mt-4">
          <IntlMessages id="forms.value" />
        </Label>
        <Input
          type="number"
          name="value"
          value={formdata.value ? formdata.value : ''}
          onChange={handleChange}
        />
        <Label className="mt-4">
          <IntlMessages id="forms.max_uses" />
        </Label>
        <Input
          type="number"
          name="max_uses"
          value={formdata.max_uses ? formdata.max_uses : ''}
          onChange={handleChange}
        />
        <Label className="mt-4">
          <IntlMessages id="forms.min_order_value" />
        </Label>
        <Input
          type="number"
          name="min_order_value"
          value={formdata.min_order_value ? formdata.min_order_value : ''}
          onChange={handleChange}
        />
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
