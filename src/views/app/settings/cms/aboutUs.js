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
  const [whoAreWe, setWhoAreWe] = useState({});
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
  const handleWhoAreWe = (e) => {
    let tempdata = { ...whoAreWe };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setWhoAreWe(tempdata);
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
    let tempdata = { ...positions.content[contentIndex].positions[x] };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    allData.content[contentIndex].positions[x] = tempdata;
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
      await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, newfomdata);
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

  const changeImageWhoAreWe = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["gallery"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setWhoAreWe({ ...formdata });
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
      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
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
    let info = { name: data.title };
    let allData = positions;
    allData.content ? allData.content.push(info) : (allData.content = [info]);
    setPositions(allData);
  };
  const fetchPositionDetailsData = (data, index) => {
    let allData = positions;
    let newData = positions.content[index] ?? [];
    newData.positions ? newData.positions.push(data) : (newData.positions = [data]);
    allData.content[index] = newData;
    setPositions(allData);
  };
  const deleteHeader = (index) => {
    let allData = header;
    const result = header.images.filter((element, i) => i != index);
    allData.images = result;
    setHeader({ ...allData });
  };
  const deleteWhoAreWe = (index) => {
    let allData = whoAreWe;
    const result = whoAreWe.gallery.filter((element, i) => i != index);
    allData.gallery = result;
    setWhoAreWe({ ...allData });
  };
  const deletePosition = (index) => {
    let allData = positions;
    const result = positions.content.filter((element, i) => i != index);
    allData.content = result;
    setPositions({ ...allData });
  };
  const deletePositionRole = (index, innerIndex) => {
    let allData = positions;
    const result = positions.content[index].positions.filter((element, i) => i != innerIndex);
    allData.content[index].positions = result;
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
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.ABOUT_US);
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
      ele.details.type = ele.type;
      all[ele.section] = ele;
    });
    setHeader(all.header.details);
    setDining(all.dining.details);
    setMission(all.mission.details);
    setValues(all.values.details);
    setWhoAreWe(all.who_we_are.details);
    setMeetTeam(all.meet_team.details);
    setAboutFooter(all.about_footer.details);
    setOurTeam(all.our_team.details);
    setPositions(all.positions.details);
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
                  </Colxx>
                </Row>
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
                              onChange={(e) => changeImageDining(e, "icon", "dining", dining, 0)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={dining && dining.content ? dining.content[0].icon : ""}
                              thumb={dining && dining.content ? dining.content[0].icon : ""}
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
                              onChange={(e) => changeImageDining(e, "icon", "dining", dining, 1)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={dining && dining.content ? dining.content[1].icon : ""}
                              thumb={dining && dining.content ? dining.content[1].icon : ""}
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
                              onChange={(e) => changeImageDining(e, "icon", "dining", dining, 2)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={dining && dining.content ? dining.content[2].icon : ""}
                              thumb={dining && dining.content ? dining.content[2].icon : ""}
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
                        <Input type="text" name="text" value={dining.content ? dining.content[0].text : ""} onChange={(e) => handleDining(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.aboutUs.dining.content[1].title" />
                        </Label>
                        <Input type="text" name="text" value={dining.content ? dining.content[1].text : ""} onChange={(e) => handleDining(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.aboutUs.dining.content[2].title" />
                        </Label>
                        <Input type="text" name="text" value={dining.content ? dining.content[2].text : ""} onChange={(e) => handleDining(e, 2)} />
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
          <h4>Who are we</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.whoAreWe.title" />
                    </Label>
                    <Input type="text" name="title" value={whoAreWe.title ? whoAreWe.title : ""} onChange={handleWhoAreWe} />
                  </Colxx>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.whoAreWe.description" />
                    </Label>
                    <Input type="textarea" name="description" value={whoAreWe.description ? whoAreWe.description : ""} onChange={handleWhoAreWe} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.news.image" />
                    </Label>
                  </Colxx>
                  {whoAreWe.gallery &&
                    whoAreWe.gallery.map((element, index) => {
                      return (
                        <Colxx xxs="12" md="4">
                          <div>
                            <Button
                              onClick={() => {
                                openFileInput(`aboutUsWhoAreWeImage${index}`);
                              }}
                              className="icon-button"
                              style={{ float: "right" }}
                            >
                              <i className="simple-icon-pencil" />
                              <br></br>
                              <input
                                type="file"
                                id={`aboutUsWhoAreWeImage${index}`}
                                rclassName="d-none"
                                onChange={(e) => changeImageWhoAreWe(e, index, "who_we_are", whoAreWe)}
                                style={{ display: "none" }}
                              />
                            </Button>
                            <Button
                              onClick={() => {
                                deleteWhoAreWe(index);
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
                                large={whoAreWe.gallery[index] ? whoAreWe.gallery[index] : ""}
                                thumb={whoAreWe.gallery[index] ? whoAreWe.gallery[index] : ""}
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
                      openFileInput(`aboutUsWhoAreWeImage${whoAreWe.gallery ? whoAreWe.gallery.length : 0}`);
                    }}
                  >
                    <input
                      type="file"
                      id={`aboutUsWhoAreWeImage${whoAreWe.gallery ? whoAreWe.gallery.length : 0}`}
                      rclassName="d-none"
                      onChange={(e) => changeImageWhoAreWe(e, whoAreWe.gallery ? whoAreWe.gallery.length : 0, "who_we_are", whoAreWe)}
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
              onClick={(e) => handleClickForAboutUs(e, "who_we_are", whoAreWe)}
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
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.meetTeam.description" />
                    </Label>
                    <Input type="textarea" name="description" value={meetTeam.description ? meetTeam.description : ""} onChange={handleMeetTeam} />
                  </Colxx>
                  <Colxx xxs="12" md="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.meetTeam.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("aboutUsMeetTeamImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="aboutUsMeetTeamImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageMeetTeam(e, "image", "meet_team", meetTeam)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={meetTeam.image ? meetTeam.image : ""}
                          thumb={meetTeam.image ? meetTeam.image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                </Row>
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
                {ourTeam.content &&
                  ourTeam.content.map((data, index) => {
                    return (
                      <Row>
                        <Colxx xxs="12">
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.aboutUs.ourTeam.content.image" />
                          </Label>
                          <div>
                            <Button
                              onClick={() => {
                                openFileInput(`ourTeamImage${index}`);
                              }}
                              className="icon-button"
                              style={{ float: "right" }}
                            >
                              <i className="simple-icon-pencil" />
                              <br></br>
                              <input
                                type="file"
                                id={`ourTeamImage${index}`}
                                rclassName="d-none"
                                onChange={(e) => changeImageOurTeam(e, "image", "our_team", ourTeam, index)}
                                style={{ display: "none" }}
                              />
                            </Button>
                            <br></br>
                            <Col md={4}>
                              <SingleLightbox
                                large={ourTeam && ourTeam.content ? ourTeam.content[index].image : ""}
                                thumb={ourTeam && ourTeam.content ? ourTeam.content[index].image : ""}
                                className="card-img-top"
                              ></SingleLightbox>
                            </Col>
                          </div>
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.aboutUs.ourTeam.content.name" />
                          </Label>
                          <Input type="text" name="name" value={ourTeam.content ? ourTeam.content[index].name : ""} onChange={(e) => handleOurTeam(e, index)} />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.aboutUs.ourTeam.content.position" />
                          </Label>
                          <Input
                            type="text"
                            name="position"
                            value={ourTeam.content ? ourTeam.content[index].position : ""}
                            onChange={(e) => handleOurTeam(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.aboutUs.ourTeam.content.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={ourTeam.content ? ourTeam.content[index].description : ""}
                            onChange={(e) => handleOurTeam(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.aboutUs.ourTeam.content.instagram" />
                          </Label>
                          <Input
                            type="textarea"
                            name="instagram"
                            value={ourTeam.content ? ourTeam.content[index].instagram : ""}
                            onChange={(e) => handleOurTeam(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.aboutUs.ourTeam.content.facebook" />
                          </Label>
                          <Input
                            type="textarea"
                            name="facebook"
                            value={ourTeam.content ? ourTeam.content[index].facebook : ""}
                            onChange={(e) => handleOurTeam(e, index)}
                          />
                        </Colxx>
                      </Row>
                    );
                  })}
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
                            name="name"
                            value={positions.content[index].name ? positions.content[index].name : ""}
                            onChange={(e) => handlePosition(e, index)}
                          />
                          {positions.content[index] &&
                            positions.content[index].positions &&
                            positions.content[index].positions.map((element, innerIndex) => {
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
                                    value={positions.content[index].positions[innerIndex].title ? positions.content[index].positions[innerIndex].title : ""}
                                    onChange={(e) => handlePositionDetails(e, index, innerIndex)}
                                  />
                                  <Label className="mt-2">
                                    <IntlMessages id="bookExperience.aboutUs.positions.roleDescription" />
                                  </Label>
                                  <Input
                                    type="textarea"
                                    name="description"
                                    value={
                                      positions.content[index].positions[innerIndex].description
                                        ? positions.content[index].positions[innerIndex].description
                                        : ""
                                    }
                                    onChange={(e) => handlePositionDetails(e, index, innerIndex)}
                                  />
                                  <Label className="mt-2">
                                    <IntlMessages id="bookExperience.aboutUs.positions.location" />
                                  </Label>
                                  <Input
                                    type="text"
                                    name="location"
                                    value={
                                      positions.content[index].positions[innerIndex].location ? positions.content[index].positions[innerIndex].location : ""
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
        isLocation={true}
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
                    <Input type="text" name="button_text" value={aboutFooter.button_text ? aboutFooter.button_text : ""} onChange={handleAboutFooter} />
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
