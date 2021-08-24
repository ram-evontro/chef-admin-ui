import React, { useState } from 'react';
import { Row, Card, CardBody, Button, CardTitle } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import GalleryDetail from 'containers/pages/GalleryDetail';
import SingleLightbox from 'components/pages/SingleLightbox';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
const Details = () => {
  const ReactDOMServer = require('react-dom/server');
  const [tagsLO, setTagsLO] = useState([
    'Vegan',
    'Vegetartian',
    'Dessert specialist',
  ]);
  let componentConfig = { postUrl: 'no-url' };
  let eventHandlers = {
    addedfile: (file) => {
      console.log(file);
    },
  };
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
  return (
    <Row>
      <Colxx xxs="12" lg="4" className="mb-4 col-left">
        <Card className="mb-4">
          <div className="position-absolute card-top-buttons">
            <Button outline color="white" className="icon-button">
              <i className="simple-icon-pencil" />
            </Button>
          </div>
          <SingleLightbox
            thumb="/assets/img/profiles/1.jpg"
            large="/assets/img/profiles/1.jpg"
            className="card-img-top"
          />
          <CardBody>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.name" />
            </p>
            <input
              type="text"
              className="form-control mb-2"
              value="Chef Name"
            />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.email" />
            </p>
            <input
              type="text"
              className="form-control mb-2"
              value="email@example.com"
            />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.mobile" />
            </p>
            <input
              type="text"
              className="form-control mb-2"
              value="9829012345"
            />
            <button className="btn btn-primary">
              <IntlMessages id="forms.update" />
            </button>
          </CardBody>
        </Card>

        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.details" />
            </CardTitle>
            <div>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.chef_type" />
              </p>
              <select
                className="form-control mb-2"
                name="chef_type"
                id="chef_type"
              >
                <option value="home">Home</option>
                <option value="pro">Pro</option>
                <option value="master">Master</option>
              </select>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.intro" />
              </p>
              <textarea
                value="I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well."
                className="form-control mb-2"
                name="intro"
                id="intro"
                cols="30"
                rows="8"
              ></textarea>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.bankdetails" />
              </p>
              <textarea
                value="HDFC Bank \n  Account No 12323423232 \n IFSC: 1234 \n Bank address: Mumbai"
                className="form-control mb-2"
                name="bankdetails"
                id="bankdetails"
                cols="30"
                rows="8"
              ></textarea>

              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.tags" />
              </p>
              <div className="mb-2">
                <TagsInput
                  value={tagsLO}
                  onChange={(val) => setTagsLO(val)}
                  inputProps={{ placeholder: '' }}
                />
              </div>
              <button className="btn btn-primary">
                <IntlMessages id="forms.update" />
              </button>
            </div>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs="12" lg="8" className="mb-4 col-right">
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.gallery" />
            </CardTitle>
            <GalleryDetail />
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.add_picture" />
            </CardTitle>
            <DropzoneComponent
              config={componentConfig}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Details;
