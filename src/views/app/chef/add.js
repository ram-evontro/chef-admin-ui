import React, { useRef, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import api from 'helpers/api';
import * as axiosURLS from 'helpers/endpoints';
import fileapi from "helpers/fileupload";
import { connect } from 'react-redux';
const Add = ({ match, currentUser }) => {
  const ReactDOMServer = require('react-dom/server');
  const { upload } = fileapi();
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
  const [tagsLO, setTagsLO] = useState([]);
  const [formdata, setFormdata] = useState({});
  const [picture, setPicture] = useState(null);
  const setDob = (val) => {
    let tempdata = { ...formdata };
    tempdata['dob'] = val;
    setFormdata(tempdata);
  };
  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
  };
  const handleClick = async () => {
    let data;
    try {
      let fileurl = await upload(picture, {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + currentUser.tokens.access.token,
      });
      // await api.get(axiosURLS.FILEUPLOAD,{
      //   params:{name:picture.name,type:picture.type},
      //   ,
      // });
      formdata['picture'] = fileurl;
      data = await api.post(axiosURLS.USERS, formdata, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + currentUser.tokens.access.token,
        },
      });
      // if(data.code === 401)
      // {
      //   toast.error('Some error occured');
      // }
      // else
      // {
      console.log(data);
      toast.success('User Added successfully');
      // }
    } catch (err) {
      console.log(err);
      console.log(err.response);
      // toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.chefadd" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="Add" />
              </CardTitle>
              <Form>
                <Row>
                  <Colxx xxs="12" md="6">
                    <Label className="form-group has-float-label">
                      <Input
                        name="name"
                        onChange={handleChange}
                        value={formdata.name}
                      />
                      <span>
                        <IntlMessages id="forms.name" />
                      </span>
                    </Label>
                    <Label className="form-group has-float-label">
                      <Input
                        name="mobile"
                        onChange={handleChange}
                        value={formdata.mobile}
                      />
                      <span>
                        <IntlMessages id="forms.mobile" />
                      </span>
                    </Label>
                    <Label className="form-group has-float-label">
                      <DatePicker
                        onChange={handleChange}
                        selected={formdata.dob}
                        onChange={(val) => setDob(val)}
                        shouldCloseOnSelect
                      />
                      <span>
                        <IntlMessages id="forms.date-u" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="form-group has-float-label">
                      <DropzoneComponent
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig}
                      />
                      <span>
                        <IntlMessages id="forms.picture" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="form-group has-float-label">
                      <Input
                        name="email"
                        onChange={handleChange}
                        value={formdata.email}
                        type="email"
                      />
                      <span>
                        <IntlMessages id="forms.email" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="form-group has-float-label">
                      <Input
                        name="password"
                        onChange={handleChange}
                        value={formdata.password}
                        type="password"
                      />
                      <span>
                        <IntlMessages id="forms.password" />
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
                      <textarea
                        name="address"
                        onChange={handleChange}
                        value={formdata.address}
                        className="form-control"
                      />
                      <span>
                        <IntlMessages id="forms.address" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx xxs="12">
                    <Label className="form-group has-float-label">
                      <textarea
                        name="bankdetails"
                        onChange={handleChange}
                        value={formdata.bankdetails}
                        className="form-control"
                      />
                      <span>
                        <IntlMessages id="forms.bankdetails" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx xxs="12">
                    <Label className="form-group has-float-label">
                      <textarea
                        name="intro"
                        onChange={handleChange}
                        value={formdata.intro}
                        className="form-control"
                      />
                      <span>
                        <IntlMessages id="forms.intro" />
                      </span>
                    </Label>
                  </Colxx>
                </Row>
                <Button onClick={handleClick} color="primary" className="mt-4">
                  <IntlMessages id="forms.submit" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return { currentUser };
};

export default connect(mapStateToProps)(Add);
