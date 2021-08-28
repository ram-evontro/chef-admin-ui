import React, { useState } from 'react';
import { Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import parse from 'html-react-parser';
const Previewmodal = (props) => {
  return (
    <Modal isOpen={props.modalOpen} size="lg" toggle={props.toggleModal}>
      <ModalHeader>
        <IntlMessages id="pages.preview" />
      </ModalHeader>
      <ModalBody>
        <Row>
          <Colxx xxs="12">
            {props.bodyHtml?parse(props.bodyHtml.replaceAll('&lt;','<')):''}
          </Colxx>
        </Row>
      </ModalBody>
    </Modal>
  );
};
export default Previewmodal;
