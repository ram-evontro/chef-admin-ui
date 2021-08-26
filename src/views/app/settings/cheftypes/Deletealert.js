import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';

const Deletealert = ({ modalOpen, toggleModal, setSureDelete }) => {
  const handleClick = (resp) => {
    toggleModal();
    setSureDelete(resp);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.are_you_sure" />
      </ModalHeader>
      <ModalFooter>
        <Button
          color="secondary"
          outline
          onClick={() => {
            handleClick(false);
          }}
        >
          <IntlMessages id="pages.no" />
        </Button>
        <Button
          color="primary"
          onClick={() => {
            handleClick(true);
          }}
        >
          <IntlMessages id="pages.yes" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Deletealert;
