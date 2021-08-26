import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
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
    if(editformdata){
    setId(editformdata['id']);
    let temp = { ...editformdata };
    delete temp['id'];
    setFormdata(temp);
    }
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
        await api.patch(axiosURLS.MEAL_COURSES + '/' + id, formdata);
        toast.success('Course Edited successfully');
      } else {
        await api.post(axiosURLS.MEAL_COURSES, formdata);
        toast.success('Course Added successfully');
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
          <IntlMessages id="forms.meal_course" />
        </Label>
        <Input
          type="text"
          name="name"
          value={formdata.name ? formdata.name : ''}
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
