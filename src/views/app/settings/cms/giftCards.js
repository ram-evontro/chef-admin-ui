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
import Modal from "./Modal/AddModal";
import { NotificationManager } from "components/common/react-notifications";
import * as axiosURLS from "helpers/endpoints";
const GiftCards = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState({});
  const [working, setWorking] = useState({});
  const [giftCardsFooter, setGiftCardsFooter] = useState({});
  const [amount, setAmount] = useState({});
  const [amountModalOpen, setAmountModalOpen] = useState(false);
  const [occasion, setOccasion] = useState({});
  const [occasionModalOpen, setOccasionModalOpen] = useState(false);
  const [things, setThings] = useState({});
  const [points, setPoints] = useState({});
  const [pointsModalOpen, setPointsModalOpen] = useState(false);
  const [recipient, setRecipient] = useState({});
  const { upload } = fileapi();

  const handleWorking = (e, x = -1) => {
    let tempdata = { ...working };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setWorking(tempdata);
  };
  const handleHeader = (e) => {
    let tempdata = { ...header };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setHeader(tempdata);
  };
  const handleGiftCardsFooter = (e, x = -1) => {
    let tempdata = { ...giftCardsFooter };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setGiftCardsFooter(tempdata);
  };
  const handleOccasion = (e, x = -1) => {
    let tempdata = { ...occasion };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setOccasion(tempdata);
  };
  const handleAmount = (e, x = -1) => {
    let tempdata = { ...amount };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setAmount(tempdata);
  };
  const handleThings = (e, x = -1) => {
    let tempdata = { ...things };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setThings(tempdata);
  };
  const handlePoints = (e, x = -1) => {
    let tempdata = { ...points };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x] = val;
    } else {
      tempdata[name] = val;
    }
    setPoints(tempdata);
  };
  const handleRecipient = (e, x = -1) => {
    let tempdata = { ...recipient };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setRecipient(tempdata);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.GIFT_CARDS, form);
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
  const handleClickForGiftCards = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.GIFT_CARDS, newfomdata);
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
  const fetchOccasionData = (data) => {
    let allData = occasion;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setOccasion(allData);
  };
  const fetchPointsData = (data) => {
    let allData = points;
    allData.content ? allData.content.push(data.title) : (allData.content = [data.title]);
    setPoints(allData);
  };
  const fetchAmountData = (data) => {
    let allData = amount;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setAmount(allData);
  };
  const deleteOccasion = (index) => {
    let allData = occasion;
    const result = occasion.content.filter((element, i) => i != index);
    allData.content = result;
    setOccasion({ ...allData });
  };
  const deletePoints = (index) => {
    let allData = points;
    const result = points.content.filter((element, i) => i != index);
    allData.content = result;
    setPoints({ ...allData });
  };
  const deleteAmount = (index) => {
    let allData = amount;
    const result = amount.content.filter((element, i) => i != index);
    allData.content = result;
    setAmount({ ...allData });
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
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.GIFT_CARDS);
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
    setWorking(all.working.details);
    setPoints(all.things_to_note.details);
    setGiftCardsFooter(all.gift_footer.details);
    setOccasion(all.occasion.details);
    setRecipient(all.recipient.details);
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
                  <Colxx xxs="12" md="6">
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftCardImage0");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftCardImage0"
                          rclassName="d-none" 
                          onChange={(e) => changeImageHeader(e, "image", "header", header)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={header ? header.image : ""}
                          thumb={header ? header.image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.header.title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={header ? header.title : ""}
                      onChange={handleHeader}
                    />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.header.description" />
                    </Label>
                    <Input
                      type="text"
                      name="description"
                      value={header ? header.description : ""}
                      onChange={handleHeader}
                    />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.header.button_text" />
                    </Label>
                    <Input
                      type="text"
                      name="button_text"
                      value={header ? header.button_text : ""}
                      onChange={handleHeader}
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
              onClick={(e) => handleClickForGiftCards(e, "header", header)}
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
          <h4>How it works</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.title" />
                    </Label>
                    <Input type="text" name="title" value={working.title ? working.title : ""} onChange={handleWorking} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[0].title" />
                    </Label>
                    <Input type="text" name="title" value={working.content ? working.content[0].title : ""} onChange={(e) => handleWorking(e, 0)} />
                  </Colxx>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[1].title" />
                    </Label>
                    <Input type="text" name="title" value={working.content ? working.content[1].title : ""} onChange={(e) => handleWorking(e, 1)} />
                  </Colxx>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[2].title" />
                    </Label>
                    <Input type="text" name="title" value={working.content ? working.content[2].title : ""} onChange={(e) => handleWorking(e, 2)} />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[0].subtitle" />
                    </Label>
                    <Input type="text" name="subtitle" value={working.content ? working.content[0].subtitle : ""} onChange={(e) => handleWorking(e, 0)} />
                  </Colxx>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[1].subtitle" />
                    </Label>
                    <Input type="text" name="subtitle" value={working.content ? working.content[1].subtitle : ""} onChange={(e) => handleWorking(e, 1)} />
                  </Colxx>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[2].subtitle" />
                    </Label>
                    <Input type="text" name="subtitle" value={working.content ? working.content[2].subtitle : ""} onChange={(e) => handleWorking(e, 2)} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForGiftCards(e, "working", working)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.giftCards.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Modal
        fetchData={fetchAmountData}
        modalOpen={amountModalOpen}
        toggleModal={() => setAmountModalOpen(!amountModalOpen)}
        isDescription={false}
        title={"Amount"}
      />
      <Row>
        <Col sm="12">
          <h4>Things to note (Points)</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row xxs="12">
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.points.title" />
                    </Label>
                    <Input type="text" name="title" value={points.title ? points.title : ""} onChange={handlePoints} />
                  </Colxx>
                </Row>
                <Row>
                  {points.content &&
                    points.content.map((element, index) => {
                      return (
                        <Colxx xxs="12">
                          <Row className="mt-4">
                            <Colxx>Point - {index + 1}</Colxx>
                            <Colxx>
                              <Button
                                onClick={() => {
                                  deletePoints(index);
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
                            <IntlMessages id="bookExperience.giftCards.points.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={points.content[index] ? points.content[index] : ""}
                            onChange={(e) => handlePoints(e, index)}
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
                  onClick={(e) => handleClickForGiftCards(e, "things_to_note", points)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.giftCards.update" />
                  </span>
                </Button>
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={() => setPointsModalOpen(!pointsModalOpen)}
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
        fetchData={fetchPointsData}
        modalOpen={pointsModalOpen}
        toggleModal={() => setPointsModalOpen(!pointsModalOpen)}
        isDescription={false}
        title={"Point"}
      />
      <Row>
        <Col sm="12">
          <h4>Choose Occasion</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row xxs="12">
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.occasion.title" />
                    </Label>
                    <Input type="text" name="title" value={occasion.title ? occasion.title : ""} onChange={handleOccasion} />
                  </Colxx>
                </Row>
                <Row>
                  {occasion.content &&
                    occasion.content.map((element, index) => {
                      return (
                        <Colxx xxs="12">
                          <Row className="mt-4">
                            <Colxx>Occasion - {index + 1}</Colxx>
                            <Colxx>
                              <Button
                                onClick={() => {
                                  deleteOccasion(index);
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
                            <IntlMessages id="bookExperience.giftCards.occasion.name" />
                          </Label>
                          <Input
                            type="text"
                            name="name"
                            value={occasion.content[index].name ? occasion.content[index].name : ""}
                            onChange={(e) => handleOccasion(e, index)}
                          />
                          <Label className="mt-2">
                            <IntlMessages id="bookExperience.giftCards.occasion.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={occasion.content[index].title ? occasion.content[index].title : ""}
                            onChange={(e) => handleOccasion(e, index)}
                          />
                          <Label className="mt-2">
                            <IntlMessages id="bookExperience.giftCards.occasion.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={occasion.content[index].description ? occasion.content[index].description : ""}
                            onChange={(e) => handleOccasion(e, index)}
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
                  onClick={(e) => handleClickForGiftCards(e, "occasion", occasion)}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="bookExperience.giftCards.update" />
                  </span>
                </Button>
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={(e) => setOccasionModalOpen(!occasionModalOpen)}
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
        fetchData={fetchOccasionData}
        modalOpen={occasionModalOpen}
        toggleModal={() => setOccasionModalOpen(!occasionModalOpen)}
        isDescription={true}
        title={"Occasion"}
        isName={true}
      />
      <Row>
        <Col sm="12">
          <h4>Recipient Details</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.recipient.title" />
                    </Label>
                    <Input type="text" name="title" value={recipient ? recipient.title : ""} onChange={handleRecipient} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.recipient.description" />
                    </Label>
                    <Input type="textarea" name="description" value={recipient ? recipient.description : ""} onChange={handleRecipient} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForGiftCards(e, "recipient", recipient)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.giftCards.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
      <Row>
        <Col sm="12">
          <h4>Gift Card Footer</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.giftCardsFooter.title" />
                    </Label>
                    <Input type="text" name="text" value={giftCardsFooter ? giftCardsFooter.text : ""} onChange={handleGiftCardsFooter} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForGiftCards(e, "gift_footer", giftCardsFooter)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.giftCards.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default GiftCards;
