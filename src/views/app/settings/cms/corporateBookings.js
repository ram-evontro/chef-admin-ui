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
const CorporateBookings = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState({});
  const [joinMember, setJoinMember] = useState({});
  const [bookedUs, setBookedUs] = useState({});
  const [contactUs, setContactUs] = useState({});
  const [corporateBookingsFooter, setCorporateBookingsFooter] = useState({});
  const [faq, setFaq] = useState({});
  const [faqModalOpen, setFaqModalOpen] = useState(false);
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
  const handleJoinMember = (e, x = -1) => {
    let tempdata = { ...joinMember };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setJoinMember(tempdata);
  };
  const handleBookedUs = (e, x = -1) => {
    let tempdata = { ...bookedUs };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setBookedUs(tempdata);
  };
  const handleContactUs = (e, x = -1) => {
    let tempdata = { ...contactUs };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setContactUs(tempdata);
  };
  const handleCorporateBookingsFooter = (e, x = -1) => {
    let tempdata = { ...corporateBookingsFooter };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setCorporateBookingsFooter(tempdata);
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
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.CORPORATE_BOOKINGS, form);
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
  const changeImageBookedUs = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["images"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.CORPORATE_BOOKINGS, form);
      setBookedUs({ ...formdata });
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
  const changeImageCorporateFooter= async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.CORPORATE_BOOKINGS, form);
      setCorporateBookingsFooter({ ...formdata });
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
  const handleClickForCorporateBookings = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.CORPORATE_BOOKINGS, newfomdata);
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
  const deleteHeader = (index) => {
    let allData = header;
    const result = header.images.filter((element, i) => i != index);
    allData.images = result;
    setHeader({ ...allData });
  };
  const deleteBookedUs = (index) => {
    let allData = bookedUs;
    const result = bookedUs.images.filter((element, i) => i != index);
    allData.images = result;
    setBookedUs({ ...allData });
  };
  const deleteFaq = (index) => {
    let allData = faq;
    const result = faq.content.filter((element, i) => i != index);
    allData.content = result;
    setFaq({ ...allData });
  };

  const openFileInput = (image) => {
    document.getElementById(image).click();
  };
  useEffect(async () => {
    setLoading(true);
    try {
      //   let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.CORPORATE_BOOKINGS);
      // valueSetter(data.corporate_bookings);
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
    setHeader(data.corporate_bookings ? data.corporate_bookings.header : { images: [] });
    setJoinMember(data.corporate_bookings ? data.corporate_bookings.join_member : { content: [{ title: "title1" }, { title: "title2" }, { title: "title3" }] });
    setBookedUs(data.corporate_bookings ? data.corporate_bookings.booked_us : { images: [] });
    setContactUs(data.corporate_bookings ? data.corporate_bookings.contact_us : { content: [{ title: "title1" }, { title: "title2" }] });
    setCorporateBookingsFooter(data.corporate_bookings ? data.corporate_bookings.corporate_bookings_footer : {});
    setFaq(data.corporate_bookings ? data.corporate_bookings.faq : {});
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
                      <IntlMessages id="bookExperience.corporateBookings.header.image" />
                    </Label>
                    <Row>
                      {header.images &&
                        header.images.map((element, index) => {
                          return (
                            <Colxx xxs="12" md="4">
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput(`bookingHeaderImage${index}`);
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={`bookingHeaderImage${index}`}
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
                  onClick={(e) => handleClickForCorporateBookings(e, "header", header)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.corporateBookings.update" />
                  </span>
                </Button>
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={() => {
                    openFileInput(`bookingHeaderImage${header.images ? header.images.length : 0}`);
                  }}
                >
                  <input
                    type="file"
                    id={`bookingHeaderImage${header.images ? header.images.length : 0}`}
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
          <h4>Join as a Member</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporateBookings.joinMember.title" />
                    </Label>
                    <Input type="text" name="title" value={joinMember.title ? joinMember.title : ""} onChange={handleJoinMember} />
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.corporateBookings.joinMember.content[0].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={joinMember.content ? joinMember.content[0].title : ""}
                          onChange={(e) => handleJoinMember(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.corporateBookings.joinMember.content[1].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={joinMember.content ? joinMember.content[1].title : ""}
                          onChange={(e) => handleJoinMember(e, 1)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.corporateBookings.joinMember.content[2].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={joinMember.content ? joinMember.content[2].title : ""}
                          onChange={(e) => handleJoinMember(e, 2)}
                        />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.corporateBookings.joinMember.content[0].description" />
                        </Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={joinMember.content ? joinMember.content[0].description : ""}
                          onChange={(e) => handleJoinMember(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.corporateBookings.joinMember.content[1].description" />
                        </Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={joinMember.content ? joinMember.content[1].description : ""}
                          onChange={(e) => handleJoinMember(e, 1)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.corporateBookings.joinMember.content[2].description" />
                        </Label>
                        <Input
                          type="textarea"
                          name="description"
                          value={joinMember.content ? joinMember.content[2].description : ""}
                          onChange={(e) => handleJoinMember(e, 2)}
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
              onClick={(e) => handleClickForCorporateBookings(e, "join_member", joinMember)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.corporateBookings.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Booked with us</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12" className="mb-4">
                    <Form>
                      <Row>
                        <Colxx xxs="12">
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.corporateBookings.bookedUs.title" />
                          </Label>
                          <Input type="text" name="title" value={bookedUs.title ? bookedUs.title : ""} onChange={handleBookedUs} />
                        </Colxx>
                        <Colxx xxs="12">
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.corporateBookings.bookedUs.image" />
                          </Label>
                          <Row>
                            {bookedUs.images &&
                              bookedUs.images.map((element, index) => {
                                return (
                                  <Colxx xxs="12" md="4">
                                    <div>
                                      <Button
                                        onClick={() => {
                                          openFileInput(`bookedUsImage${index}`);
                                        }}
                                        className="icon-button"
                                        style={{ float: "right" }}
                                      >
                                        <i className="simple-icon-pencil" />
                                        <br></br>
                                        <input
                                          type="file"
                                          id={`bookedUsImage${index}`}
                                          rclassName="d-none"
                                          onChange={(e) => changeImageBookedUs(e, index, "booked_us", bookedUs)}
                                          style={{ display: "none" }}
                                        />
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          deleteBookedUs(index);
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
                                          large={bookedUs.images[index] ? bookedUs.images[index] : ""}
                                          thumb={bookedUs.images[index] ? bookedUs.images[index] : ""}
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

                    <center>
                      <Row>
                        <Colxx>
                          <Button
                            color="primary"
                            className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                            onClick={() => {
                              openFileInput(`bookedUsImage${bookedUs.images ? bookedUs.images.length : 0}`);
                            }}
                          >
                            <input
                              type="file"
                              id={`bookedUsImage${bookedUs.images ? bookedUs.images.length : 0}`}
                              rclassName="d-none"
                              onChange={(e) => changeImageBookedUs(e, bookedUs.images ? bookedUs.images.length : 0, "booked_us", bookedUs)}
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
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForCorporateBookings(e, "booked_us", bookedUs)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.corporateBookings.update" />
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
                      <IntlMessages id="bookExperience.corporateBookings.faq.title" />
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
                            <IntlMessages id="bookExperience.corporateBookings.faq.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={faq.content[index].title ? faq.content[index].title : ""}
                            onChange={(e) => handleFaq(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.corporateBookings.faq.description" />
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
                  onClick={(e) => handleClickForCorporateBookings(e, "faq", faq)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.corporateBookings.update" />
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
      <FaqModal fetchData={fetchFaqData} modalOpen={faqModalOpen} toggleModal={() => setFaqModalOpen(!faqModalOpen)} title={"FAQ"} />
      <Row>
        <Col sm="12">
          <h4>Contact Us</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporateBookings.contactUs.title" />
                    </Label>
                    <Input type="text" name="title" value={contactUs.title ? contactUs.title : ""} onChange={handleContactUs} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporateBookings.contactUs.description" />
                    </Label>
                    <Input type="textarea" name="description" value={contactUs.description ? contactUs.description : ""} onChange={handleContactUs} />
                    <Row>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.corporateBookings.contactUs.content[0].title" />
                        </Label>
                        <Input type="text" name="title" value={contactUs.content ? contactUs.content[0].title : ""} onChange={(e) => handleContactUs(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.corporateBookings.contactUs.content[1].title" />
                        </Label>
                        <Input type="text" name="title" value={contactUs.content ? contactUs.content[1].title : ""} onChange={(e) => handleContactUs(e, 1)} />
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
              onClick={(e) => handleClickForCorporateBookings(e, "contact_us", contactUs)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.corporateBookings.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Contact Us Footer</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                  <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporateBookings.corporateBookingsFooter.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("corporateBookingsFooter");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="corporateBookingsFooter"
                          rclassName="d-none"
                          onChange={(e) => changeImageCorporateFooter(e, "image", "corporate_bookings_footer", corporateBookingsFooter)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox large={corporateBookingsFooter ? corporateBookingsFooter.image : ""} thumb={corporateBookingsFooter ? corporateBookingsFooter.image : ""} className="card-img-top"></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporateBookings.corporateBookingsFooter.title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={corporateBookingsFooter ? corporateBookingsFooter.title : ""}
                      onChange={handleCorporateBookingsFooter}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporateBookings.corporateBookingsFooter.button" />
                    </Label>
                    <Input
                      type="text"
                      name="button"
                      value={corporateBookingsFooter ? corporateBookingsFooter.button : ""}
                      onChange={handleCorporateBookingsFooter}
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
              onClick={(e) => handleClickForCorporateBookings(e, "corporate_bookings_footer", corporateBookingsFooter)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.corporateBookings.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default CorporateBookings;
