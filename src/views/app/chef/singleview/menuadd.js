import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
const Menuadd = (props) => {
  const ReactDOMServer = require('react-dom/server');
  const [formdata, setFormdata] = useState({});
  const [tagsLO, setTagsLO] = useState([]);
  let componentConfig = { postUrl: 'no-url' };
  let eventHandlers = { addedfile: (file) => setPicture(file) };
  const djsConfig = {
    thumbnailHeight: 160,
    maxFilesize: 2,
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
    headers: { 'My-Awesome-Header': 'header value' },
  };

  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
  };
  const setStart = (val) => {};
  const setEnd = (val) => {};
  const handleClick = async () => {};
  return (
    <Modal isOpen={props.modalOpen} size="lg" toggle={props.toggleModal}>
      <ModalHeader>
        <IntlMessages id="pages.add_menu" />
      </ModalHeader>
      <ModalBody>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card className="mb-4">
              <CardBody>
                <Form>
                  <Row>
                    <Colxx xxs="12" md="12">
                      <Label className="form-group has-float-label">
                        <Input
                          name="title"
                          onChange={handleChange}
                          value={formdata.title}
                        />
                        <span>
                          <IntlMessages id="forms.title" />
                        </span>
                      </Label>
                      <Label className="form-group has-float-label">
                        <textarea
                          name="desc"
                          onChange={handleChange}
                          value={formdata.desc}
                          className="form-control"
                        />
                        <span>
                          <IntlMessages id="forms.description" />
                        </span>
                      </Label>
                    </Colxx>
                    <Colxx xxs="12" md="12">
                      <h3>
                        <IntlMessages id="forms.meals" />
                      </h3>
                      <Row>
                        <Colxx xxs="12" md="3">
                          <Label className="form-group has-float-label">
                            <select
                              name="course"
                              onChange={handleChange}
                              value={formdata.course}
                              className="form-control"
                            >
                              <option value="Beverages">Beverages</option>
                              <option value="Course1">Course1</option>
                              <option value="Course2">Course2</option>
                              <option value="Course3">Course3</option>
                            </select>
                            <span>
                              <IntlMessages id="forms.menu_type" />
                            </span>
                          </Label>
                        </Colxx>
                        <Colxx xxs="12" md="3">
                          <Label className="form-group has-float-label">
                            <Input
                              name="heading"
                              onChange={handleChange}
                              value={formdata.heading}
                            />
                            <span>
                              <IntlMessages id="forms.title" />
                            </span>
                          </Label>
                        </Colxx>
                        <Colxx xxs="12" md="5">
                          <Label className="form-group has-float-label">
                            <textarea
                              name="info"
                              onChange={handleChange}
                              value={formdata.info}
                              className="form-control"
                              rows="1"
                            />
                            <span>
                              <IntlMessages id="forms.info" />
                            </span>
                          </Label>
                        </Colxx>
                        <Colxx xxs="12" md="1">
                          <div className={`glyph-icon simple-icon-trash`} />
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12">
                          <Button color="primary" className="mb-3">
                            <IntlMessages id="forms.add_more" />
                          </Button>
                        </Colxx>
                      </Row>
                    </Colxx>
                    <Colxx xxs="12" md="6">
                      <Label className="form-group has-float-label">
                        <select
                          name="menu_type"
                          onChange={handleChange}
                          value={formdata.menu_type}
                          className="form-control"
                        >
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non vegetarian">Non vegetarian</option>
                        </select>
                        <span>
                          <IntlMessages id="forms.menu_type" />
                        </span>
                      </Label>
                    </Colxx>
                    <Colxx xxs="12" md="6">
                      <Label className="form-group has-float-label">
                        <select
                          name="cuisine"
                          onChange={handleChange}
                          value={formdata.cuisine}
                          className="form-control"
                        >
                          <option value="Thai">Thai</option>
                          <option value="North Indian">North Indian</option>
                          <option value="Italian">Italian</option>
                        </select>
                        <span>
                          <IntlMessages id="forms.cuisine" />
                        </span>
                      </Label>
                    </Colxx>
                    <Colxx xxs="12" md="6">
                      <Label className="form-group has-float-label">
                        <DatePicker
                          selected={formdata.activefrom}
                          onChange={(val) => setStart(val)}
                          shouldCloseOnSelect
                        />
                        <span>
                          <IntlMessages id="forms.activefrom" />
                        </span>
                      </Label>
                    </Colxx>
                    <Colxx xxs="12" md="6">
                      <Label className="form-group has-float-label">
                        <DatePicker
                          selected={formdata.activetill}
                          onChange={(val) => setStart(val)}
                          shouldCloseOnSelect
                        />
                        <span>
                          <IntlMessages id="forms.activetill" />
                        </span>
                      </Label>
                    </Colxx>
                    <Colxx xxs="12">
                      <Label className="form-group has-float-label">
                        <TagsInput
                          value={tagsLO}
                          onChange={(val) => setTagsLO(val)}
                          inputProps={{ placeholder: '' }}
                        />
                        <span>
                          <IntlMessages id="forms.tags" />
                        </span>
                      </Label>
                    </Colxx>
                    <Colxx xxs="12">
                      <Label className="form-group has-float-label">
                        <DropzoneComponent
                          config={componentConfig}
                          eventHandlers={eventHandlers}
                          djsConfig={djsConfig}
                        />
                        <span>
                          <IntlMessages id="forms.menu_picture" />
                        </span>
                      </Label>
                    </Colxx>
                  </Row>                 
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <ModalFooter>
        <Button color="secondary" outline onClick={props.toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button color="primary" onClick={props.toggleModal}>
          <IntlMessages id="pages.submit" />
        </Button>{' '}
      </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default Menuadd;
