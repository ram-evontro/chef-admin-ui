import React, { useRef, useEffect, useState } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  CardText,
  Col,
  Form,
  Collapse,
} from "reactstrap";
import classnames from "classnames";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import fileapi from "helpers/fileupload";
import SingleLightbox from "components/pages/SingleLightbox";
import { NotificationManager } from "components/common/react-notifications";
import * as axiosURLS from "helpers/endpoints";
const OurChef = () => {
  const [header, setHeader] = useState({});
  const [newsletter, setNewsletter] = useState({});
  const [bookingCta, setBookingCta] = useState({});
  const [ourChefs, setOurChefs] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { upload } = fileapi();

  const handleHeader = (e, x = -1) => {
    let tempdata = { ...header };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setHeader(tempdata);
  };

  const handleNewsLetter = (e) => {
    let tempdata = { ...newsletter };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setNewsletter(tempdata);
  };

  const handleBookingCta = (e) => {
    let tempdata = { ...bookingCta };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setBookingCta(tempdata);
  };
  const changeImageHeader = async (e, imageSection, section, component) => {
    e.preventDefault();
    console.log("header change");
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.OUR_CHEFS, form);
      setHeader({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const handleClickForChef = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.OUR_CHEFS, newfomdata);
      NotificationManager.success("Saved successfully", "Saved", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setIsLoading(false);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Update Error", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };

  const openFileInput = (image) => {
    document.getElementById(image).click();
  };
  useEffect(async () => {
    setLoading(true);
    try {
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.OUR_CHEFS);
      setOurChefs(data.our_chefs);
      valueSetter(data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Fetch Error", 3000, null, null, "");
      }
    }
    setLoading(false);
  }, []);
  const valueSetter = (data) => {
    setHeader(data.our_chefs.header);
    setNewsletter(data.our_chefs.newsletter);
    setBookingCta(data.our_chefs.booking_cta);
  };

  return loading ? (
    <div className="loading" />
  ) : (
    <React.Fragment>
      <Row>
        <Col sm="12">
          <h4>Header</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("OurChefs header Image");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="OurChefs header Image"
                          rclassName="d-none"
                          onChange={(e) => changeImageHeader(e, "image", "header", header)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox large={header ? header.image : ""} thumb={header ? header.image : ""} className="card-img-top"></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>

                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.title" />
                    </Label>
                    <Input type="text" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[0].title : ""} onChange={(e) => handleHeader(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={header.content ? header.content[0].description : ""}
                      onChange={(e) => handleHeader(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[1].title : ""} onChange={(e) => handleHeader(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={header.content ? header.content[1].description : ""}
                      onChange={(e) => handleHeader(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.content[2].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[2].title : ""} onChange={(e) => handleHeader(e, 2)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.header.content[2].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={header.content ? header.content[2].description : ""}
                      onChange={(e) => handleHeader(e, 2)}
                    />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForChef(e, "header", header)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.ourChefs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Booking CTA</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.bookingCta.title" />
                    </Label>
                    <Input type="text" name="title" value={bookingCta ? bookingCta.title : ""} onChange={handleBookingCta} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.bookingCta.description" />
                    </Label>
                    <Input type="textarea" name="desc" value={bookingCta ? bookingCta.desc : ""} onChange={handleBookingCta} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForChef(e, "booking_cta", bookingCta)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.ourChefs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Newsletter</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.newsletter.title" />
                    </Label>
                    <Input type="text" name="title" value={newsletter ? newsletter.title : ""} onChange={handleNewsLetter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.ourChefs.newsletter.description" />
                    </Label>
                    <Input type="textarea" name="desc" value={newsletter ? newsletter.desc : ""} onChange={handleNewsLetter} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForChef(e, "newsletter", newsletter)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.ourChefs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default OurChef;
