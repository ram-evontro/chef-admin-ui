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
import FaqModal from "./Modal/AddModal";
import { NotificationManager } from "components/common/react-notifications";
import * as axiosURLS from "helpers/endpoints";
const Patron = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState({});
  const [becomePatron, setBecomePatron] = useState({});
  const [membershipTypes, setMembershipTypes] = useState({});
  const [patronFooter, setPatronFooter] = useState({});
  const [faq, setFaq] = useState({});
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const { upload } = fileapi();

  const handleBecomePatron = (e, x = -1) => {
    let tempdata = { ...becomePatron };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setBecomePatron(tempdata);
  };
  const handleMembershipTypes = (e, x = -1) => {
    let tempdata = { ...membershipTypes };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setMembershipTypes(tempdata);
  };
  const handlePatronFooter = (e, x = -1) => {
    let tempdata = { ...patronFooter };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setPatronFooter(tempdata);
  };
  const handleFaq = (e, x = -1) => {
    let tempdata = { ...faq };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setFaq(tempdata);
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
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.PATRON, form);
      setHeader({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
      e.target.value = "";
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageBecomePatron = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.PATRON, form);
      setBecomePatron({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImagePatronFooter = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.PATRON, form);
      setPatronFooter({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
      e.target.value = "";
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const handleClickForPatron = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.PATRON, newfomdata);
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
  
const fetchFaqData = (data) => {
    let allData = faq;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setFaq(allData);
  };
  const deleteFaq = (index) => {
    let allData = faq;
    const result = faq.content.filter((element, i) => i != index);
    allData.content = result;
    setFaq({ ...allData });
  };
  const deleteHeader = (index) => {
    let allData = header;
    const result = header.images.filter((element, i) => i != index);
    allData.images = result;
    setHeader({ ...allData });
  };

  const openFileInput = (image) => {
    document.getElementById(image).click();
  };
  useEffect(async () => {
    setLoading(true);
    try {
      //   let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.PATRON);
      //   valueSetter(data);
      let data = {};
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
    setHeader(data.patron ? data.patron.header : { images: [] });
    setBecomePatron(data.patron ? data.patron.become_patron : { content: [{ title: "title1" }, { title: "title2" }, { title: "title3" }] });
    setMembershipTypes(data.patron ? data.patron.membership_types : { content: [{ title: "title1" }, { title: "title2" }] });
    setFaq(data.patron ? data.patron.faq : {});
    setPatronFooter(data.patron ? data.patron.patron_footer : {});
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
                      <IntlMessages id="bookExperience.patron.header.image" />
                    </Label>
                    <Row>
                      {header.images &&
                        header.images.map((element, index) => {
                          return (
                            <Colxx xxs="12" md="4">
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput(`patronHeaderImage${index}`);
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={`patronHeaderImage${index}`}
                                    rclassName="d-none"
                                    onChange={(e) => changeImageHeader(e, index, "header", header)}
                                    style={{ display: "none" }}
                                  />
                                </Button>
                                <Button
                                  onClick={() => {
                                    deleteHeader(index);
                                  }}
                                  className="icon-button"
                                  style={{ float: "left" }}
                                >
                                  <i className="simple-icon-trash" />
                                  <br></br>
                                </Button>
                                <br></br>
                                <Col>
                                  <SingleLightbox
                                    large={header.images[index] ? header.images[index] : ""}
                                    thumb={header.images[index] ? header.images[index] : ""}
                                    className="card-img-top"
                                  ></SingleLightbox>
                                </Col>
                              </div>
                            </Colxx>
                          );
                        })}
                    </Row>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Row>
              <Colxx>
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 mr-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={(e) => handleClickForPatron(e, "header", header)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.patron.update" />
                  </span>
                </Button>
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={() => {
                    openFileInput(`patronHeaderImage${header.images ? header.images.length : 0}`);
                  }}
                >
                  <input
                    type="file"
                    id={`patronHeaderImage${header.images ? header.images.length : 0}`}
                    rclassName="d-none"
                    onChange={(e) => changeImageHeader(e, header.images ? header.images.length : 0, "header", header)}
                    style={{ display: "none" }}
                  />
                  <span className="label">
                    <IntlMessages id="bookExperience.addNew" />
                  </span>
                </Button>
              </Colxx>
            </Row>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Become Patron</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.becomePatron.title" />
                    </Label>
                    <Input type="text" name="title" value={becomePatron.title ? becomePatron.title : ""} onChange={handleBecomePatron} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.becomePatron.description" />
                    </Label>
                    <Input type="textarea" name="description" value={becomePatron.description ? becomePatron.description : ""} onChange={handleBecomePatron} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.becomePatron.image" />
                    </Label>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("becomePatronImage0");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="becomePatronImage0"
                              rclassName="d-none"
                              onChange={(e) => changeImageBecomePatron(e, "image", "become_patron", becomePatron, 0)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={becomePatron && becomePatron.content ? becomePatron.content[0].image : ""}
                              thumb={becomePatron && becomePatron.content ? becomePatron.content[0].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("becomePatronImage1");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="becomePatronImage1"
                              rclassName="d-none"
                              onChange={(e) => changeImageBecomePatron(e, "image", "become_patron", becomePatron, 1)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={becomePatron && becomePatron.content ? becomePatron.content[1].image : ""}
                              thumb={becomePatron && becomePatron.content ? becomePatron.content[1].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("becomePatronImage2");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="becomePatronImage2"
                              rclassName="d-none"
                              onChange={(e) => changeImageBecomePatron(e, "image", "become_patron", becomePatron, 2)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={becomePatron && becomePatron.content ? becomePatron.content[2].image : ""}
                              thumb={becomePatron && becomePatron.content ? becomePatron.content[2].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.becomePatron.content[0].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={becomePatron.content ? becomePatron.content[0].title : ""}
                          onChange={(e) => handleBecomePatron(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.becomePatron.content[1].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={becomePatron.content ? becomePatron.content[1].title : ""}
                          onChange={(e) => handleBecomePatron(e, 1)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.becomePatron.content[2].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={becomePatron.content ? becomePatron.content[2].title : ""}
                          onChange={(e) => handleBecomePatron(e, 2)}
                        />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.becomePatron.content[0].description" />
                        </Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={becomePatron.content ? becomePatron.content[0].description : ""}
                          onChange={(e) => handleBecomePatron(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.becomePatron.content[1].description" />
                        </Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={becomePatron.content ? becomePatron.content[1].description : ""}
                          onChange={(e) => handleBecomePatron(e, 1)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.becomePatron.content[2].description" />
                        </Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={becomePatron.content ? becomePatron.content[2].description : ""}
                          onChange={(e) => handleBecomePatron(e, 2)}
                        />
                      </Colxx>
                    </Row>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.becomePatron.link" />
                    </Label>
                    <Input type="text" name="link" value={becomePatron.link ? becomePatron.link : ""} onChange={handleBecomePatron} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForPatron(e, "become_patron", becomePatron)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.patron.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Membership Types</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.membershipTypes.title" />
                    </Label>
                    <Input type="text" name="title" value={membershipTypes.title ? membershipTypes.title : ""} onChange={handleMembershipTypes} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    <Row>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[0].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={membershipTypes.content ? membershipTypes.content[0].title : ""}
                          onChange={(e) => handleMembershipTypes(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[1].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={membershipTypes.content ? membershipTypes.content[1].title : ""}
                          onChange={(e) => handleMembershipTypes(e, 1)}
                        />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[0].subTitle" />
                        </Label>
                        <Input
                          type="text"
                          name="sub_title"
                          value={membershipTypes.content ? membershipTypes.content[0].sub_title : ""}
                          onChange={(e) => handleMembershipTypes(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[1].subTitle" />
                        </Label>
                        <Input
                          type="text"
                          name="sub_title"
                          value={membershipTypes.content ? membershipTypes.content[1].sub_title : ""}
                          onChange={(e) => handleMembershipTypes(e, 1)}
                        />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[0].description" />
                        </Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={membershipTypes.content ? membershipTypes.content[0].description : ""}
                          onChange={(e) => handleMembershipTypes(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[1].description" />
                        </Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={membershipTypes.content ? membershipTypes.content[1].description : ""}
                          onChange={(e) => handleMembershipTypes(e, 1)}
                        />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[0].price" />
                        </Label>
                        <Input
                          type="text"
                          name="price"
                          value={membershipTypes.content ? membershipTypes.content[0].price : ""}
                          onChange={(e) => handleMembershipTypes(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[1].price" />
                        </Label>
                        <Input
                          type="text"
                          name="price"
                          value={membershipTypes.content ? membershipTypes.content[1].price : ""}
                          onChange={(e) => handleMembershipTypes(e, 1)}
                        />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[0].popularity" />
                        </Label>
                        <Input
                          type="text"
                          name="popularity"
                          value={membershipTypes.content ? membershipTypes.content[0].popularity : ""}
                          onChange={(e) => handleMembershipTypes(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.patron.membershipTypes.content[1].popularity" />
                        </Label>
                        <Input
                          type="text"
                          name="popularity"
                          value={membershipTypes.content ? membershipTypes.content[1].popularity : ""}
                          onChange={(e) => handleMembershipTypes(e, 1)}
                        />
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
              onClick={(e) => handleClickForPatron(e, "membership_types", membershipTypes)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.patron.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>FAQ</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row xxs="12">
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.faq.title" />
                    </Label>
                    <Input type="text" name="title" value={faq.title ? faq.title : ""} onChange={handleFaq} />
                  </Colxx>
                </Row>
                <Row>
                  {faq.content &&
                    faq.content.map((element, index) => {
                      return (
                        <Colxx xxs="12">
                          <Row className="mt-4">
                            <Colxx>Review - {index + 1}</Colxx>
                            <Colxx>
                              <Button
                                onClick={() => {
                                  deleteFaq(index);
                                }}
                                className="icon-button"
                                style={{ float: "right" }}
                              >
                                <i className="simple-icon-trash" />
                                <br></br>
                              </Button>
                            </Colxx>
                          </Row>
                          <Label className="mt-2">
                            <IntlMessages id="bookExperience.patron.faq.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={faq.content[index].title ? faq.content[index].title : ""}
                            onChange={(e) => handleFaq(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.patron.faq.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={faq.content[index].description ? faq.content[index].description : ""}
                            onChange={(e) => handleFaq(e, index)}
                          />
                          <br></br>
                        </Colxx>
                      );
                    })}
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Row>
              <Colxx>
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 mr-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={(e) => handleClickForPatron(e, "faq", faq)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.patron.update" />
                  </span>
                </Button>
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={(e) => setFaqModalOpen(!faqModalOpen)}
                >
                  <span className="label">
                    <IntlMessages id="bookExperience.addNew" />
                  </span>
                </Button>
              </Colxx>
            </Row>
          </center>
        </Colxx>
      </Row>
      <FaqModal fetchData={fetchFaqData} modalOpen={faqModalOpen} toggleModal={() => setFaqModalOpen(!faqModalOpen)} title={"FAQ"}/>
      <Row>
        <Col sm="12">
          <h4>Patron Footer</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                  <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.patronFooter.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("patronFooterImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="patronFooterImage"
                          rclassName="d-none"
                          onChange={(e) => changeImagePatronFooter(e, "image", "patron_footer", patronFooter)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={patronFooter ? patronFooter.image : ""}
                          thumb={patronFooter ? patronFooter.image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.patronFooter.title" />
                    </Label>
                    <Input type="text" name="title" value={patronFooter.title ? patronFooter.title : ""} onChange={handlePatronFooter} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForPatron(e, "patron_footer", patronFooter)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.patron.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default Patron;
