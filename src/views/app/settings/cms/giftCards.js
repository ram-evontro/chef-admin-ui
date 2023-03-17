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
      tempdata.content[x][name] = val;
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
      formdata["images"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.GIFT_CARDS, form);
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
  const changeImageWorking = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.GIFT_CARDS, form);
      setWorking({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageThings = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.GIFT_CARDS, form);
      setThings({ ...formdata });
      NotificationManager.success("Image updated successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  const changeImageGiftFooter = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.GIFT_CARDS, form);
      setGiftCardsFooter({ ...formdata });
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
    allData.content ? allData.content.push(data) : (allData.content = [data]);
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
      //   let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.GIFT_CARDS);
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
    setHeader(data.gift_cards ? data.gift_cards.header : { images: [] });
    setWorking(data.gift_cards ? data.gift_cards.working : { content: [{ title: "title1" }, { title: "title2" }, { title: "title3" }] });
    setThings(
      data.gift_cards
        ? data.gift_cards.things
        : { content: [{ description: "description1" }, { description: "description2" }, { description: "description3" }, { description: "description4" }] }
    );
    setGiftCardsFooter(data.gift_cards ? data.gift_cards.gift_footer : {});
    setAmount(data.gift_cards ? data.gift_cards.amount : {});
    setOccasion(data.gift_cards ? data.gift_cards.occasion : {});
    setPoints(data.gift_cards ? data.gift_cards.points : {});
    setRecipient(data.gift_cards ? data.gift_cards.recipient : {});
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
                      <IntlMessages id="bookExperience.giftCards.header.image" />
                    </Label>
                    <Row>
                      {header.images &&
                        header.images.map((element, index) => {
                          return (
                            <Colxx xxs="12" md="4">
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput(`giftCardsHeaderImage${index}`);
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={`giftCardsHeaderImage${index}`}
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
                  onClick={(e) => handleClickForGiftCards(e, "header", header)}
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
                  onClick={() => {
                    openFileInput(`giftCardsHeaderImage${header.images ? header.images.length : 0}`);
                  }}
                >
                  <input
                    type="file"
                    id={`giftCardsHeaderImage${header.images ? header.images.length : 0}`}
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
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftWorkingImage0");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftWorkingImage0"
                          rclassName="d-none"
                          onChange={(e) => changeImageWorking(e, "image", "working", working, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={working.content ? working.content[0].image : ""}
                          thumb={working.content ? working.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                  <Colxx xxs="12" md="4">
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftWorkingImage1");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftWorkingImage1"
                          rclassName="d-none"
                          onChange={(e) => changeImageWorking(e, "image", "working", working, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={working.content ? working.content[1].image : ""}
                          thumb={working.content ? working.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                  <Colxx xxs="12" md="4">
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftWorkingImage2");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftWorkingImage2"
                          rclassName="d-none"
                          onChange={(e) => changeImageWorking(e, "image", "working", working, 2)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={working.content ? working.content[2].image : ""}
                          thumb={working.content ? working.content[2].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[0].description" />
                    </Label>
                    <Input type="text" name="description" value={working.content ? working.content[0].description : ""} onChange={(e) => handleWorking(e, 0)} />
                  </Colxx>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[1].description" />
                    </Label>
                    <Input type="text" name="description" value={working.content ? working.content[1].description : ""} onChange={(e) => handleWorking(e, 1)} />
                  </Colxx>
                  <Colxx xxs="12" md="4">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.working.content[2].description" />
                    </Label>
                    <Input type="text" name="description" value={working.content ? working.content[2].description : ""} onChange={(e) => handleWorking(e, 2)} />
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
      <Row>
        <Col sm="12">
          <h4>Gift Card Amounts</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  {amount.content &&
                    amount.content.map((element, index) => {
                      return (
                        <Colxx xxs="12">
                          <Row className="mt-4">
                            <Colxx>Button - {index + 1}</Colxx>
                            <Colxx>
                              <Button
                                onClick={() => {
                                  deleteAmount(index);
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
                            <IntlMessages id="bookExperience.giftCards.amount.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={amount.content[index].title ? amount.content[index].title : ""}
                            onChange={(e) => handleAmount(e, index)}
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
                  onClick={(e) => handleClickForGiftCards(e, "amount", amount)}
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
                  onClick={(e) => setAmountModalOpen(!amountModalOpen)}
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
        fetchData={fetchAmountData}
        modalOpen={amountModalOpen}
        toggleModal={() => setAmountModalOpen(!amountModalOpen)}
        isDescription={false}
        title={"Amount"}
      />
      <Row>
        <Col sm="12">
          <h4>Things to know</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12" md="3">
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftThingsImage0");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftThingsImage0"
                          rclassName="d-none"
                          onChange={(e) => changeImageThings(e, "image", "things", things, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={things.content ? things.content[0].image : ""}
                          thumb={things.content ? things.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                  <Colxx xxs="12" md="3">
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftThingsImage1");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftThingsImage1"
                          rclassName="d-none"
                          onChange={(e) => changeImageThings(e, "image", "things", things, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={things.content ? things.content[1].image : ""}
                          thumb={things.content ? things.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                  <Colxx xxs="12" md="3">
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftThingsImage2");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftThingsImage2"
                          rclassName="d-none"
                          onChange={(e) => changeImageThings(e, "image", "things", things, 2)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={things.content ? things.content[2].image : ""}
                          thumb={things.content ? things.content[2].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                  <Colxx xxs="12" md="3">
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftThingsImage3");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftThingsImage3"
                          rclassName="d-none"
                          onChange={(e) => changeImageThings(e, "image", "things", things, 3)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={things.content ? things.content[3].image : ""}
                          thumb={things.content ? things.content[3].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="3">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.things.content[0].description" />
                    </Label>
                    <Input type="text" name="description" value={things.content ? things.content[0].description : ""} onChange={(e) => handleThings(e, 0)} />
                  </Colxx>
                  <Colxx xxs="12" md="3">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.things.content[1].description" />
                    </Label>
                    <Input type="text" name="description" value={things.content ? things.content[1].description : ""} onChange={(e) => handleThings(e, 1)} />
                  </Colxx>
                  <Colxx xxs="12" md="3">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.things.content[2].description" />
                    </Label>
                    <Input type="text" name="description" value={things.content ? things.content[2].description : ""} onChange={(e) => handleThings(e, 2)} />
                  </Colxx>
                  <Colxx xxs="12" md="3">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.things.content[3].description" />
                    </Label>
                    <Input type="text" name="description" value={things.content ? things.content[3].description : ""} onChange={(e) => handleThings(e, 3)} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForGiftCards(e, "things", things)}
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
                            value={points.content[index].title ? points.content[index].title : ""}
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
                  onClick={(e) => handleClickForGiftCards(e, "points", points)}
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
                            <IntlMessages id="bookExperience.giftCards.occasion.button" />
                          </Label>
                          <Input
                            type="text"
                            name="button"
                            value={occasion.content[index].button ? occasion.content[index].button : ""}
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
        isButton={true}
        title={"Occasion"}
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
                      <IntlMessages id="bookExperience.giftCards.giftCardsFooter.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("giftCardsFooterImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="giftCardsFooterImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageGiftFooter(e, "image", "gift_footer", giftCardsFooter)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={giftCardsFooter ? giftCardsFooter.image : ""}
                          thumb={giftCardsFooter ? giftCardsFooter.image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <br></br>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.giftCardsFooter.title" />
                    </Label>
                    <Input type="text" name="title" value={giftCardsFooter ? giftCardsFooter.title : ""} onChange={handleGiftCardsFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.giftCards.giftCardsFooter.button" />
                    </Label>
                    <Input type="text" name="button" value={giftCardsFooter ? giftCardsFooter.button : ""} onChange={handleGiftCardsFooter} />
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
