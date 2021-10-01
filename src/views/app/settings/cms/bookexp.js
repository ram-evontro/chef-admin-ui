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
  const [activeTab, setActiveTab] = useState("1");
  const [header, setHeader] = useState({});
  const [virtualDining, setVirtualDining] = useState({});
  const [chefsTable, setChefsTable] = useState({});
  const [ourfeaturedChefs, setOurfeaturedChefs] = useState({});
  const [offerings, setOfferings] = useState({});
  const [newsletter, setNewsletter] = useState({});
  const [fineDining, setFineDining] = useState({});
  const [quote, setQuote] = useState({});
  const [bookingCta, setBookingCta] = useState({});
  const [bookExperience, setBookExperience] = useState({});
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

      formdata[imageSection] = fileurl;
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
  }, []);
  const valueSetter = (data) => {
    setVirtualDining(data.book_experience.virtual_dining);
    setHeader(data.book_experience.header);
    setChefsTable(data.book_experience.chefs_table);
    setOurfeaturedChefs(data.book_experience.our_featured_chefs);
    setOfferings(data.book_experience.offerings);
    setNewsletter(data.book_experience.newsletter);
    setFineDining(data.book_experience.fine_dining);
    setQuote(data.book_experience.quote);
    setBookingCta(data.book_experience.booking_cta);
  };
  return (
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
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("headerImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="headerImage"
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
                    {/* <Input type="text" name="image" value={header.image ? header.image : ""} onChange={handleHeader} /> */}
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.title" />
                    </Label>
                    <Input type="text" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[0].title : ""} onChange={(e) => handleHeader(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={header.content ? header.content[0].description : ""}
                      onChange={(e) => handleHeader(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[1].title : ""} onChange={(e) => handleHeader(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={header.content ? header.content[1].description : ""}
                      onChange={(e) => handleHeader(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.content[2].title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content[2].title : ""} onChange={(e) => handleHeader(e, 2)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.header.content[2].description" />
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
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={chefsTable.content ? chefsTable.content[0].title : ""} onChange={(e) => handleChefTable(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={chefsTable.content ? chefsTable.content[0].description : ""}
                      onChange={(e) => handleChefTable(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[0].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ChefsTable Image[0]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ChefsTable Image[0]"
                          rclassName="d-none"
                          onChange={(e) => changeImageChefsTable(e, "image", "chefs_table", chefsTable, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={chefsTable.content ? chefsTable.content[0].image : ""}
                          thumb={chefsTable.content ? chefsTable.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={chefsTable.content ? chefsTable.content[1].title : ""} onChange={(e) => handleChefTable(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={chefsTable.content ? chefsTable.content[1].description : ""}
                      onChange={(e) => handleChefTable(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[1].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ChefsTable Image[1]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ChefsTable Image[1]"
                          rclassName="d-none"
                          onChange={(e) => changeImageChefsTable(e, "image", "chefs_table", chefsTable, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={chefsTable.content ? chefsTable.content[1].image : ""}
                          thumb={chefsTable.content ? chefsTable.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[2].title" />
                    </Label>
                    <Input type="text" name="title" value={chefsTable.content ? chefsTable.content[2].title : ""} onChange={(e) => handleChefTable(e, 2)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[2].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={chefsTable.content ? chefsTable.content[2].description : ""}
                      onChange={(e) => handleChefTable(e, 2)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[2].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ChefsTable Image[2]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ChefsTable Image[2]"
                          rclassName="d-none"
                          onChange={(e) => changeImageChefsTable(e, "image", "chefs_table", chefsTable, 2)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={chefsTable.content ? chefsTable.content[2].image : ""}
                          thumb={chefsTable.content ? chefsTable.content[2].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[3].title" />
                    </Label>
                    <Input type="text" name="title" value={chefsTable.content ? chefsTable.content[3].title : ""} onChange={(e) => handleChefTable(e, 3)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[3].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={chefsTable.content ? chefsTable.content[3].description : ""}
                      onChange={(e) => handleChefTable(e, 3)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsTable.content[3].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ChefsTable Image[3]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ChefsTable Image[3]"
                          rclassName="d-none"
                          onChange={(e) => changeImageChefsTable(e, "image", "chefs_table", chefsTable, 3)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={chefsTable.content ? chefsTable.content[3].image : ""}
                          thumb={chefsTable.content ? chefsTable.content[3].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
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
                          openFileInput("Offerings Image[0]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="Offerings Image[0]"
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
                    </div>
                    <br></br>
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
                          openFileInput("Offerings Image[1]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="Offerings Image[1]"
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
              onClick={(e) => handleClickBookExp(e, "offerings", offerings)}
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
          <h4>Fine Dinning</h4>
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
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={fineDining.content ? fineDining.content[0].title : ""} onChange={(e) => handleFineDine(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={fineDining.content ? fineDining.content[0].description : ""}
                      onChange={(e) => handleFineDine(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[0].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("fineDining Image[0]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="fineDining Image[0]"
                          rclassName="d-none"
                          onChange={(e) => changeImageFineDinning(e, "image", "fine_dining", fineDining, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={fineDining.content ? fineDining.content[0].image : ""}
                          thumb={fineDining.content ? fineDining.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={fineDining.content ? fineDining.content[1].title : ""} onChange={(e) => handleFineDine(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={fineDining.content ? fineDining.content[1].description : ""}
                      onChange={(e) => handleFineDine(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[1].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("fineDining Image[1]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="fineDining Image[1]"
                          rclassName="d-none"
                          onChange={(e) => changeImageFineDinning(e, "image", "fine_dining", fineDining, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={fineDining.content ? fineDining.content[1].image : ""}
                          thumb={fineDining.content ? fineDining.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[2].title" />
                    </Label>
                    <Input type="text" name="title" value={fineDining.content ? fineDining.content[2].title : ""} onChange={(e) => handleFineDine(e, 2)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[2].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={fineDining.content ? fineDining.content[2].description : ""}
                      onChange={(e) => handleFineDine(e, 2)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[2].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("fineDining Image[2]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="fineDining Image[2]"
                          rclassName="d-none"
                          onChange={(e) => changeImageFineDinning(e, "image", "fine_dining", fineDining, 2)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={fineDining.content ? fineDining.content[2].image : ""}
                          thumb={fineDining.content ? fineDining.content[2].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[3].title" />
                    </Label>
                    <Input type="text" name="title" value={fineDining.content ? fineDining.content[3].title : ""} onChange={(e) => handleFineDine(e, 3)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[3].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={fineDining.content ? fineDining.content[3].description : ""}
                      onChange={(e) => handleFineDine(e, 3)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.fineDining.content[3].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("fineDining Image[3]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="fineDining Image[3]"
                          rclassName="d-none"
                          onChange={(e) => changeImageFineDinning(e, "image", "fine_dining", fineDining, 3)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={fineDining.content ? fineDining.content[3].image : ""}
                          thumb={fineDining.content ? fineDining.content[3].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
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
          <h4>Virtual Dinning</h4>
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
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[0].title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={virtualDining.content ? virtualDining.content[0].title : ""}
                      onChange={(e) => handleVirtDine(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={virtualDining.content ? virtualDining.content[0].description : ""}
                      onChange={(e) => handleVirtDine(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[0].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("virtualDining Image[0]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="virtualDining Image[0]"
                          rclassName="d-none"
                          onChange={(e) => changeImageVirtualDinning(e, "image", "virtual_dining", virtualDining, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={virtualDining.content ? virtualDining.content[0].image : ""}
                          thumb={virtualDining.content ? virtualDining.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>

                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[1].title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={virtualDining.content ? virtualDining.content[1].title : ""}
                      onChange={(e) => handleVirtDine(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={virtualDining.content ? virtualDining.content[1].description : ""}
                      onChange={(e) => handleVirtDine(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[1].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("virtualDining Image[1]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="virtualDining Image[1]"
                          rclassName="d-none"
                          onChange={(e) => changeImageVirtualDinning(e, "image", "virtual_dining", virtualDining, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={virtualDining.content ? virtualDining.content[1].image : ""}
                          thumb={virtualDining.content ? virtualDining.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>

                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[2].title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={virtualDining.content ? virtualDining.content[2].title : ""}
                      onChange={(e) => handleVirtDine(e, 2)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[2].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={virtualDining.content ? virtualDining.content[2].description : ""}
                      onChange={(e) => handleVirtDine(e, 2)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[2].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("virtualDining Image[2]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="virtualDining Image[2]"
                          rclassName="d-none"
                          onChange={(e) => changeImageVirtualDinning(e, "image", "virtual_dining", virtualDining, 2)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={virtualDining.content ? virtualDining.content[2].image : ""}
                          thumb={virtualDining.content ? virtualDining.content[2].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[3].title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={virtualDining.content ? virtualDining.content[3].title : ""}
                      onChange={(e) => handleVirtDine(e, 3)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[3].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={virtualDining.content ? virtualDining.content[3].description : ""}
                      onChange={(e) => handleVirtDine(e, 3)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.virtualDining.content[3].image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("virtualDining Image[3]");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="virtualDining Image[3]"
                          rclassName="d-none"
                          onChange={(e) => changeImageVirtualDinning(e, "image", "virtual_dining", virtualDining, 3)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={virtualDining.content ? virtualDining.content[3].image : ""}
                          thumb={virtualDining.content ? virtualDining.content[3].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
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
    </React.Fragment>
  );
};
export default BookExp;
