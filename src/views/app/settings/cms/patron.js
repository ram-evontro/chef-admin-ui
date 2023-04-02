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
  const [benifits, setBenifits] = useState({});
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
      tempdata.contents[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setFaq(tempdata);
  };
  const handleBenifits = (e, x = -1) => {
    let tempdata = { ...benifits };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setBenifits(tempdata);
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
    allData.contents ? allData.contents.push(data) : (allData.contents = [data]);
    setFaq(allData);
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
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.PATRON);
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
      if (!all[ele.section]) {
        ele.details.type = ele.type;
        all[ele.section] = ele;
      }
    });
    setBecomePatron(all.become_patron.details);
    setBenifits(all.benifits.details);
    setFaq(all.faq.details);
    setPatronFooter(all.patron_footer.details);
  };

  return loading ? (
    <div className="loading" />
  ) : (
    <React.Fragment>
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
          <h4>Benifits</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patron.benifits.description" />
                    </Label>
                    <Input type="textarea" name="description" value={benifits.description ? benifits.description : ""} onChange={handleBenifits} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12">
                    {benifits.content &&
                      benifits.content.map((element, index) => {
                        return (
                          <Row>
                            <Colxx xxs="12">
                              <Label className="mt-4">
                                <IntlMessages id={`bookExperience.patron.benifits.content[${index}].title`} />
                              </Label>
                              <Input
                                type="text"
                                name="title"
                                value={benifits.content ? benifits.content[index].title : ""}
                                onChange={(e) => handleBenifits(e, index)}
                              />
                            </Colxx>
                            <Colxx xxs="12">
                              <Label className="mt-4">
                                <IntlMessages id={`bookExperience.patron.benifits.content[${index}].description`} />
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                value={benifits.content ? benifits.content[index].description : ""}
                                onChange={(e) => handleBenifits(e, index)}
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
              onClick={(e) => handleClickForPatron(e, "benifits", benifits)}
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
                            <IntlMessages id="bookExperience.patron.faq.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={faq.contents[index].title ? faq.contents[index].title : ""}
                            onChange={(e) => handleFaq(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.patron.faq.description" />
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
      <FaqModal fetchData={fetchFaqData} modalOpen={faqModalOpen} toggleModal={() => setFaqModalOpen(!faqModalOpen)} title={"FAQ"} />
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
                      <IntlMessages id="bookExperience.patron.patronFooter.title" />
                    </Label>
                    <Input type="text" name="text" value={patronFooter.text ? patronFooter.text : ""} onChange={handlePatronFooter} />
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
