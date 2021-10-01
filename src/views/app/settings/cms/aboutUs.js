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

const AboutUs = () => {
  const [header, setHeader] = useState({});
  const [team, setTeam] = useState({});
  const [mission, setMission] = useState({});
  const [newsletter, setNewsletter] = useState({});
  const [founder, setFounder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [allData, setAllData] = useState({});
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

  const handleTeam = (e, x = -1) => {
    let tempdata = { ...team };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setTeam(tempdata);
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
  const handleNewsLetter = (e) => {
    let tempdata = { ...newsletter };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setNewsletter(tempdata);
  };

  const handleFounder = (e) => {
    let tempdata = { ...founder };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFounder(tempdata);
  };

  const handleClickForAboutUs = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    console.log(newfomdata);
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
  const changeImageHeader = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
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
  const changeImageFounder = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setFounder({ ...formdata });

      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageTeam = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.ABOUT_US, form);
      setTeam({ ...formdata });
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
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.ABOUT_US);
      setAllData(data.about_us);
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
    setHeader(data.about_us.header);
    setTeam(data.about_us.team);
    setMission(data.about_us.mission);
    setNewsletter(data.about_us.newsletter);
    setFounder(data.about_us.founder);
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
                      <IntlMessages id="bookExperience.aboutUs.header.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("aboutUs headerImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="aboutUs headerImage"
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
                      <IntlMessages id="bookExperience.aboutUs.header.title" />
                    </Label>
                    <Input type="text" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.header.content" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.header.content.title" />
                    </Label>
                    <Input type="text" name="title" value={header.content ? header.content.title : ""} onChange={(e) => handleHeader(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.header.content.description" />
                    </Label>
                    <Input type="textarea" name="description" value={header.content ? header.content.description : ""} onChange={(e) => handleHeader(e, 1)} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
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
          <h4>Team</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  {team.content &&
                    team.content.map((item, index) => {
                      return (
                        <Colxx xxs="12">
                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}]`} />
                          </Label>
                          <br></br>
                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}].name`} />
                          </Label>
                          <Input type="text" name="name" value={item.name} onChange={(e) => handleTeam(e, index)} />
                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}].picture`} />
                          </Label>
                          <div>
                            <Button
                              onClick={() => {
                                openFileInput(`Team Image[${index}]`);
                              }}
                              className="icon-button"
                              style={{ float: "right" }}
                            >
                              <i className="simple-icon-pencil" />
                              <br></br>
                              <input
                                type="file"
                                id={`Team Image[${index}]`}
                                rclassName="d-none"
                                onChange={(e) => changeImageTeam(e, "picture", "team", team, index)}
                                style={{ display: "none" }}
                              />
                            </Button>
                            <br></br>
                            <Col md={4}>
                              <SingleLightbox
                                large={team.content ? team.content[index].picture : ""}
                                thumb={team.content ? team.content[index].picture : ""}
                                className="card-img-top"
                              ></SingleLightbox>
                            </Col>
                          </div>
                          <br></br>
                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}].intro`} />
                          </Label>
                          <Input type="textarea" name="intro" value={item.intro} onChange={(e) => handleTeam(e, index)} />
                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}].website`} />
                          </Label>
                          <Input type="text" name="website" value={item.website} onChange={(e) => handleTeam(e, index)} />

                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}].facebook`} />
                          </Label>
                          <Input type="text" name="facebook" value={item.facebook} onChange={(e) => handleTeam(e, index)} />
                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}].instagram`} />
                          </Label>
                          <Input type="text" name="instagram" value={item.instagram} onChange={(e) => handleTeam(e, index)} />
                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}].twitter`} />
                          </Label>
                          <Input type="text" name="twitter" value={item.twitter} onChange={(e) => handleTeam(e, index)} />
                          <Label className="mt-4">
                            <IntlMessages id={`bookExperience.aboutUs.content[${index}].post`} />
                          </Label>
                          <Input type="text" name="post" value={item.post} onChange={(e) => handleTeam(e, index)} />
                        </Colxx>
                      );
                    })}
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "team", team)}
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
          <h4>Mission</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.content[0]" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={mission.content ? mission.content[0].title : ""} onChange={(e) => handleMission(e, 0)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.content[0].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={mission.content ? mission.content[0].description : ""}
                      onChange={(e) => handleMission(e, 0)}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.content[1]" />
                    </Label>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={mission.content ? mission.content[1].title : ""} onChange={(e) => handleMission(e, 1)} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.mission.content[1].description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={mission.content ? mission.content[1].description : ""}
                      onChange={(e) => handleMission(e, 1)}
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
          <h4>Founder</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.title`} />
                    </Label>
                    <Input type="text" name="title" value={founder ? founder.title : ""} onChange={handleFounder} />
                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.name`} />
                    </Label>
                    <Input type="text" name="name" value={founder ? founder.name : ""} onChange={handleFounder} />
                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.picture`} />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("aboutUs FounderImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="aboutUs FounderImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageFounder(e, "picture", "founder", founder)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox large={founder ? founder.picture : ""} thumb={founder ? founder.picture : ""} className="card-img-top"></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.intro`} />
                    </Label>
                    <Input type="textarea" name="intro" value={founder ? founder.intro : ""} onChange={handleFounder} />
                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.website`} />
                    </Label>
                    <Input type="text" name="website" value={founder ? founder.website : ""} onChange={handleFounder} />

                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.facebook`} />
                    </Label>
                    <Input type="text" name="facebook" value={founder ? founder.facebook : ""} onChange={handleFounder} />
                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.instagram`} />
                    </Label>
                    <Input type="text" name="instagram" value={founder ? founder.instagram : ""} onChange={handleFounder} />
                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.twitter`} />
                    </Label>
                    <Input type="text" name="twitter" value={founder ? founder.twitter : ""} onChange={handleFounder} />
                    <Label className="mt-4">
                      <IntlMessages id={`bookExperience.aboutUs.founder.post`} />
                    </Label>
                    <Input type="text" name="post" value={founder ? founder.post : ""} onChange={handleFounder} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForAboutUs(e, "founder", founder)}
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
          <h4>Newsletter</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.newsletter.title" />
                    </Label>
                    <Input type="text" name="title" value={newsletter ? newsletter.title : ""} onChange={handleNewsLetter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.aboutUs.newsletter.description" />
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
              onClick={(e) => handleClickForAboutUs(e, "newsletter", newsletter)}
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
