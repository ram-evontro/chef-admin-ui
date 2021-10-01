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

const ForChef = () => {
  const [header, setHeader] = useState({});
  const [ourChefs, setOurChefs] = useState({});
  const [offerings, setOfferings] = useState({});
  const [newsletter, setNewsletter] = useState({});
  const [quote, setQuote] = useState({});
  const [bookingCta, setBookingCta] = useState({});
  const [forChefs, setForChefs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currPicture, setCurrPicture] = useState();
  const { upload } = fileapi();

  // const toggle = () => setIsOpen(!isOpen);

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

  const handleChef = (e, x = -1) => {
    let tempdata = { ...ourChefs };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setOurChefs(tempdata);
  };
  const handleOfferings = (e, x = -1) => {
    let tempdata = { ...offerings };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setOfferings(tempdata);
  };
  const handleNewsLetter = (e) => {
    let tempdata = { ...newsletter };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setNewsletter(tempdata);
  };

  const handleQuote = (e) => {
    let tempdata = { ...quote };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setQuote(tempdata);
  };
  const handleBookingCta = (e) => {
    let tempdata = { ...bookingCta };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setBookingCta(tempdata);
  };
  const changeImageQuote = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };

      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.FOR_CHEFS, form);

      setQuote({ ...formdata });

      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageHeader = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.FOR_CHEFS, form);
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
  const changeImageOurChef = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };

      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.FOR_CHEFS, form);

      setOurChefs({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };

  const changeImageOfferings = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };

      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.FOR_CHEFS, form);

      setOfferings({ ...formdata });
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
      await api.patch(axiosURLS.BASE_URL + axiosURLS.FOR_CHEFS, newfomdata);
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
    try {
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.FOR_CHEFS);
      setForChefs(data.for_chef);
      valueSetter(data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Fetch Error", 3000, null, null, "");
      }
    }
  }, []);
  const valueSetter = (data) => {
    setHeader(data.for_chef.header);
    setOurChefs(data.for_chef.our_chefs);
    setOfferings(data.for_chef.offerings);
    setNewsletter(data.for_chef.newsletter);
    setQuote(data.for_chef.quote);
    setBookingCta(data.for_chef.booking_cta);
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm="12">
          <h4>Quote</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.quote.title" />
                    </Label>
                    <Input type="text" name="title" value={quote ? quote.title : ""} onChange={handleQuote} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.quote.by" />
                    </Label>
                    <Input type="text" name="by" value={quote ? quote.by : ""} onChange={handleQuote} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.quote.byImage" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ForChef Quote Image");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ForChef Quote Image"
                          rclassName="d-none"
                          onChange={(e) => changeImageQuote(e, "by_image", "quote", quote)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox large={quote ? quote.by_image : ""} thumb={quote ? quote.by_image : ""} className="card-img-top"></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForChef(e, "quote", quote)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.forChef.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
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
                      <IntlMessages id="bookExperience.forChef.header.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ForChef headerImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          // ref={inputFile}
                          id="ForChef headerImage"
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
                      <IntlMessages id="bookExperience.forChef.header.title" />
                    </Label>
                    <Input type="text" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.header.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.header.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[0].title : ""} onChange={(e) => handleHeader(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.header.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={header.content ? header.content[0].description : ""}
                      onChange={(e) => handleHeader(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.header.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[1].title : ""} onChange={(e) => handleHeader(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.header.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={header.content ? header.content[1].description : ""}
                      onChange={(e) => handleHeader(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.header.content[2].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[2].title : ""} onChange={(e) => handleHeader(e, 2)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.header.content[2].description" />
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
                <IntlMessages id="bookExperience.forChef.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Our Chefs</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.title" />
                    </Label>
                    <Input type="text" name="title" value={ourChefs ? ourChefs.title : ""} onChange={handleChef} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.description" />
                    </Label>
                    <Input type="textarea" name="description" value={ourChefs ? ourChefs.description : ""} onChange={handleChef} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.content[0].name" />
                    </Label>
                    <Input type="text" name="name" value={ourChefs.content ? ourChefs.content[0].name : ""} onChange={(e) => handleChef(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={ourChefs.content ? ourChefs.content[0].description : ""}
                      onChange={(e) => handleChef(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.content[0].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ForChef OurChef Image[0]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ForChef OurChef Image[0]"
                          rclassName="d-none"
                          onChange={(e) => changeImageOurChef(e, "image", "our_chefs", ourChefs, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={ourChefs.content ? ourChefs.content[0].image : ""}
                          thumb={ourChefs.content ? ourChefs.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    {/* <Input type="text" name="image" value={ourChefs.content ? ourChefs.content[0].image : ""} onChange={(e) => handleChef(e, 0)} /> */}
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.content[1].name" />
                    </Label>
                    <Input type="text" name="name" value={ourChefs.content ? ourChefs.content[1].name : ""} onChange={(e) => handleChef(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={ourChefs.content ? ourChefs.content[1].description : ""}
                      onChange={(e) => handleChef(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.ourChefs.content[1].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ForChef OurChef Image[1]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ForChef OurChef Image[1]"
                          rclassName="d-none"
                          onChange={(e) => changeImageOurChef(e, "image", "our_chefs", ourChefs, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={ourChefs.content ? ourChefs.content[1].image : ""}
                          thumb={ourChefs.content ? ourChefs.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                      {/* <img src={quote ? quote.by_image : ""} /> */}
                    </div>
                    <br></br>
                    {/* <Input type="text" name="image" value={ourChefs.content ? ourChefs.content[1].image : ""} onChange={(e) => handleChef(e, 1)} /> */}
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForChef(e, "our_chefs", ourChefs)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.forChef.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Offerings</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.title" />
                    </Label>
                    <Input type="text" name="title" value={offerings ? offerings.title : ""} onChange={handleOfferings} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.description" />
                    </Label>
                    <Input type="textarea" name="description" value={offerings ? offerings.description : ""} onChange={handleOfferings} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={offerings.content ? offerings.content[0].title : ""} onChange={(e) => handleOfferings(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={offerings.content ? offerings.content[0].description : ""}
                      onChange={(e) => handleOfferings(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.content[0].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ForChef Offerings Image[0]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ForChef Offerings Image[0]"
                          rclassName="d-none"
                          onChange={(e) => changeImageOfferings(e, "image", "offerings", offerings, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={offerings.content ? offerings.content[0].image : ""}
                          thumb={offerings.content ? offerings.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                      {/* <img src={quote ? quote.by_image : ""} /> */}
                    </div>
                    <br></br>
                    {/* <Input type="text" name="image" value={offerings.content ? offerings.content[0].image : ""} onChange={(e) => handleOfferings(e, 0)} /> */}
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={offerings.content ? offerings.content[1].title : ""} onChange={(e) => handleOfferings(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={offerings.content ? offerings.content[1].description : ""}
                      onChange={(e) => handleOfferings(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.offerings.content[1].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ForChef Offerings Image[1]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ForChef Offerings Image[1]"
                          rclassName="d-none"
                          onChange={(e) => changeImageOfferings(e, "image", "offerings", offerings, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={offerings.content ? offerings.content[1].image : ""}
                          thumb={offerings.content ? offerings.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>

                      {/* <img src={quote ? quote.by_image : ""} /> */}
                    </div>
                    <br></br>
                    {/* <Input type="text" name="image" value={offerings.content ? offerings.content[1].image : ""} onChange={(e) => handleOfferings(e, 1)} /> */}
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForChef(e, "offerings", offerings)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.forChef.update" />
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
                      <IntlMessages id="bookExperience.forChef.newsletter.title" />
                    </Label>
                    <Input type="text" name="title" value={newsletter ? newsletter.title : ""} onChange={handleNewsLetter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.newsletter.description" />
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
                <IntlMessages id="bookExperience.forChef.update" />
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
                      <IntlMessages id="bookExperience.forChef.bookingCta.title" />
                    </Label>
                    <Input type="text" name="title" value={bookingCta ? bookingCta.title : ""} onChange={handleBookingCta} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.forChef.bookingCta.description" />
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
                <IntlMessages id="bookExperience.forChef.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default ForChef;
