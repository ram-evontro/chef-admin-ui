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
  const [tagsLO, setTagsLO] = useState(['Vegan', 'Vegetartian', 'Indian']);
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
          <CardBody>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.title" />
            </p>
            <input
              type="text"
              className="form-control mb-2"
              value="Dish Name"
            />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.description" />
            </p>
            <textarea
              value="Some description about menu"
              className="form-control mb-2"
              name="desc"
              id="desc"
              cols="30"
              rows="4"
            ></textarea>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.menu_type" />
            </p>
            <select
              className="form-control mb-2"
              name="menu_type"
              id="menu_type"
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="non vegetarian">non vegetarian</option>
            </select>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.cuisine" />
            </p>
            <select className="form-control mb-2" name="cuisine" id="cuisine">
              <option value="thai">Thai</option>
              <option value="north indian">North Indian</option>
            </select>
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
          </CardBody>
        </Card>
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
      <Colxx xxs="12" lg="8" className="mb-4 col-right">
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.meals" />
            </CardTitle>
            <div className="border border-primary p-2 mb-4">
              <div className="position-relative text-right mt-n4 mr-n4">
                <Button color="primary" className="icon-button">
                  <i className="simple-icon-trash" />
                </Button>
              </div>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.meal_course" />
              </p>
              <select
                className="form-control mb-2"
                name="chef_type"
                id="chef_type"
              >
                <option value="beverages">Beverages</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
              </select>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.title" />
              </p>
              <input
                type="text"
                className="form-control mb-2"
                value="Course title"
              />
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.intro" />
              </p>
              <textarea
                value="Some details about this course"
                className="form-control mb-1"
                name="intro"
                id="intro"
                cols="30"
                rows="2"
              ></textarea>
            </div>
            <div className="border border-primary p-2 mb-4">
              <div className="position-relative text-right mt-n4 mr-n4">
                <Button color="primary" className="icon-button">
                  <i className="simple-icon-trash" />
                </Button>
              </div>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.meal_course" />
              </p>
              <select
                className="form-control mb-2"
                name="chef_type"
                id="chef_type"
              >
                <option value="beverages">Beverages</option>
                <option selected value="course1">
                  Course 1
                </option>
                <option value="course2">Course 2</option>
              </select>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.title" />
              </p>
              <input
                type="text"
                className="form-control mb-2"
                value="Course 1"
              />
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.intro" />
              </p>
              <textarea
                value="Starter cvourse"
                className="form-control mb-1"
                name="intro"
                id="intro"
                cols="30"
                rows="2"
              ></textarea>
            </div>
            <div className="border border-primary p-2 mb-4">
              <div className="position-relative text-right mt-n4 mr-n4">
                <Button color="primary" className="icon-button">
                  <i className="simple-icon-trash" />
                </Button>
              </div>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.meal_course" />
              </p>
              <select
                className="form-control mb-2"
                name="chef_type"
                id="chef_type"
              >
                <option value="beverages">Beverages</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
              </select>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.title" />
              </p>
              <input
                type="text"
                className="form-control mb-2"
                value="Course title"
              />
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.intro" />
              </p>
              <textarea
                value="Some details about this course"
                className="form-control mb-1"
                name="intro"
                id="intro"
                cols="30"
                rows="2"
              ></textarea>
            </div>
            <button className="btn btn-primary">
              <IntlMessages id="forms.update" />
            </button>
            <button className="btn btn-primary">
              <IntlMessages id="forms.add_more" />
            </button>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default Details;
