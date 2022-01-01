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

const PrivateExp = () => {
  const [header, setHeader] = useState({});
  const [offerings, setOfferings] = useState({});
  const [newsletter, setNewsletter] = useState({});
  const [browseall, setBrowseall] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currPicture, setCurrPicture] = useState();
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
  const handleBrowseAll = (e) => {
    let tempdata = { ...browseall };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setBrowseall(tempdata);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.PRIVATE_EXP, form);
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
      await api.patch(axiosURLS.BASE_URL + axiosURLS.PRIVATE_EXP, newfomdata);
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
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.PRIVATE_EXP);
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
    setHeader(data.private_experiences.header);
    setOfferings(data.private_experiences.offerings);
    setNewsletter(data.private_experiences.newsletter);
    setBrowseall(data.private_experiences.browse_all);
    
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
                      <IntlMessages id="bookExperience.forChef.header.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("PrivateExp headerImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          // ref={inputFile}
                          id="PrivateExp headerImage"
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
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.forChef.header.content[0].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[0].title : ""} onChange={(e) => handleHeader(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.forChef.header.content[1].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[1].title : ""} onChange={(e) => handleHeader(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.forChef.header.content[2].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[2].title : ""} onChange={(e) => handleHeader(e, 2)} />
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
                    <Row>
                      <Colxx xxs="12" md="6">
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
                          <Col md={11}>
                            <SingleLightbox
                              large={offerings.content ? offerings.content[0].image : ""}
                              thumb={offerings.content ? offerings.content[0].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="6">
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
                          <Col md={11}>
                            <SingleLightbox
                              large={offerings.content ? offerings.content[1].image : ""}
                              thumb={offerings.content ? offerings.content[1].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
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
              onClick={(e) => handleClickForChef(e, "offerings", offerings)}
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
          <h4>Browse All Ticketed Experiences</h4>
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
                    <Input type="text" name="title" value={browseall ? browseall.title : ""} onChange={handleBrowseAll} />
                    <Label className="mt-4">
                      Button Text
                    </Label>
                    <Input type="text" name="button_text" value={browseall ? browseall.button_text : ""} onChange={handleBrowseAll} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForChef(e, "browse_all", browseall)}
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
              onClick={(e) => handleClickForChef(e, "newsletter", newsletter)}
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
export default PrivateExp;
