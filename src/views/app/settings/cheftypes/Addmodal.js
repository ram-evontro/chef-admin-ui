import React, { useState,useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import { simplelineicons } from 'data/icons';
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
  useEffect(()=>{
    setId(editformdata['id']);
    let temp ={...editformdata}
    delete temp['id'];
    setFormdata(temp);
  },[editformdata])
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
        await api.patch(axiosURLS.CHEF_TYPES+'/'+id, formdata);
        toast.success('Chef Type Edited successfully');
      } else {
        await api.post(axiosURLS.CHEF_TYPES, formdata);
        toast.success('Chef Type Added successfully');
      }    
     
      fetchData();
    } catch (err) {
      console.log(err);
      console.log(err.response);
      // toast.error(err.response.data.message);
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
          <IntlMessages id="forms.chef_type" />
        </Label>
        <Input
          type="text"
          name="name"
          value={formdata.name ? formdata.name : ''}
          onChange={handleChange}
        />
        <Label className="mt-4">
          <IntlMessages id="forms.icon" />
        </Label>
        <select
          name="icon"
          value={formdata.icon ? formdata.icon : ''}
          onChange={handleChange}
          id="icon"
          className="form-control"
        >
          {simplelineicons.map((data, index) => {
            return (
              <option value={data} key={`sli_${index}`}>
                {data.replace('simple-icon-', '').toUpperCase()}
              </option>
            );
          })}
        </select>
        <Label className="mt-4">
          <IntlMessages id="forms.price" />
        </Label>
        <Input
          type="number"
          name="price"
          value={formdata.price ? formdata.price : ''}
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
