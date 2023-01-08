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
import RatingsModal from "./Modal/RatingsModal";
import FaqModal from "./Modal/AddModal";
import { NotificationManager } from "components/common/react-notifications";
import * as axiosURLS from "helpers/endpoints";

const Privee = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState({});
  const [work, setWork] = useState({});
  const [experiences, setExperiences] = useState({});
  const [privateDining, setPrivateDining] = useState({});
  const [priveeFooter, setPriveeFooter] = useState({});
  const [faq, setFaq] = useState({});
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [reviews, setReviews] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

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
  const handleWork = (e, x = -1) => {
    let tempdata = { ...work };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setWork(tempdata);
  };
  const handleExperiences = (e, x = -1) => {
    let tempdata = { ...experiences };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setExperiences(tempdata);
  };
  const handlePrivateDining = (e, x = -1) => {
    let tempdata = { ...privateDining };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setPrivateDining(tempdata);
  };
  const handlePriveeFooter = (e, x = -1) => {
    let tempdata = { ...priveeFooter };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setPriveeFooter(tempdata);
  };
  const handleReviews = (e, x = -1) => {
    let tempdata = { ...reviews };
    let val = e.target.value;
    let name = e.target.name;
    if (e.target.name === "ratings" && val != "" && (val < 1 || val > 5)) {
      return;
    }
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setReviews(tempdata);
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

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.PRIVEE, form);
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
  const changeImageWork = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.PRIVEE, form);
      setWork({ ...formdata });

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
  const changeImagePrivateDining = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["images"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.PRIVEE, form);
      setPrivateDining({ ...formdata });
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

  const handleClickForPrivee = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.PRIVEE, newfomdata);
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

  const fetchData = (data) => {
    let allData = reviews;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setReviews(allData);
  };
  const fetchFaqData = (data) => {
    let allData = faq;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setFaq(allData);
  };
  const deleteReview = (index) => {
    let allData = reviews;
    const result = reviews.content.filter((element, i) => i != index);
    allData.content = result;
    setReviews({ ...allData });
  };
  const deletePrivateDining = (index) => {
    let allData = privateDining;
    const result = privateDining.images.filter((element, i) => i != index);
    allData.images = result;
    setPrivateDining({ ...allData });
  };
  const deleteFaq = (index) => {
    let allData = faq;
    const result = faq.content.filter((element, i) => i != index);
    allData.content = result;
    setFaq({ ...allData });
  };
  useEffect(async () => {
    setLoading(true);
    try {
      // let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.PRIVEE);
      // valueSetter(data.privee);
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
    setHeader(data.privee ? data.privee.header : {});
    setWork(data.privee ? data.privee.work : { content: [{ title: "title1" }, { title: "title2" }, { title: "title3" }] });
    setExperiences(data.privee ? data.privee.experiences : {});
    setPrivateDining(data.privee ? data.privee.private_dining : { images: [] });
    setPriveeFooter(data.privee ? data.privee.privee_footer : {});
    setFaq(data.privee ? data.privee.faq : {});
    setReviews(data.privee ? data.privee.reviews : { content: [] });
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
                      <IntlMessages id="bookExperience.privee.header.image" />
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
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privee.header.title" />
                    </Label>
                    <Input type="text" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForPrivee(e, "header", header)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.privee.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>How it works</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privee.work.title" />
                    </Label>
                    <Input type="text" name="title" value={work.title ? work.title : ""} onChange={handleWork} />
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.privee.work.content[0].title" />
                        </Label>
                        <Input type="text" name="title" value={work.content ? work.content[0].title : ""} onChange={(e) => handleWork(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.privee.work.content[1].title" />
                        </Label>
                        <Input type="text" name="title" value={work.content ? work.content[1].title : ""} onChange={(e) => handleWork(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.privee.work.content[2].title" />
                        </Label>
                        <Input type="text" name="title" value={work.content ? work.content[2].title : ""} onChange={(e) => handleWork(e, 2)} />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.privee.work.content[0].description" />
                        </Label>
                        <Input type="textarea" name="description" value={work.content ? work.content[0].description : ""} onChange={(e) => handleWork(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.privee.work.content[1].description" />
                        </Label>
                        <Input type="textarea" name="description" value={work.content ? work.content[1].description : ""} onChange={(e) => handleWork(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.privee.work.content[2].description" />
                        </Label>
                        <Input type="textarea" name="description" value={work.content ? work.content[2].description : ""} onChange={(e) => handleWork(e, 2)} />
                      </Colxx>
                    </Row>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privee.work.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("workImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="workImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageWork(e, "image", "work", work)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox large={work ? work.image : ""} thumb={work ? work.image : ""} className="card-img-top"></SingleLightbox>
                      </Col>
                    </div>
                    <Label className="mt-4">
                          <IntlMessages id="bookExperience.privee.work.subTitle" />
                        </Label>
                        <Input type="text" name="sub_title" value={work.sub_title ? work.sub_title : ""} onChange={handleWork} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForPrivee(e, "work", work)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.privee.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Available Experiences</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privee.experiences.title" />
                    </Label>
                    <Input type="text" name="title" value={experiences.title ? experiences.title : ""} onChange={handleExperiences} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForPrivee(e, "experiences", experiences)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.privee.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Reviews</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  {reviews.content &&
                    reviews.content.map((review, index) => {
                      return (
                        <Colxx xxs="12">
                          <Row className="mt-4">
                            <Colxx>Review - {index + 1}</Colxx>
                            <Colxx>
                              <Button
                                onClick={() => {
                                  deleteReview(index);
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
                            <IntlMessages id="bookExperience.privee.reviews.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={reviews.content[index].title ? reviews.content[index].title : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.privee.reviews.ratings" />
                          </Label>
                          <Input
                            type="number"
                            name="ratings"
                            value={reviews.content[index].ratings ? reviews.content[index].ratings : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.privee.reviews.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={reviews.content[index].description ? reviews.content[index].description : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.privee.reviews.designation" />
                          </Label>
                          <Input
                            type="text"
                            name="designation"
                            value={reviews.content[index].designation ? reviews.content[index].designation : ""}
                            onChange={(e) => handleReviews(e, index)}
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
                  onClick={(e) => handleClickForPrivee(e, "reviews", reviews)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.privee.update" />
                  </span>
                </Button>

                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={(e) => setModalOpen(!modalOpen)}
                >
                  <span className="label">
                    <IntlMessages id="bookExperience.privee.addNew" />
                  </span>
                </Button>
              </Colxx>
            </Row>
          </center>
        </Colxx>
      </Row>
      <RatingsModal fetchData={fetchData} modalOpen={modalOpen} toggleModal={() => setModalOpen(!modalOpen)} />
      <Row>
        <Col sm="12">
          <h4>Peek into Private Dining</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privee.privateDining.title" />
                    </Label>
                    <Input type="text" name="title" value={privateDining ? privateDining.title : ""} onChange={handlePrivateDining} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privee.privateDining.link" />
                    </Label>
                    <Input type="text" name="link" value={privateDining ? privateDining.link : ""} onChange={handlePrivateDining} />
                    <Row>
                      <Colxx xxs="12">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.privee.privateDining.image" />
                        </Label>
                        <Row>
                          {privateDining.images &&
                            privateDining.images.map((element, index) => {
                              return (
                                <Colxx xxs="12" md="4">
                                  <div>
                                    <Button
                                      onClick={() => {
                                        openFileInput(`privateDiningImage${index}`);
                                      }}
                                      className="icon-button"
                                      style={{ float: "right" }}
                                    >
                                      <i className="simple-icon-pencil" />
                                      <br></br>
                                      <input
                                        type="file"
                                        id={`privateDiningImage${index}`}
                                        rclassName="d-none"
                                        onChange={(e) => changeImagePrivateDining(e, index, "private_dining", privateDining)}
                                        style={{ display: "none" }}
                                      />
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        deletePrivateDining(index);
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
                                        large={privateDining.images[index] ? privateDining.images[index] : ""}
                                        thumb={privateDining.images[index] ? privateDining.images[index] : ""}
                                        className="card-img-top"
                                      ></SingleLightbox>
                                    </Col>
                                  </div>
                                </Colxx>
                              );
                            })}
                        </Row>
                        <center>
                          <Row>
                            <Colxx>
                              <Button
                                color="primary"
                                className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                                onClick={() => {
                                  openFileInput(`privateDiningImage${privateDining.images ? privateDining.images.length : 0}`);
                                }}
                              >
                                <input
                                  type="file"
                                  id={`privateDiningImage${privateDining.images ? privateDining.images.length : 0}`}
                                  rclassName="d-none"
                                  onChange={(e) =>
                                    changeImagePrivateDining(e, privateDining.images ? privateDining.images.length : 0, "private_dining", privateDining)
                                  }
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
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForPrivee(e, "private_dining", privateDining)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.privee.update" />
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
                      <IntlMessages id="bookExperience.privee.faq.title" />
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
                            <IntlMessages id="bookExperience.privee.faq.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={faq.content[index].title ? faq.content[index].title : ""}
                            onChange={(e) => handleFaq(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.privee.faq.description" />
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
                  onClick={(e) => handleClickForPrivee(e, "faq", faq)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.privee.update" />
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
      <FaqModal fetchData={fetchFaqData} modalOpen={faqModalOpen} toggleModal={() => setFaqModalOpen(!faqModalOpen)} />
      <Row>
        <Col sm="12">
          <h4>Privee Footer</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privee.priveeFooter.title" />
                    </Label>
                    <Input type="text" name="title" value={priveeFooter ? priveeFooter.title : ""} onChange={handlePriveeFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privee.priveeFooter.button" />
                    </Label>
                    <Input type="text" name="button" value={priveeFooter ? priveeFooter.button : ""} onChange={handlePriveeFooter} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForPrivee(e, "privee_footer", priveeFooter)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.privee.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default Privee;
