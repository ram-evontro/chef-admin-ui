import React, { useEffect, useState } from "react";
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

const BookExp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [header, setHeader] = useState({});
  const [virtualDining, setVirtualDining] = useState({});
  const [chefsTable, setChefsTable] = useState({});
  const [chefsEvent, setChefsEvent] = useState({});
  const [ourfeaturedChefs, setOurfeaturedChefs] = useState({});
  const [offerings, setOfferings] = useState({});
  const [newsletter, setNewsletter] = useState({});
  const [fineDining, setFineDining] = useState({});
  const [quote, setQuote] = useState({});
  const [bookingCta, setBookingCta] = useState({});
  const [bookExperience, setBookExperience] = useState({});
  const { upload } = fileapi();

  const handleHeader = (e, x = -1, forbutton = false) => {
    let tempdata = { ...header };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      if (!forbutton) {
        tempdata.content[x][name] = val;
      } else {
        tempdata.buttons[x] = val;
      }
    } else {
      tempdata[name] = val;
    }
    setHeader(tempdata);
  };
  const handleChefEvent = (e, x = -1) => {
    let tempdata = { ...chefsEvent };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setChefsEvent(tempdata);
  };
  const handleVirtDine = (e, x = -1) => {
    let tempdata = { ...virtualDining };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setVirtualDining(tempdata);
  };
  const handleChefTable = (e, x = -1) => {
    let tempdata = { ...chefsTable };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setChefsTable(tempdata);
  };
  const handleFeatChef = (e) => {
    let tempdata = { ...ourfeaturedChefs };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setOurfeaturedChefs(tempdata);
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
  const handleFineDine = (e, x = -1) => {
    let tempdata = { ...fineDining };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setFineDining(tempdata);
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

  const handleClickBookExp = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, newfomdata);
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

  const changeImageHeader = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["images"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
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
  const changeImageFineDinning = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };

      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);

      setFineDining({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageChefsEvent = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };

      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);

      setChefsEvent({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageVirtualDinning = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };

      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);

      setVirtualDining({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageChefsTable = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };

      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);

      setChefsTable({ ...formdata });
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

      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);

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

  const openFileInput = (image) => {
    document.getElementById(image).click();
  };

  useEffect(async () => {
    setLoading(true);
    try {
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE);
      setBookExperience(data.book_experience);
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
    setVirtualDining(data.book_experience.virtual_dining);
    setChefsEvent(data.book_experience.chefs_event);
    setHeader(data.book_experience.header);
    setChefsTable(data.book_experience.chefs_table);
    setOurfeaturedChefs(data.book_experience.our_featured_chefs);
    setOfferings(data.book_experience.offerings);
    setNewsletter(data.book_experience.newsletter);
    setFineDining(data.book_experience.fine_dining);
    setQuote(data.book_experience.quote);
    setBookingCta(data.book_experience.booking_cta);
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
                      <IntlMessages id="bookExperience.header.image" />
                    </Label>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("headerImage0");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="headerImage0"
                              rclassName="d-none"
                              onChange={(e) => changeImageHeader(e, 0, "header", header)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={header && header.images ? header.images[0] : ""}
                              thumb={header && header.images ? header.images[0] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("headerImage1");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="headerImage1"
                              rclassName="d-none"
                              onChange={(e) => changeImageHeader(e, 1, "header", header)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={header && header.images ? header.images[1] : ""}
                              thumb={header && header.images ? header.images[1] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("headerImage2");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="headerImage2"
                              rclassName="d-none"
                              onChange={(e) => changeImageHeader(e, 2, "header", header)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={header && header.images ? header.images[2] : ""}
                              thumb={header && header.images ? header.images[2] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                    </Row>
                    <br></br>
                    {/* <Input type="text" name="image" value={header.image ? header.image : ""} onChange={handleHeader} /> */}
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.title" />
                    </Label>

                    <Input type="text" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.header.content[0].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[0].title : ""} onChange={(e) => handleHeader(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.header.content[1].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[1].title : ""} onChange={(e) => handleHeader(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.header.content[2].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[2].title : ""} onChange={(e) => handleHeader(e, 2)} />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">Button 1 Text</Label>
                        <Input type="text" name="title" value={header.buttons ? header.buttons[0] : ""} onChange={(e) => handleHeader(e, 0, true)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">Button 2 Text</Label>
                        <Input type="text" name="title" value={header.buttons ? header.buttons[1] : ""} onChange={(e) => handleHeader(e, 1, true)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">Button 3 Text</Label>
                        <Input type="text" name="title" value={header.buttons ? header.buttons[2] : ""} onChange={(e) => handleHeader(e, 2, true)} />
                      </Colxx>
                    </Row>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "header", header)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Chefs Event</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.title" />
                    </Label>
                    <Input type="text" name="title" value={chefsEvent ? chefsEvent.title : ""} onChange={handleChefEvent} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsEvent.description" />
                    </Label>
                    <Input type="textarea" name="description" value={chefsEvent ? chefsEvent.description : ""} onChange={handleChefEvent} />
                    <Row>
                      {chefsEvent.content
                        ? chefsEvent.content.map((content, index) => (
                            <Colxx xxs="12" md="3">
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.chefsEvent.content[" + index + "].title"} />
                              </Label>
                              <Input
                                type="text"
                                name="title"
                                value={chefsEvent.content ? chefsEvent.content[index].title : ""}
                                onChange={(e) => handleChefEvent(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.chefsEvent.content[" + index + "].description"} />
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                value={chefsEvent.content ? chefsEvent.content[index].description : ""}
                                onChange={(e) => handleChefEvent(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.chefsEvent.content[" + index + "].image"} />
                              </Label>
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput("chefsEvent Image[" + index + "]");
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={"chefsEvent Image[" + index + "]"}
                                    rclassName="d-none"
                                    onChange={(e) => changeImageChefsEvent(e, "image", "chefs_event", chefsEvent, index)}
                                    style={{ display: "none" }}
                                  />
                                </Button>
                                <br></br>
                                <Col md={11}>
                                  <SingleLightbox
                                    large={chefsEvent.content ? chefsEvent.content[index].image : ""}
                                    thumb={chefsEvent.content ? chefsEvent.content[index].image : ""}
                                    className="card-img-top"
                                  ></SingleLightbox>
                                </Col>
                              </div>
                            </Colxx>
                          ))
                        : ""}
                    </Row>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "chefs_event", chefsEvent)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Virtual Dining</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.title" />
                    </Label>
                    <Input type="text" name="title" value={virtualDining ? virtualDining.title : ""} onChange={handleVirtDine} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.description" />
                    </Label>
                    <Input type="textarea" name="description" value={virtualDining ? virtualDining.description : ""} onChange={handleVirtDine} />
                    <Row>
                      {virtualDining.content
                        ? virtualDining.content.map((content, index) => (
                            <Colxx xxs="12" md="3">
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.virtualDining.content[" + index + "].title"} />
                              </Label>
                              <Input
                                type="text"
                                name="title"
                                value={virtualDining.content ? virtualDining.content[index].title : ""}
                                onChange={(e) => handleVirtDine(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.virtualDining.content[" + index + "].description"} />
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                value={virtualDining.content ? virtualDining.content[index].description : ""}
                                onChange={(e) => handleVirtDine(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.virtualDining.content[" + index + "].image"} />
                              </Label>
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput("virtualDining Image[" + index + "]");
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={"virtualDining Image["+index+"]"}
                                    rclassName="d-none"
                                    onChange={(e) => changeImageVirtualDinning(e, "image", "virtual_dining", virtualDining, index)}
                                    style={{ display: "none" }}
                                  />
                                </Button>
                                <br></br>
                                <Col md={11}>
                                  <SingleLightbox
                                    large={virtualDining.content ? virtualDining.content[index].image : ""}
                                    thumb={virtualDining.content ? virtualDining.content[index].image : ""}
                                    className="card-img-top"
                                  ></SingleLightbox>
                                </Col>
                              </div>
                            </Colxx>
                          ))
                        : ""}
                    </Row>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "virtual_dining", virtualDining)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Chefs Table</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.title" />
                    </Label>
                    <Input type="text" name="title" value={chefsTable ? chefsTable.title : ""} onChange={handleChefTable} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.description" />
                    </Label>
                    <Input type="textarea" name="description" value={chefsTable ? chefsTable.description : ""} onChange={handleChefTable} />
                    <Row>
                      {chefsTable.content
                        ? chefsTable.content.map((content, index) => (
                            <Colxx xxs="12" md="3">
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.chefsTable.content[" + index + "].title"} />
                              </Label>
                              <Input
                                type="text"
                                name="title"
                                value={chefsTable.content ? chefsTable.content[index].title : ""}
                                onChange={(e) => handleChefTable(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.chefsTable.content[" + index + "].description"} />
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                value={chefsTable.content ? chefsTable.content[index].description : ""}
                                onChange={(e) => handleChefTable(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.chefsTable.content[" + index + "].image"} />
                              </Label>
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput("ChefsTable Image[" + index + "]");
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={"ChefsTable Image[" + index + "]"}
                                    rclassName="d-none"
                                    onChange={(e) => changeImageChefsTable(e, "image", "chefs_table", chefsTable, index)}
                                    style={{ display: "none" }}
                                  />
                                </Button>
                                <br></br>
                                <Col md={11}>
                                  <SingleLightbox
                                    large={chefsTable.content ? chefsTable.content[index].image : ""}
                                    thumb={chefsTable.content ? chefsTable.content[index].image : ""}
                                    className="card-img-top"
                                  ></SingleLightbox>
                                </Col>
                              </div>
                            </Colxx>
                          ))
                        : ""}
                    </Row>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "chefs_table", chefsTable)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Fine Dining</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.title" />
                    </Label>
                    <Input type="text" name="title" value={fineDining ? fineDining.title : ""} onChange={handleFineDine} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.description" />
                    </Label>
                    <Input type="textarea" name="description" value={fineDining ? fineDining.description : ""} onChange={handleFineDine} />
                    <Row>
                      {fineDining.content
                        ? fineDining.content.map((content, index) => (
                            <Colxx xxs="12" md="3">
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.fineDining.content[" + index + "].title"} />
                              </Label>
                              <Input
                                type="text"
                                name="title"
                                value={fineDining.content ? fineDining.content[index].title : ""}
                                onChange={(e) => handleFineDine(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.fineDining.content[" + index + "].description"} />
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                value={fineDining.content ? fineDining.content[index].description : ""}
                                onChange={(e) => handleFineDine(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id={"bookExperience.fineDining.content[" + index + "].image"} />
                              </Label>
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput("fineDining Image[" + index + "]");
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={"fineDining Image[" + index + "]"}
                                    rclassName="d-none"
                                    onChange={(e) => changeImageFineDinning(e, "image", "fine_dining", fineDining, index)}
                                    style={{ display: "none" }}
                                  />
                                </Button>
                                <br></br>
                                <Col md={11}>
                                  <SingleLightbox
                                    large={fineDining.content ? fineDining.content[index].image : ""}
                                    thumb={fineDining.content ? fineDining.content[index].image : ""}
                                    className="card-img-top"
                                  ></SingleLightbox>
                                </Col>
                              </div>
                            </Colxx>
                          ))
                        : ""}
                    </Row>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "fine_dining", fineDining)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
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
                      <IntlMessages id="bookExperience.quote.title" />
                    </Label>
                    <Input type="text" name="title" value={quote ? quote.title : ""} onChange={handleQuote} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.quote.by" />
                    </Label>
                    <Input type="text" name="by" value={quote ? quote.by : ""} onChange={handleQuote} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "quote", quote)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.update" />
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
                      <IntlMessages id="bookExperience.bookingCta.title" />
                    </Label>
                    <Input type="text" name="title" value={bookingCta ? bookingCta.title : ""} onChange={handleBookingCta} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingCta.description" />
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
              onClick={(e) => handleClickBookExp(e, "booking_cta", bookingCta)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.update" />
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
                      <IntlMessages id="bookExperience.newsletter.title" />
                    </Label>
                    <Input type="text" name="title" value={newsletter ? newsletter.title : ""} onChange={handleNewsLetter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.newsletter.description" />
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
              onClick={(e) => handleClickBookExp(e, "newsletter", newsletter)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default BookExp;
