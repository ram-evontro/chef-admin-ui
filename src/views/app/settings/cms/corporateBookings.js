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
      tempdata.contents[x][name] = val;
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.CORPORATE_BOOKINGS, form);
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
      formdata["content"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.CORPORATE_BOOKINGS, form);
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
    allData.contents ? allData.contents.push(data) : (allData.contents = [data]);
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
    const result = bookedUs.content.filter((element, i) => i != index);
    allData.content = result;
    setBookedUs({ ...allData });
  };
  const deleteFaq = (index) => {
    let allData = faq;
    const result = faq.contents.filter((element, i) => i != index);
    allData.contents = result;
    setFaq({ ...allData });
  };

  const openFileInput = (image) => {
    document.getElementById(image).click();
  };
  useEffect(async () => {
    setLoading(true);
    try {
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.CORPORATE_BOOKINGS);
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
    setBookedUs(all.booked_us.details);
    setContactUs(all.contact_us.details);
    setCorporateBookingsFooter(all.corporate_bookings_footer.details);
    setFaq(all.faq.details);
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
                    <Colxx xxs="12" md="4">
                      <div>
                        <Button
                          onClick={() => {
                            openFileInput("bookingHeaderImage");
                          }}
                          className="icon-button"
                          style={{ float: "right" }}
                        >
                          <i className="simple-icon-pencil" />
                          <br></br>
                          <input
                            type="file"
                            id={"bookingHeaderImage"}
                            rclassName="d-none"
                            onChange={(e) => changeImageHeader(e, "image", "header", header)}
                            style={{ display: "none" }}
                          />
                        </Button>
                        <br></br>
                        <Col>
                          <SingleLightbox
                            large={header.image ? header.image : ""}
                            thumb={header.image ? header.image : ""}
                            className="card-img-top"
                          ></SingleLightbox>
                        </Col>
                      </div>
                    </Colxx>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporateBookings.header.title" />
                    </Label>
                    <Input type="text" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporateBookings.header.description" />
                    </Label>
                    <Input type="text" name="description" value={header.description ? header.description : ""} onChange={handleHeader} />
                    <Row>
                      {header.content &&
                        header.content.map((element, index) => {
                          return (
                            <Colxx xxs="12">
                              <Row className="mt-4">
                                <Colxx>Content - {index + 1}</Colxx>
                              </Row>
                              <Label className="mt-2">
                                <IntlMessages id="bookExperience.corporateBookings.header.title" />
                              </Label>
                              <Input
                                type="text"
                                name="title"
                                value={header.content[index].title ? header.content[index].title : ""}
                                onChange={(e) => handleHeader(e, index)}
                              />
                              <Label className="mt-4">
                                <IntlMessages id="bookExperience.corporateBookings.header.description" />
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                value={header.content[index].description ? header.content[index].description : ""}
                                onChange={(e) => handleHeader(e, index)}
                              />
                              <br></br>
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
                            {bookedUs.content &&
                              bookedUs.content.map((element, index) => {
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
                                          large={bookedUs.content[index] ? bookedUs.content[index] : ""}
                                          thumb={bookedUs.content[index] ? bookedUs.content[index] : ""}
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
                              openFileInput(`bookedUsImage${bookedUs.content ? bookedUs.content.length : 0}`);
                            }}
                          >
                            <input
                              type="file"
                              id={`bookedUsImage${bookedUs.content ? bookedUs.content.length : 0}`}
                              rclassName="d-none"
                              onChange={(e) => changeImageBookedUs(e, bookedUs.content ? bookedUs.content.length : 0, "booked_us", bookedUs)}
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
                            <IntlMessages id="bookExperience.corporateBookings.faq.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={faq.contents[index].title ? faq.contents[index].title : ""}
                            onChange={(e) => handleFaq(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.corporateBookings.faq.description" />
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
                      <IntlMessages id="bookExperience.corporateBookings.corporateBookingsFooter.title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={corporateBookingsFooter ? corporateBookingsFooter.title : ""}
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
