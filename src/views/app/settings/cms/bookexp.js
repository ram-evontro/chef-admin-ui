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
import fileapi from "helpers/fileupload";
import SingleLightbox from "components/pages/SingleLightbox";
import RatingsModal from "./Modal/RatingsModal";
import NewsReviewsModal from "./Modal/AddModal";
import { NotificationManager } from "components/common/react-notifications";

import * as axiosURLS from "helpers/endpoints";

const BookExp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState({});
  const [bookingTypes, setBookingTypes] = useState({});
  const [continueBrowsing, setContinueBrowsing] = useState({});
  const [upcomingSupperClubs, setUpcomingSupperClubs] = useState({});
  const [chefsPrivateDining, setChefsPrivateDining] = useState({});
  const [reviews, setReviews] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [consciousDining, setConsciousDining] = useState({});
  const [newsReviews, setNewsReviews] = useState({});
  const [newsReviewsModalOpen, setNewsReviewsModalOpen] = useState(false);
  const [foodDrools, setFoodDrools] = useState({});
  const [gift, setGift] = useState({});
  const [corporate, setCorporate] = useState({});
  const [joinTable, setJoinTable] = useState({});
  const [patronPrivilage, setPatronPrivilage] = useState({});
  const [blog, setBlog] = useState({});
  const [homeFooter, setHomeFooter] = useState({});
  const [bookExperience, setBookExperience] = useState({});
  const { upload } = fileapi();

  const handleHeader = (e, x = -1, forbutton = false) => {
    let tempdata = { ...header };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      if (!forbutton) {
        tempdata.content[x][name] = val;
      } else {
        tempdata.buttons[x] = val;
      }
    } else {
      tempdata[name] = val;
    }
    setHeader(tempdata);
  };
  const handleBookingTypes = (e, x = -1) => {
    let tempdata = { ...bookingTypes };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setBookingTypes(tempdata);
  };
  const handleContinueBrowsing = (e, x = -1) => {
    let tempdata = { ...continueBrowsing };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setContinueBrowsing(tempdata);
  };
  const handleUpcomingSupperClubs = (e, x = -1) => {
    let tempdata = { ...upcomingSupperClubs };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setUpcomingSupperClubs(tempdata);
  };
  const handleChefsPrivateDining = (e, x = -1) => {
    let tempdata = { ...chefsPrivateDining };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setChefsPrivateDining(tempdata);
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
  const handleConsciousDining = (e, x = -1) => {
    let tempdata = { ...consciousDining };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setConsciousDining(tempdata);
  };
  const handleFoodDrools = (e, x = -1, forbutton = false) => {
    let tempdata = { ...foodDrools };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      if (!forbutton) {
        tempdata.content[x][name] = val;
      } else {
        tempdata.buttons[x] = val;
      }
    } else {
      tempdata[name] = val;
    }
    setFoodDrools(tempdata);
  };
  const handleNewsReviews = (e, x = -1) => {
    let tempdata = { ...newsReviews };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setNewsReviews(tempdata);
  };
  const handleGift = (e, x = -1) => {
    let tempdata = { ...gift };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setGift(tempdata);
  };
  const handleCorporate = (e, x = -1) => {
    let tempdata = { ...corporate };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setCorporate(tempdata);
  };
  const handleJoinTable = (e, x = -1) => {
    let tempdata = { ...joinTable };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setJoinTable(tempdata);
  };
  const handlePatronPrivilage = (e, x = -1) => {
    let tempdata = { ...patronPrivilage };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setPatronPrivilage(tempdata);
  };
  const handleBlog = (e, x = -1) => {
    let tempdata = { ...blog };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setBlog(tempdata);
  };
  const handleHomeFooter = (e, x = -1) => {
    let tempdata = { ...homeFooter };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setHomeFooter(tempdata);
  };

  const handleClickBookExp = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, newfomdata);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
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
  const changeImageBookingTypes = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
      setBookingTypes({ ...formdata });
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
  const changeImageConsciousDining = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["images"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
      setConsciousDining({ ...formdata });
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
  const changeImageFoodDrools = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);

      formdata["images"][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
      setFoodDrools({ ...formdata });
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
  const changeImageCorporate = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
      setCorporate({ ...formdata });
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
  const changeImageJoinTable = async (e, imageSection, section, component) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
      setJoinTable({ ...formdata });
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
  const changeImageBlog = async (e, imageSection, section, component, i) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: component.type, details: { ...formdata } };
      // let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
      setBlog({ ...formdata });
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

  const fetchData = (data) => {
    let allData = reviews;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setReviews(allData);
  };
  const fetchNewsReviewsData = (data) => {
    let allData = newsReviews;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setNewsReviews(allData);
  };
  const deleteReview = (index) => {
    let allData = reviews;
    const result = reviews.content.filter((element, i) => i != index);
    allData.content = result;
    setReviews({ ...allData });
  };
  const deleteNewsReviews = (index) => {
    let allData = newsReviews;
    const result = newsReviews.content.filter((element, i) => i != index);
    allData.content = result;
    setNewsReviews({ ...allData });
  };
  const deleteFoodDrool = (index) => {
    let allData = foodDrools;
    const result = foodDrools.images.filter((element, i) => i != index);
    allData.images = result;
    setFoodDrools({ ...allData });
  };

  const openFileInput = (image) => {
    document.getElementById(image).click();
  };

  useEffect(async () => {
    setLoading(true);
    try {
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE);
      setBookExperience(data.book_experience);
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
    setHeader(data.book_experience.header);
    setBookingTypes(data.book_experience.booking_types ?? { content: [{ title: "title1" }, { title: "title2" }] });
    setContinueBrowsing(data.book_experience.continue_browsing);
    setUpcomingSupperClubs(data.book_experience.upcoming_supper_clubs);
    setChefsPrivateDining(data.book_experience.chefs_private_dining);
    setReviews(data.book_experience.reviews ?? { content: [] });
    setConsciousDining(data.book_experience.conscious_dining ?? { images: [], content: [{ title: "title1" }, { title: "title2" }, { title: "title3" }] });
    setNewsReviews(data.book_experience.news_reviews ?? {});
    setFoodDrools(data.book_experience.food_drools ?? { images: [] });
    setGift(data.book_experience.gift);
    setCorporate(data.book_experience.corporate ?? {});
    setJoinTable(data.book_experience.join_table ?? {});
    setPatronPrivilage(data.book_experience.patron_privilage ?? {});
    setBlog(data.book_experience.blog ?? { content: [{ title: "title1" }, { title: "title2" }, { title: "title3" }] });
    setHomeFooter(data.book_experience.home_footer ?? {});
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
                      <IntlMessages id="bookExperience.header.image" />
                    </Label>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("headerImage0");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="headerImage0"
                              rclassName="d-none"
                              onChange={(e) => changeImageHeader(e, 0, "header", header)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={header && header.images ? header.images[0] : ""}
                              thumb={header && header.images ? header.images[0] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("headerImage1");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="headerImage1"
                              rclassName="d-none"
                              onChange={(e) => changeImageHeader(e, 1, "header", header)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={header && header.images ? header.images[1] : ""}
                              thumb={header && header.images ? header.images[1] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("headerImage2");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="headerImage2"
                              rclassName="d-none"
                              onChange={(e) => changeImageHeader(e, 2, "header", header)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={header && header.images ? header.images[2] : ""}
                              thumb={header && header.images ? header.images[2] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.header.content[0].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[0].title : ""} onChange={(e) => handleHeader(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.header.content[1].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[1].title : ""} onChange={(e) => handleHeader(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.header.content[2].title" />
                        </Label>
                        <Input type="text" name="title" value={header.content ? header.content[2].title : ""} onChange={(e) => handleHeader(e, 2)} />
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
              onClick={(e) => handleClickBookExp(e, "header", header)}
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
          <h4>Booking Types</h4>
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
                          openFileInput("bookingTypeImage0");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="bookingTypeImage0"
                          rclassName="d-none"
                          onChange={(e) => changeImageBookingTypes(e, "image", "booking_types", bookingTypes, 0)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={bookingTypes && bookingTypes.content ? bookingTypes.content[0].image : ""}
                          thumb={bookingTypes && bookingTypes.content ? bookingTypes.content[0].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("bookingTypeImage1");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="bookingTypeImage1"
                          rclassName="d-none"
                          onChange={(e) => changeImageBookingTypes(e, "image", "booking_types", bookingTypes, 1)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                        <SingleLightbox
                          large={bookingTypes && bookingTypes.content ? bookingTypes.content[1].image : ""}
                          thumb={bookingTypes && bookingTypes.content ? bookingTypes.content[1].image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[0].title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={bookingTypes.content ? bookingTypes.content[0].title : ""}
                      onChange={(e) => handleBookingTypes(e, 0)}
                    />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[1].title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={bookingTypes.content ? bookingTypes.content[1].title : ""}
                      onChange={(e) => handleBookingTypes(e, 1)}
                    />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[0].description" />
                    </Label>
                    <Input
                      type="text"
                      name="description"
                      value={bookingTypes.content ? bookingTypes.content[0].description : ""}
                      onChange={(e) => handleBookingTypes(e, 0)}
                    />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[1].description" />
                    </Label>
                    <Input
                      type="text"
                      name="description"
                      value={bookingTypes.content ? bookingTypes.content[1].description : ""}
                      onChange={(e) => handleBookingTypes(e, 1)}
                    />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[0].button" />
                    </Label>
                    <Input
                      type="text"
                      name="button"
                      value={bookingTypes.content ? bookingTypes.content[0].button : ""}
                      onChange={(e) => handleBookingTypes(e, 0)}
                    />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[1].button" />
                    </Label>
                    <Input
                      type="text"
                      name="button"
                      value={bookingTypes.content ? bookingTypes.content[1].button : ""}
                      onChange={(e) => handleBookingTypes(e, 1)}
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
              onClick={(e) => handleClickBookExp(e, "booking_types", bookingTypes)}
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
          <h4>Continue Browsing</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.continueBrowsing.title" />
                    </Label>
                    <Input type="text" name="title" value={continueBrowsing ? continueBrowsing.title : ""} onChange={handleContinueBrowsing} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.continueBrowsing.description" />
                    </Label>
                    <Input type="textarea" name="description" value={continueBrowsing ? continueBrowsing.description : ""} onChange={handleContinueBrowsing} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "continue_browsing", continueBrowsing)}
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
          <h4>Upcoming Supper Clubs</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.upcomingSupperClubs.title" />
                    </Label>
                    <Input type="text" name="title" value={upcomingSupperClubs ? upcomingSupperClubs.title : ""} onChange={handleUpcomingSupperClubs} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.upcomingSupperClubs.description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={upcomingSupperClubs ? upcomingSupperClubs.description : ""}
                      onChange={handleUpcomingSupperClubs}
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
              onClick={(e) => handleClickBookExp(e, "upcoming_supper_clubs", upcomingSupperClubs)}
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
          <h4>Chefs available for private Dining</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.chefsPrivateDining.title" />
                    </Label>
                    <Input type="text" name="title" value={chefsPrivateDining ? chefsPrivateDining.title : ""} onChange={handleChefsPrivateDining} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "chefs_private_dining", chefsPrivateDining)}
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
                            <IntlMessages id="bookExperience.reviews.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={reviews.content[index].title ? reviews.content[index].title : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.reviews.ratings" />
                          </Label>
                          <Input
                            type="number"
                            name="ratings"
                            value={reviews.content[index].ratings ? reviews.content[index].ratings : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.reviews.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={reviews.content[index].description ? reviews.content[index].description : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.reviews.designation" />
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
                  onClick={(e) => handleClickBookExp(e, "reviews", reviews)}
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
          <h4>Conscious dining</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Row>
                      <Colxx xxs="12">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.consciousDining.title" />
                        </Label>
                        <Input type="text" name="title" value={consciousDining.title ? consciousDining.title : ""} onChange={handleConsciousDining} />
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.consciousDining.link" />
                        </Label>
                        <Input type="text" name="link" value={consciousDining.link ? consciousDining.link : ""} onChange={handleConsciousDining} />
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.consciousDining.image" />
                        </Label>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("consciousDiningImage[0]");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="consciousDiningImage[0]"
                              rclassName="d-none"
                              onChange={(e) => changeImageConsciousDining(e, 0, "conscious_dining", consciousDining)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={consciousDining.images ? consciousDining.images[0] : ""}
                              thumb={consciousDining.images ? consciousDining.images[0] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("consciousDiningImage[1]");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="consciousDiningImage[1]"
                              rclassName="d-none"
                              onChange={(e) => changeImageConsciousDining(e, 1, "conscious_dining", consciousDining)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={consciousDining.images ? consciousDining.images[1] : ""}
                              thumb={consciousDining.images ? consciousDining.images[1] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("consciousDiningImage[2]");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="consciousDiningImage[2]"
                              rclassName="d-none"
                              onChange={(e) => changeImageConsciousDining(e, 2, "conscious_dining", consciousDining)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={consciousDining.images ? consciousDining.images[2] : ""}
                              thumb={consciousDining.images ? consciousDining.images[2] : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.consciousDining.content[0].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={consciousDining.content ? consciousDining.content[0].title : ""}
                          onChange={(e) => handleConsciousDining(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.consciousDining.content[1].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={consciousDining.content ? consciousDining.content[1].title : ""}
                          onChange={(e) => handleConsciousDining(e, 1)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.consciousDining.content[2].title" />
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          value={consciousDining.content ? consciousDining.content[2].title : ""}
                          onChange={(e) => handleConsciousDining(e, 2)}
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
              onClick={(e) => handleClickBookExp(e, "conscious_dining", consciousDining)}
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
          <h4>News Reviews</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  {newsReviews.content &&
                    newsReviews.content.map((newsReview, index) => {
                      return (
                        <Colxx xxs="12">
                          <Row className="mt-4">
                            <Colxx>Review - {index + 1}</Colxx>
                            <Colxx>
                              <Button
                                onClick={() => {
                                  deleteNewsReviews(index);
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
                            <IntlMessages id="bookExperience.newsReviews.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={newsReviews.content[index].title ? newsReviews.content[index].title : ""}
                            onChange={(e) => handleNewsReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.newsReviews.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={newsReviews.content[index].description ? newsReviews.content[index].description : ""}
                            onChange={(e) => handleNewsReviews(e, index)}
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
                  onClick={(e) => handleClickBookExp(e, "news_reviews", newsReviews)}
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
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={(e) => setNewsReviewsModalOpen(!newsReviewsModalOpen)}
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
      <NewsReviewsModal fetchData={fetchNewsReviewsData} modalOpen={newsReviewsModalOpen} toggleModal={() => setNewsReviewsModalOpen(!newsReviewsModalOpen)} />
      <Row>
        <Col sm="12">
          <h4>Food Drools</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Label className="mt-4">
                    <IntlMessages id="bookExperience.foodDrools.title" />
                  </Label>
                  <Input type="text" name="title" value={foodDrools ? foodDrools.title : ""} onChange={handleFoodDrools} />
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.foodDrools.image" />
                    </Label>
                    <Row>
                      {foodDrools.images &&
                        foodDrools.images.map((foodDrool, index) => {
                          return (
                            <Colxx xxs="12" md="4">
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput(`foodDroolsImage${index}`);
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={`foodDroolsImage${index}`}
                                    rclassName="d-none"
                                    onChange={(e) => changeImageFoodDrools(e, index, "food_drools", foodDrools)}
                                    style={{ display: "none" }}
                                  />
                                </Button>
                                <Button
                                  onClick={() => {
                                    deleteFoodDrool(index);
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
                                    large={foodDrools.images[index] ? foodDrools.images[index] : ""}
                                    thumb={foodDrools.images[index] ? foodDrools.images[index] : ""}
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
                  onClick={(e) => handleClickBookExp(e, "food_drools", foodDrools)}
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
                <Button
                  color="primary"
                  className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
                  onClick={() => {
                    openFileInput(`foodDroolsImage${foodDrools.images ? foodDrools.images.length : 0}`);
                  }}
                >
                  <input
                    type="file"
                    id={`foodDroolsImage${foodDrools.images ? foodDrools.images.length : 0}`}
                    rclassName="d-none"
                    onChange={(e) => changeImageFoodDrools(e, foodDrools.images ? foodDrools.images.length : 0, "food_drools", foodDrools)}
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
          <h4>Gift</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.subTitle" />
                    </Label>
                    <Input type="text" name="sub_title" value={gift ? gift.sub_title : ""} onChange={handleGift} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.title" />
                    </Label>
                    <Input type="text" name="title" value={gift ? gift.title : ""} onChange={handleGift} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.description" />
                    </Label>
                    <Input type="textarea" name="description" value={gift ? gift.description : ""} onChange={handleGift} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.button" />
                    </Label>
                    <Input type="text" name="button" value={gift ? gift.button : ""} onChange={handleGift} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "gift", gift)}
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
          <h4>Corporate bookings</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporate.title" />
                    </Label>
                    <Input type="text" name="title" value={corporate.title ? corporate.title : ""} onChange={handleCorporate} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporate.description" />
                    </Label>
                    <Input type="textarea" name="description" value={corporate.description ? corporate.description : ""} onChange={handleCorporate} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporate.designation" />
                    </Label>
                    <Input type="text" name="designation" value={corporate.designation ? corporate.designation : ""} onChange={handleCorporate} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporate.name" />
                    </Label>
                    <Input type="text" name="name" value={corporate.name ? corporate.name : ""} onChange={handleCorporate} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporate.link" />
                    </Label>
                    <Input type="text" name="link" value={corporate.link ? corporate.link : ""} onChange={handleCorporate} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.corporate.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("corporateImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="corporateImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageCorporate(e, "image", "corporate", corporate)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={corporate ? corporate.image : ""}
                          thumb={corporate ? corporate.image : ""}
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
              onClick={(e) => handleClickBookExp(e, "corporate", corporate)}
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
          <h4>Join our table</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.joinTable.title" />
                    </Label>
                    <Input type="text" name="title" value={joinTable.title ? joinTable.title : ""} onChange={handleJoinTable} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.joinTable.description" />
                    </Label>
                    <Input type="textarea" name="description" value={joinTable.description ? joinTable.description : ""} onChange={handleJoinTable} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.joinTable.image" />
                    </Label>
                    <div>
                      <Button
                        onClick={() => {
                          openFileInput("joinTableImage");
                        }}
                        className="icon-button"
                        style={{ float: "right" }}
                      >
                        <i className="simple-icon-pencil" />
                        <br></br>
                        <input
                          type="file"
                          id="joinTableImage"
                          rclassName="d-none"
                          onChange={(e) => changeImageJoinTable(e, "image", "join_table", joinTable)}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={4}>
                        <SingleLightbox
                          large={joinTable ? joinTable.image : ""}
                          thumb={joinTable ? joinTable.image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                      </Col>
                    </div>
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.joinTable.tc" />
                    </Label>
                    <Input type="text" name="tc" value={joinTable.tc ? joinTable.tc : ""} onChange={handleJoinTable} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.joinTable.policy" />
                    </Label>
                    <Input type="text" name="policy" value={joinTable.policy ? joinTable.policy : ""} onChange={handleJoinTable} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.joinTable.instagram" />
                    </Label>
                    <Input type="text" name="instagram" value={joinTable.instagram ? joinTable.instagram : ""} onChange={handleJoinTable} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.joinTable.linkedIn" />
                    </Label>
                    <Input type="text" name="linkedIn" value={joinTable.linkedIn ? joinTable.linkedIn : ""} onChange={handleJoinTable} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "join_table", joinTable)}
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
          <h4>Patron Privilage</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patronPrivilage.subTitle" />
                    </Label>
                    <Input type="text" name="sub_title" value={patronPrivilage ? patronPrivilage.sub_title : ""} onChange={handlePatronPrivilage} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patronPrivilage.title" />
                    </Label>
                    <Input type="text" name="title" value={patronPrivilage ? patronPrivilage.title : ""} onChange={handlePatronPrivilage} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patronPrivilage.button" />
                    </Label>
                    <Input type="text" name="button" value={patronPrivilage ? patronPrivilage.button : ""} onChange={handlePatronPrivilage} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "patron_privilage", patronPrivilage)}
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
          <h4>Blog</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.blog.title" />
                    </Label>
                    <Input type="text" name="title" value={blog.title ? blog.title : ""} onChange={handleBlog} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.blog.image" />
                    </Label>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("blogImage0");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="blogImage0"
                              rclassName="d-none"
                              onChange={(e) => changeImageBlog(e, "image", "blog", blog, 0)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={blog && blog.content ? blog.content[0].image : ""}
                              thumb={blog && blog.content ? blog.content[0].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("blogImage1");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="blogImage1"
                              rclassName="d-none"
                              onChange={(e) => changeImageBlog(e, "image", "blog", blog, 1)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={blog && blog.content ? blog.content[1].image : ""}
                              thumb={blog && blog.content ? blog.content[1].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("blogImage2");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="blogImage2"
                              rclassName="d-none"
                              onChange={(e) => changeImageBlog(e, "image", "blog", blog, 2)}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={blog && blog.content ? blog.content[2].image : ""}
                              thumb={blog && blog.content ? blog.content[2].image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.blog.content[0].title" />
                        </Label>
                        <Input type="text" name="title" value={blog.content ? blog.content[0].title : ""} onChange={(e) => handleBlog(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.blog.content[1].title" />
                        </Label>
                        <Input type="text" name="title" value={blog.content ? blog.content[1].title : ""} onChange={(e) => handleBlog(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.blog.content[2].title" />
                        </Label>
                        <Input type="text" name="title" value={blog.content ? blog.content[2].title : ""} onChange={(e) => handleBlog(e, 2)} />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.blog.content[0].description" />
                        </Label>
                        <Input type="textarea" name="description" value={blog.content ? blog.content[0].description : ""} onChange={(e) => handleBlog(e, 0)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.blog.content[1].description" />
                        </Label>
                        <Input type="textarea" name="description" value={blog.content ? blog.content[1].description : ""} onChange={(e) => handleBlog(e, 1)} />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.blog.content[2].description" />
                        </Label>
                        <Input type="textarea" name="description" value={blog.content ? blog.content[2].description : ""} onChange={(e) => handleBlog(e, 2)} />
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
              onClick={(e) => handleClickBookExp(e, "blog", blog)}
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
          <h4>Home Footer</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.homeFooter.title" />
                    </Label>
                    <Input type="text" name="title" value={homeFooter ? homeFooter.title : ""} onChange={handleHomeFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.homeFooter.button" />
                    </Label>
                    <Input type="text" name="button" value={homeFooter ? homeFooter.button : ""} onChange={handleHomeFooter} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "home_footer", homeFooter)}
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
    </React.Fragment>
  );
};
export default BookExp;
