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
import Modal from "./Modal/AddModal";
import { NotificationManager } from "components/common/react-notifications";
import * as axiosURLS from "helpers/endpoints";

const SupperClub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState({});
  const [upcoming, setUpcoming] = useState({});
  const [cooking, setCooking] = useState({});
  const [expect, setExpect] = useState({});
  const [supperFooter, setSupperFooter] = useState({});
  const [faq, setFaq] = useState({});
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [reviews, setReviews] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [looks, setLooks] = useState({});
  const [behindScenes, setBehindScenes] = useState({});
  const [behindScenesModalOpen, setBehindScenesModalOpen] = useState(false);
  const [stayKnow, setStayKnow] = useState({});

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
  const handleUpcoming = (e, x = -1) => {
    let tempdata = { ...upcoming };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setUpcoming(tempdata);
  };
  const handleCooking = (e, x = -1) => {
    let tempdata = { ...cooking };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setCooking(tempdata);
  };
  const handleExpect = (e, x = -1) => {
    let tempdata = { ...expect };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setExpect(tempdata);
  };
  const handleSupperFooter = (e, x = -1) => {
    let tempdata = { ...supperFooter };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setSupperFooter(tempdata);
  };
  const handleReviews = (e, x = -1) => {
    let tempdata = { ...reviews };
    let val = e.target.value;
    let name = e.target.name;
    if (e.target.name === "rating" && val != "" && (val < 1 || val > 5)) {
      return;
    }
    if (x !== -1) {
      tempdata.reviews[x][name] = val;
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
      tempdata.contents[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setFaq(tempdata);
  };
  const handleLooks = (e, x = -1) => {
    let tempdata = { ...looks };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setLooks(tempdata);
  };
  const handleBehindScenes = (e, x = -1) => {
    let tempdata = { ...behindScenes };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setBehindScenes(tempdata);
  };
  const handleStayKnow = (e, x = -1) => {
    let tempdata = { ...stayKnow };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setStayKnow(tempdata);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.SUPPER_CLUB, form);
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
  const changeImageExpect = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.SUPPER_CLUB, form);
      setExpect({ ...formdata });
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
  const changeImageLooks = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["content"][imageSection] = fileurl;
    }

    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.SUPPER_CLUB, form);
      setLooks({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
      e.target.value = "";
    } catch (err) {
      e.target.value = "";
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageBehindScenes = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata["content"][imageSection].image = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.SUPPER_CLUB, form);
      setBehindScenes({ ...formdata });
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

  const handleClickForSupperClub = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.SUPPER_CLUB, newfomdata);
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
    allData.reviews ? allData.reviews.push(data) : (allData.reviews = [data]);
    setReviews(allData);
  };
  const fetchFaqData = (data) => {
    let allData = faq;
    allData.contents ? allData.contents.push(data) : (allData.contents = [data]);
    setFaq(allData);
  };
  const fetchBehindScenesData = async (data) => {
    if (data.image) {
      let fileurl = await upload(data.image);
      data.image = fileurl;
    }
    let allData = behindScenes;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setBehindScenes({ ...allData });
  };
  const deleteReview = (index) => {
    let allData = reviews;
    const result = reviews.reviews.filter((element, i) => i != index);
    allData.reviews = result;
    setReviews({ ...allData });
  };
  const deleteFaq = (index) => {
    let allData = faq;
    const result = faq.contents.filter((element, i) => i != index);
    allData.contents = result;
    setFaq({ ...allData });
  };
  const deleteLooks = (index) => {
    let allData = looks;
    const result = looks.content.filter((element, i) => i != index);
    allData.content = result;
    setLooks({ ...allData });
  };
  const deleteBehindScenes = (index) => {
    let allData = behindScenes;
    const result = behindScenes.content.filter((element, i) => i != index);
    allData.content = result;
    setBehindScenes({ ...allData });
  };
  const deleteStayKnow = (index) => {
    let allData = stayKnow;
    const result = stayKnow.images.filter((element, i) => i != index);
    allData.images = result;
    setStayKnow({ ...allData });
  };

  useEffect(async () => {
    setLoading(true);
    try {
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.SUPPER_CLUB);
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
    let all = {};
    data.map((ele) => {
      ele.details.type= ele.type;
      all[ele.section] = ele;
    });
    setHeader(all.header.details);
    setUpcoming(all.upcoming_supper_club.details);
    setCooking(all.cooking.details);
    setExpect(all.expect.details);
    setReviews(all.reviews.details);
    setLooks(all.looks.details);
    setBehindScenes(all.behind_scenes.details);
    // setSupperFooter(all.supper_club ? all.supper_club.supper_footer : {});
    setFaq(all.faq.details);
    // setStayKnow(all.supper_club ? all.supper_club.stayKnow : { images: [] });
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
                      <IntlMessages id="bookExperience.supperClub.header.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("supperHeaderImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="supperHeaderImage"
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
                      <IntlMessages id="bookExperience.supperClub.header.title" />
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
              onClick={(e) => handleClickForSupperClub(e, "header", header)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.supperClub.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Upcoming Supper Clubs</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.upcoming.title" />
                    </Label>
                    <Input type="text" name="title" value={upcoming ? upcoming.title : ""} onChange={handleUpcoming} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForSupperClub(e, "upcoming_supper_club", upcoming)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.supperClub.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>What's Cooking</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.cooking.title" />
                    </Label>
                    <Input type="text" name="title" value={cooking ? cooking.title : ""} onChange={handleCooking} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForSupperClub(e, "cooking", cooking)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.supperClub.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>What to expect</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.expect.title" />
                    </Label>
                    <Input type="text" name="title" value={expect.title ? expect.title : ""} onChange={handleExpect} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.expect.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("expectImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="expectImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageExpect(e, "image", "expect", expect)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox large={expect ? expect.image : ""} thumb={expect ? expect.image : ""} className="card-img-top"></SingleLightbox>
                      </Col>
                    </div>
                    {expect.content &&
                      expect.content.map((data, index) => {
                        return (
                          <Row>
                            <Colxx xxs="12" md="6">
                              <Label className="mt-4">
                                <IntlMessages id={`bookExperience.supperClub.expect.content[${index}].title`} />
                              </Label>
                              <Input type="text" name="title" value={expect.content ? expect.content[index].title : ""} onChange={(e) => handleExpect(e, index)} />
                            </Colxx>
                            <Colxx xxs="12" md="6">
                              <Label className="mt-4">
                                <IntlMessages id={`bookExperience.supperClub.expect.content[${index}].description`} />
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                value={expect.content ? expect.content[index].description : ""}
                                onChange={(e) => handleExpect(e, index)}
                              />
                            </Colxx>
                          </Row>
                        );
                      })}
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForSupperClub(e, "expect", expect)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.supperClub.update" />
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
                  {reviews.reviews &&
                    reviews.reviews.map((review, index) => {
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
                            <IntlMessages id="bookExperience.supperClub.reviews.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={reviews.reviews[index].title ? reviews.reviews[index].title : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.supperClub.reviews.rating" />
                          </Label>
                          <Input
                            type="number"
                            name="rating"
                            value={reviews.reviews[index].rating ? reviews.reviews[index].rating : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.supperClub.reviews.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={reviews.reviews[index].description ? reviews.reviews[index].description : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.supperClub.reviews.reviewer" />
                          </Label>
                          <Input
                            type="text"
                            name="reviewer"
                            value={reviews.reviews[index].reviewer ? reviews.reviews[index].reviewer : ""}
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
                  onClick={(e) => handleClickForSupperClub(e, "reviews", reviews)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.supperClub.update" />
                  </span>
                </Button>

                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={(e) => setModalOpen(!modalOpen)}
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
      <RatingsModal fetchData={fetchData} modalOpen={modalOpen} toggleModal={() => setModalOpen(!modalOpen)} />
      <Row>
        <Col sm="12">
          <h4>Supper Clubs Look</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.looks.title" />
                    </Label>
                    <Input type="text" name="title" value={looks ? looks.title : ""} onChange={handleLooks} />
                    <Row>
                      <Colxx xxs="12">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.supperClub.looks.image" />
                        </Label>
                        <Row>
                          {looks.content &&
                            looks.content.map((element, index) => {
                              return (
                                <Colxx xxs="12" md="4">
                                  <div>
                                    <Button
                                      onClick={() => {
                                        openFileInput(`looksImage${index}`);
                                      }}
                                      className="icon-button"
                                      style={{ float: "right" }}
                                    >
                                      <i className="simple-icon-pencil" />
                                      <br></br>
                                      <input
                                        type="file"
                                        id={`looksImage${index}`}
                                        rclassName="d-none"
                                        onChange={(e) => changeImageLooks(e, index, "looks", looks)}
                                        style={{ display: "none" }}
                                      />
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        deleteLooks(index);
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
                                        large={looks.content[index] ? looks.content[index] : ""}
                                        thumb={looks.content[index] ? looks.content[index] : ""}
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
                                  openFileInput(`looksImage${looks.content ? looks.content.length : 0}`);
                                }}
                              >
                                <input
                                  type="file"
                                  id={`looksImage${looks.content ? looks.content.length : 0}`}
                                  rclassName="d-none"
                                  onChange={(e) => changeImageLooks(e, looks.content ? looks.content.length : 0, "looks", looks)}
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
              onClick={(e) => handleClickForSupperClub(e, "looks", looks)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.supperClub.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Behind The Scenes</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.behindScenes.title" />
                    </Label>
                    <Input type="text" name="title" value={behindScenes ? behindScenes.title : ""} onChange={handleBehindScenes} />
                    <Row>
                      <Colxx xxs="12">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.supperClub.behindScenes.image" />
                        </Label>
                        <Row>
                          {behindScenes.content &&
                            behindScenes.content.map((element, index) => {
                              return (
                                <Colxx xxs="12">
                                  <Row className="mt-4">
                                    <Colxx>Review - {index + 1}</Colxx>
                                    <Colxx>
                                      <Button
                                        onClick={() => {
                                          deleteBehindScenes(index);
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
                                    <IntlMessages id="bookExperience.supperClub.behindScenes.name" />
                                  </Label>
                                  <Input
                                    type="text"
                                    name="name"
                                    value={behindScenes.content[index].name ? behindScenes.content[index].name : ""}
                                    onChange={(e) => handleBehindScenes(e, index)}
                                  />
                                  <Label className="mt-4">
                                    <IntlMessages id="bookExperience.supperClub.behindScenes.location" />
                                  </Label>
                                  <Input
                                    type="text"
                                    name="location"
                                    value={behindScenes.content[index].location ? behindScenes.content[index].location : ""}
                                    onChange={(e) => handleBehindScenes(e, index)}
                                  />
                                  <div>
                                    <Button
                                      onClick={() => {
                                        openFileInput(`behindScenesImage${index}`);
                                      }}
                                      className="icon-button"
                                      style={{ float: "right" }}
                                    >
                                      <i className="simple-icon-pencil" />
                                      <br></br>
                                      <input
                                        type="file"
                                        id={`behindScenesImage${index}`}
                                        rclassName="d-none"
                                        onChange={(e) => changeImageBehindScenes(e, index, "behind_scenes", behindScenes)}
                                        style={{ display: "none" }}
                                      />
                                    </Button>
                                    <br></br>
                                    <Col md={4}>
                                      <SingleLightbox
                                        large={behindScenes.content ? behindScenes.content[index].image : ""}
                                        thumb={behindScenes.content ? behindScenes.content[index].image : ""}
                                        className="card-img-top"
                                      ></SingleLightbox>
                                    </Col>
                                  </div>
                                  <br></br>
                                </Colxx>
                              );
                            })}
                        </Row>
                      </Colxx>
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
                  onClick={(e) => handleClickForSupperClub(e, "behind_scenes", behindScenes)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.supperClub.update" />
                  </span>
                </Button>
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={(e) => setBehindScenesModalOpen(!behindScenesModalOpen)}
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
      <Modal
        fetchData={fetchBehindScenesData}
        modalOpen={behindScenesModalOpen}
        toggleModal={() => setBehindScenesModalOpen(!behindScenesModalOpen)}
        isImage={true}
        isDescription={false}
        title={"Behind the scene"}
        isBehindScene={true}
      />
      {/* <Row>
        <Col sm="12">
          <h4>Stay In The Know</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.stayKnow.title" />
                    </Label>
                    <Input type="text" name="title" value={stayKnow ? stayKnow.title : ""} onChange={handleStayKnow} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.stayKnow.link" />
                    </Label>
                    <Input type="text" name="link" value={stayKnow ? stayKnow.link : ""} onChange={handleStayKnow} />
                    <Row>
                      <Colxx xxs="12">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.supperClub.stayKnow.image" />
                        </Label>
                        <Row>
                          {stayKnow.images &&
                            stayKnow.images.map((element, index) => {
                              return (
                                <Colxx xxs="12" md="4">
                                  <div>
                                    <Button
                                      onClick={() => {
                                        openFileInput(`stayKnowImage${index}`);
                                      }}
                                      className="icon-button"
                                      style={{ float: "right" }}
                                    >
                                      <i className="simple-icon-pencil" />
                                      <br></br>
                                      <input
                                        type="file"
                                        id={`stayKnowImage${index}`}
                                        rclassName="d-none"
                                        onChange={(e) => changeImageStayKnow(e, index, "stay_know", stayKnow)}
                                        style={{ display: "none" }}
                                      />
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        deleteStayKnow(index);
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
                                        large={stayKnow.images[index] ? stayKnow.images[index] : ""}
                                        thumb={stayKnow.images[index] ? stayKnow.images[index] : ""}
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
                                  openFileInput(`stayKnowImage${stayKnow.images ? stayKnow.images.length : 0}`);
                                }}
                              >
                                <input
                                  type="file"
                                  id={`stayKnowImage${stayKnow.images ? stayKnow.images.length : 0}`}
                                  rclassName="d-none"
                                  onChange={(e) => changeImageStayKnow(e, stayKnow.images ? stayKnow.images.length : 0, "stay_know", stayKnow)}
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
              onClick={(e) => handleClickForSupperClub(e, "stay_know", stayKnow)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.supperClub.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row> */}
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
                      <IntlMessages id="bookExperience.supperClub.faq.title" />
                    </Label>
                    <Input type="text" name="title" value={faq.title ? faq.title : ""} onChange={handleFaq} />
                  </Colxx>
                </Row>
                <Row>
                  {faq.contents &&
                    faq.contents.map((element, index) => {
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
                            <IntlMessages id="bookExperience.supperClub.faq.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={faq.contents[index].title ? faq.contents[index].title : ""}
                            onChange={(e) => handleFaq(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.supperClub.faq.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={faq.contents[index].description ? faq.contents[index].description : ""}
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
                  onClick={(e) => handleClickForSupperClub(e, "faq", faq)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.supperClub.update" />
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
      <Modal fetchData={fetchFaqData} modalOpen={faqModalOpen} toggleModal={() => setFaqModalOpen(!faqModalOpen)} />
      {/* <Row>
        <Col sm="12">
          <h4>Supper Club Footer</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.supperFooter.title" />
                    </Label>
                    <Input type="text" name="title" value={supperFooter ? supperFooter.title : ""} onChange={handleSupperFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.supperClub.supperFooter.button" />
                    </Label>
                    <Input type="text" name="button" value={supperFooter ? supperFooter.button : ""} onChange={handleSupperFooter} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForSupperClub(e, "supper_footer", supperFooter)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.supperClub.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row> */}
    </React.Fragment>
  );
};
export default SupperClub;
