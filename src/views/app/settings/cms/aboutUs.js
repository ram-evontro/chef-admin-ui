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
import * as axiosURLS from "helpers/endpoints";
import fileapi from "helpers/fileupload";
import SingleLightbox from "components/pages/SingleLightbox";
import { NotificationManager } from "components/common/react-notifications";
import Modal from "./Modal/AddModal";

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState({});
  const [dining, setDining] = useState({});
  const [mission, setMission] = useState({});
  const [values, setValues] = useState({});
  const [news, setNews] = useState({});
  const [meetTeam, setMeetTeam] = useState({});
  const [ourTeam, setOurTeam] = useState({});
  const [aboutFooter, setAboutFooter] = useState({});
  const [positions, setPositions] = useState({});
  const [positionTitleModalOpen, setPositionTitleModalOpen] = useState(false);
  const [positionDetailsModalOpen, setPositionDetailsModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { upload } = fileapi();

  const handleHeader = (e, x = -1) => {
    let tempdata = { ...header };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[name] = val;
    } else {
      tempdata[name] = val;
    }
    setHeader(tempdata);
  };
  const handleDining = (e, x = -1) => {
    let tempdata = { ...dining };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setDining(tempdata);
  };
  const handleMission = (e, x = -1) => {
    let tempdata = { ...mission };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setMission(tempdata);
  };
  const handleValues = (e, x = -1) => {
    let tempdata = { ...values };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setValues(tempdata);
  };
  const handleNews = (e, x = -1) => {
    let tempdata = { ...news };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setNews(tempdata);
  };
  const handleMeetTeam = (e, x = -1) => {
    let tempdata = { ...meetTeam };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setMeetTeam(tempdata);
  };
  const handleOurTeam = (e, x = -1) => {
    let tempdata = { ...ourTeam };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setOurTeam(tempdata);
  };
  const handlePositions = (e, x = -1) => {
    let tempdata = { ...positions };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[name] = val;
    } else {
      tempdata[name] = val;
    }
    setPositions(tempdata);
  };
  const handlePosition = (e, x) => {
    let allData = { ...positions };
    let tempdata = { ...positions.content[x] };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    allData.content[x] = tempdata;
    setPositions(allData);
  };
  const handlePositionDetails = (e, contentIndex, x) => {
    let allData = { ...positions };
    let tempdata = { ...positions.content[contentIndex].content[x] };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    allData.content[contentIndex].content[x] = tempdata;
    setPositions(allData);
  };
  const handleAboutFooter = (e, x = -1) => {
    let tempdata = { ...aboutFooter };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setAboutFooter(tempdata);
  };

  const handleClickForAboutUs = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      // await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, newfomdata);
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
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
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
  const changeImageNews = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["images"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setNews({ ...formdata });
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
  const changeImageMeetTeam = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["images"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setMeetTeam({ ...formdata });
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
  const changeImageDining = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setDining({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageMission = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setMission({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageValues = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setValues({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageOurTeam = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setOurTeam({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const fetchPositionTitleData = (data) => {
    let allData = positions;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setPositions(allData);
  };
  const fetchPositionDetailsData = (data, index) => {
    let allData = positions;
    let newData = positions.content[index] ?? [];
    newData.content ? newData.content.push(data) : (newData.content = [data]);
    allData.content[index] = newData;
    setPositions(allData);
  };
  const deleteHeader = (index) => {
    let allData = header;
    const result = header.images.filter((element, i) => i != index);
    allData.images = result;
    setHeader({ ...allData });
  };
  const deleteNews = (index) => {
    let allData = news;
    const result = news.images.filter((element, i) => i != index);
    allData.images = result;
    setNews({ ...allData });
  };
  const deletePosition = (index) => {
    let allData = positions;
    const result = positions.content.filter((element, i) => i != index);
    allData.content = result;
    setPositions({ ...allData });
  };
  const deletePositionRole = (index, innerIndex) => {
    let allData = positions;
    const result = positions.content[index].content.filter((element, i) => i != innerIndex);
    allData.content[index].content = result;
    setPositions({ ...allData });
  };
  const deleteMeetTeam = (index) => {
    let allData = meetTeam;
    const result = meetTeam.images.filter((element, i) => i != index);
    allData.images = result;
    setMeetTeam({ ...allData });
  };
  const openFileInput = (image) => {
    document.getElementById(image).click();
  };

  useEffect(async () => {
    setLoading(true);
    try {
      // let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.ABOUT_US);
      // setAllData(data.about_us);
      // valueSetter(data);
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
    setHeader(data.about_us ? data.about_us.header : { images: [] });
    setDining(data.about_us ? data.about_us.dining : { content: [{ title: "title1" }, { title: "title2" }, { title: "title3" }] });
    setMission(data.about_us ? data.about_us.mission : {});
    setValues(data.about_us ? data.about_us.values : {});
    setNews(data.about_us ? data.about_us.news : { images: [] });
    setMeetTeam(data.about_us ? data.about_us.meet_team : { images: [] });
    setAboutFooter(data.about_us ? data.about_us.about_footer : {});
    setOurTeam(data.about_us ? data.about_us.our_team : { content: [{ title: "title1" }, { title: "title2" }] });
    setPositions(data.about_us ? data.about_us.positions : {});
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
                      <IntlMessages id="bookExperience.aboutUs.header.title" />
                    </Label>
                    <Input type="text" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.header.description" />
                    </Label>
                    <Input type="textarea" name="description" value={header.description ? header.description : ""} onChange={handleHeader} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.header.image" />
                    </Label>
                  </Colxx>
                  {header.images &&
                    header.images.map((element, index) => {
                      return (
                        <Colxx xxs="12" md="4">
                          <div>
                            <Button
                              onClick={() => {
                                openFileInput(`aboutUsHeaderImage${index}`);
                              }}
                              className="icon-button"
                              style={{ float: "right" }}
                            >
                              <i className="simple-icon-pencil" />
                              <br></br>
                              <input
                                type="file"
                                id={`aboutUsHeaderImage${index}`}
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
                <center>
                  <Button
                    color="primary"
                    className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                    onClick={() => {
                      openFileInput(`aboutUsHeaderImage${header.images ? header.images.length : 0}`);
                    }}
                  >
                    <input
                      type="file"
                      id={`aboutUsHeaderImage${header.images ? header.images.length : 0}`}
                      rclassName="d-none"
                      onChange={(e) => changeImageHeader(e, header.images ? header.images.length : 0, "header", header)}
                      style={{ display: "none" }}
                    />
                    <span className="label">
                      <IntlMessages id="bookExperience.addNew" />
                    </span>
                  </Button>
                </center>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 mr-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "header", header)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Conscious Dining</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.dining.title" />
                    </Label>
                    <Input type="text" name="title" value={dining.title ? dining.title : ""} onChange={handleDining} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.dining.description" />
                    </Label>
                    <Input type="textarea" name="description" value={dining.description ? dining.description : ""} onChange={handleDining} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.dining.image" />
                    </Label>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("diningImage0");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="diningImage0"
                              rclassName="d-none"
                              onChange={(e) => changeImageDining(e, "image", "dining", dining, 0)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={dining && dining.content ? dining.content[0].image : ""}
                              thumb={dining && dining.content ? dining.content[0].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("diningImage1");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="diningImage1"
                              rclassName="d-none"
                              onChange={(e) => changeImageDining(e, "image", "dining", dining, 1)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={dining && dining.content ? dining.content[1].image : ""}
                              thumb={dining && dining.content ? dining.content[1].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("diningImage2");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="diningImage2"
                              rclassName="d-none"
                              onChange={(e) => changeImageDining(e, "image", "dining", dining, 2)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={dining && dining.content ? dining.content[2].image : ""}
                              thumb={dining && dining.content ? dining.content[2].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.aboutUs.dining.content[0].title" />
                        </Label>
                        <Input type="text" name="title" value={dining.content ? dining.content[0].title : ""} onChange={(e) => handleDining(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.aboutUs.dining.content[1].title" />
                        </Label>
                        <Input type="text" name="title" value={dining.content ? dining.content[1].title : ""} onChange={(e) => handleDining(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.aboutUs.dining.content[2].title" />
                        </Label>
                        <Input type="text" name="title" value={dining.content ? dining.content[2].title : ""} onChange={(e) => handleDining(e, 2)} />
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
              onClick={(e) => handleClickForAboutUs(e, "dining", dining)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Our Mission</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("aboutUs MissionImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="aboutUs MissionImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageMission(e, "image", "mission", mission)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={mission.image ? mission.image : ""}
                          thumb={mission.image ? mission.image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.title" />
                    </Label>

                    <Input type="text" name="title" value={mission.title ? mission.title : ""} onChange={handleMission} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.description" />
                    </Label>
                    <Input type="textarea" name="description" value={mission.description ? mission.description : ""} onChange={handleMission} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "mission", mission)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Our Values</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.values.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("aboutUs ValuesImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="aboutUs ValuesImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageValues(e, "image", "values", values)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={values.image ? values.image : ""}
                          thumb={values.image ? values.image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.values.title" />
                    </Label>

                    <Input type="text" name="title" value={values.title ? values.title : ""} onChange={handleValues} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.values.description" />
                    </Label>
                    <Input type="textarea" name="description" value={values.description ? values.description : ""} onChange={handleValues} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "values", values)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>News About Us</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.news.title" />
                    </Label>
                    <Input type="text" name="title" value={news.title ? news.title : ""} onChange={handleNews} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.news.image" />
                    </Label>
                  </Colxx>
                  {news.images &&
                    news.images.map((element, index) => {
                      return (
                        <Colxx xxs="12" md="4">
                          <div>
                            <Button
                              onClick={() => {
                                openFileInput(`aboutUsNewsImage${index}`);
                              }}
                              className="icon-button"
                              style={{ float: "right" }}
                            >
                              <i className="simple-icon-pencil" />
                              <br></br>
                              <input
                                type="file"
                                id={`aboutUsNewsImage${index}`}
                                rclassName="d-none"
                                onChange={(e) => changeImageNews(e, index, "news", news)}
                                style={{ display: "none" }}
                              />
                            </Button>
                            <Button
                              onClick={() => {
                                deleteNews(index);
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
                                large={news.images[index] ? news.images[index] : ""}
                                thumb={news.images[index] ? news.images[index] : ""}
                                className="card-img-top"
                              ></SingleLightbox>
                            </Col>
                          </div>
                        </Colxx>
                      );
                    })}
                </Row>
                <center>
                  <Button
                    color="primary"
                    className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                    onClick={() => {
                      openFileInput(`aboutUsNewsImage${news.images ? news.images.length : 0}`);
                    }}
                  >
                    <input
                      type="file"
                      id={`aboutUsNewsImage${news.images ? news.images.length : 0}`}
                      rclassName="d-none"
                      onChange={(e) => changeImageNews(e, news.images ? news.images.length : 0, "news", news)}
                      style={{ display: "none" }}
                    />
                    <span className="label">
                      <IntlMessages id="bookExperience.addNew" />
                    </span>
                  </Button>
                </center>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "news", news)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Meet Our Team</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.meetTeam.title" />
                    </Label>
                    <Input type="text" name="title" value={meetTeam.title ? meetTeam.title : ""} onChange={handleMeetTeam} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.meetTeam.image" />
                    </Label>
                  </Colxx>
                  {meetTeam.images &&
                    meetTeam.images.map((element, index) => {
                      return (
                        <Colxx xxs="12" md="4">
                          <div>
                            <Button
                              onClick={() => {
                                openFileInput(`aboutUsMeetTeamImage${index}`);
                              }}
                              className="icon-button"
                              style={{ float: "right" }}
                            >
                              <i className="simple-icon-pencil" />
                              <br></br>
                              <input
                                type="file"
                                id={`aboutUsMeetTeamImage${index}`}
                                rclassName="d-none"
                                onChange={(e) => changeImageMeetTeam(e, index, "meet_team", meetTeam)}
                                style={{ display: "none" }}
                              />
                            </Button>
                            <Button
                              onClick={() => {
                                deleteMeetTeam(index);
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
                                large={meetTeam.images[index] ? meetTeam.images[index] : ""}
                                thumb={meetTeam.images[index] ? meetTeam.images[index] : ""}
                                className="card-img-top"
                              ></SingleLightbox>
                            </Col>
                          </div>
                        </Colxx>
                      );
                    })}
                </Row>
                <center>
                  <Button
                    color="primary"
                    className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                    onClick={() => {
                      openFileInput(`aboutUsMeetTeamImage${meetTeam.images ? meetTeam.images.length : 0}`);
                    }}
                  >
                    <input
                      type="file"
                      id={`aboutUsMeetTeamImage${meetTeam.images ? meetTeam.images.length : 0}`}
                      rclassName="d-none"
                      onChange={(e) => changeImageMeetTeam(e, meetTeam.images ? meetTeam.images.length : 0, "meet_team", meetTeam)}
                      style={{ display: "none" }}
                    />
                    <span className="label">
                      <IntlMessages id="bookExperience.addNew" />
                    </span>
                  </Button>
                </center>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "meet_team", meetTeam)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Our Team</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[0]" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ourTeamImage0");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ourTeamImage0"
                          rclassName="d-none"
                          onChange={(e) => changeImageOurTeam(e, "image", "our_team", ourTeam, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={ourTeam && ourTeam.content ? ourTeam.content[0].image : ""}
                          thumb={ourTeam && ourTeam.content ? ourTeam.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={ourTeam.content ? ourTeam.content[0].title : ""} onChange={(e) => handleOurTeam(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[0].designation" />
                    </Label>
                    <Input type="text" name="designation" value={ourTeam.content ? ourTeam.content[0].designation : ""} onChange={(e) => handleOurTeam(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={ourTeam.content ? ourTeam.content[0].description : ""}
                      onChange={(e) => handleOurTeam(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[0].instagram" />
                    </Label>
                    <Input type="textarea" name="instagram" value={ourTeam.content ? ourTeam.content[0].instagram : ""} onChange={(e) => handleOurTeam(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[0].linkedin" />
                    </Label>
                    <Input type="textarea" name="linkedin" value={ourTeam.content ? ourTeam.content[0].linkedin : ""} onChange={(e) => handleOurTeam(e, 0)} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[1]" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("ourTeamImage1");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="ourTeamImage1"
                          rclassName="d-none"
                          onChange={(e) => changeImageOurTeam(e, "image", "our_team", ourTeam, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={ourTeam && ourTeam.content ? ourTeam.content[1].image : ""}
                          thumb={ourTeam && ourTeam.content ? ourTeam.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={ourTeam.content ? ourTeam.content[1].title : ""} onChange={(e) => handleOurTeam(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[1].designation" />
                    </Label>
                    <Input type="text" name="designation" value={ourTeam.content ? ourTeam.content[1].designation : ""} onChange={(e) => handleOurTeam(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={ourTeam.content ? ourTeam.content[1].description : ""}
                      onChange={(e) => handleOurTeam(e, 1)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[1].instagram" />
                    </Label>
                    <Input type="textarea" name="instagram" value={ourTeam.content ? ourTeam.content[1].instagram : ""} onChange={(e) => handleOurTeam(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.ourTeam.content[1].linkedin" />
                    </Label>
                    <Input type="textarea" name="linkedin" value={ourTeam.content ? ourTeam.content[1].linkedin : ""} onChange={(e) => handleOurTeam(e, 1)} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "our_team", ourTeam)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Open Positions</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.positions.title" />
                    </Label>
                    <Input type="text" name="title" value={positions.title ? positions.title : ""} onChange={handlePositions} />
                  </Colxx>
                </Row>
                {positions.content &&
                  positions.content.map((element, index) => {
                    return (
                      <Row>
                        <Colxx className="mt-4">Position Category - {index + 1}</Colxx>
                        <Colxx className="mt-4">
                          <Button
                            onClick={() => {
                              deletePosition(index);
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-trash" />
                          </Button>
                          <br></br>
                          <br></br>
                        </Colxx>
                        <Colxx xxs="12">
                          <Input
                            type="text"
                            name="title"
                            value={positions.content[index].title ? positions.content[index].title : ""}
                            onChange={(e) => handlePosition(e, index)}
                          />
                          {positions.content[index] &&
                            positions.content[index].content &&
                            positions.content[index].content.map((element, innerIndex) => {
                              return (
                                <Colxx>
                                  <Row className="mt-4">
                                    <Colxx>Role - {innerIndex + 1}</Colxx>
                                    <Colxx>
                                      <Button
                                        onClick={() => {
                                          deletePositionRole(index, innerIndex);
                                        }}
                                        className="icon-button"
                                        style={{ float: "right" }}
                                      >
                                        <i className="simple-icon-trash" />
                                      </Button>
                                    </Colxx>
                                  </Row>
                                  <Label className="mt-2">
                                    <IntlMessages id="bookExperience.aboutUs.positions.roleTitle" />
                                  </Label>
                                  <Input
                                    type="text"
                                    name="title"
                                    value={positions.content[index].content[innerIndex].title ? positions.content[index].content[innerIndex].title : ""}
                                    onChange={(e) => handlePositionDetails(e, index, innerIndex)}
                                  />
                                  <Label className="mt-2">
                                    <IntlMessages id="bookExperience.aboutUs.positions.roleDescription" />
                                  </Label>
                                  <Input
                                    type="textarea"
                                    name="description"
                                    value={
                                      positions.content[index].content[innerIndex].description ? positions.content[index].content[innerIndex].description : ""
                                    }
                                    onChange={(e) => handlePositionDetails(e, index, innerIndex)}
                                  />
                                </Colxx>
                              );
                            })}
                        </Colxx>
                        <Colxx>
                          <center>
                            <Button
                              color="primary"
                              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                              onClick={() => {
                                setPositionDetailsModalOpen(!positionDetailsModalOpen);
                                setIndex(index);
                              }}
                            >
                              <span className="label">
                                <IntlMessages id="bookExperience.addNewPosition" />
                              </span>
                            </Button>
                          </center>
                        </Colxx>
                      </Row>
                    );
                  })}
                <center>
                  <Button
                    color="primary"
                    className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                    onClick={() => {
                      setPositionTitleModalOpen(!positionTitleModalOpen);
                    }}
                  >
                    <span className="label">
                      <IntlMessages id="bookExperience.addNewPositionTitle" />
                    </span>
                  </Button>
                </center>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "positions", positions)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Modal
        fetchData={fetchPositionDetailsData}
        modalOpen={positionDetailsModalOpen}
        toggleModal={() => setPositionDetailsModalOpen(!positionDetailsModalOpen)}
        isDescription={true}
        index={index}
        title={"Role"}
      />
      <Modal
        fetchData={fetchPositionTitleData}
        modalOpen={positionTitleModalOpen}
        toggleModal={() => setPositionTitleModalOpen(!positionTitleModalOpen)}
        isDescription={false}
        title={"Category"}
      />
      <Row>
        <Col sm="12">
          <h4>About Us Footer</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.aboutFooter.title" />
                    </Label>
                    <Input type="text" name="title" value={aboutFooter.title ? aboutFooter.title : ""} onChange={handleAboutFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.aboutFooter.description" />
                    </Label>
                    <Input type="textarea" name="description" value={aboutFooter.description ? aboutFooter.description : ""} onChange={handleAboutFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.aboutFooter.button" />
                    </Label>
                    <Input type="text" name="button" value={aboutFooter.button ? aboutFooter.button : ""} onChange={handleAboutFooter} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "about_footer", aboutFooter)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.aboutUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default AboutUs;
