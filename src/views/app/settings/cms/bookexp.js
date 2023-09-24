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
  const [privateDining, setPrivateDining] = useState({});
  const [gift, setGift] = useState({});
  const [corporate, setCorporate] = useState({});
  const [duchchef, setDuchchef] = useState({});
  const [joinTable, setJoinTable] = useState({});
  const [patronPrivilage, setPatronPrivilage] = useState({});
  const [blog, setBlog] = useState({});
  const [homeFooter, setHomeFooter] = useState({});
  const [bookExperience, setBookExperience] = useState({});
  const { upload } = fileapi();

  const handleHeader = (e) => {
    let tempdata = { ...header };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setHeader(tempdata);
  };
  const handleBookingTypes = (e, type) => {
    let tempdata = { ...bookingTypes };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[type][name] = val;
    setBookingTypes(tempdata);
  };
  const handleContinueBrowsing = (e) => {
    let tempdata = { ...continueBrowsing };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setContinueBrowsing(tempdata);
  };
  const handleUpcomingSupperClubs = (e) => {
    let tempdata = { ...upcomingSupperClubs };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setUpcomingSupperClubs(tempdata);
  };
  const handleChefsPrivateDining = (e) => {
    let tempdata = { ...chefsPrivateDining };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setChefsPrivateDining(tempdata);
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
  const handleFoodDrools = (e) => {
    let tempdata = { ...foodDrools };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFoodDrools(tempdata);
  };
  const handlePrivateDining = (e) => {
    let tempdata = { ...privateDining };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setPrivateDining(tempdata);
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
  const handleGift = (e, type) => {
    let tempdata = { ...gift };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[type][name] = val;
    setGift(tempdata);
  };
  const handleDuchchef = (e, x = -1) => {
    let tempdata = { ...duchchef };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setDuchchef(tempdata);
  };
  const isImageOrVideo = (filename) => {
    const fileExtension = filename.split('.').pop(); // Get the file extension
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  
    const lowercaseExtension = fileExtension.toLowerCase();
  
    if (imageExtensions.includes(lowercaseExtension)) {
      return 'image';
    } else if (videoExtensions.includes(lowercaseExtension)) {
      return 'video';
    } else {
      return 'other';
    }
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
  const handleClickBookExp = async (e, section, component, type) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: type, details: { ...component } };
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
  const changeImageHeader = async (e, imageSection, section, component, type) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: type, details: { ...formdata } };
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
  const changeImageBookingTypes = async (e, imageSection, section, component, i, type) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
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
  const changeImageConsciousDining = async (e, imageSection, section, component, type) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[imageSection].image = fileurl;
    }
    try {
      var form = { section: section, type: type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
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
  const changeImageFoodDrools = async (e, imageSection, section, component, type) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
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
  const changeImagePrivateDining = async (e, imageSection, section, component, type) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.images[imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
      setPrivateDining({ ...formdata });
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
  const changeImageCorporate = async (e, imageSection, section, component, i, type) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
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
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
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
  const changeImageBlog = async (e, imageSection, section, component, i, type) => {
    e.preventDefault();
    let formdata = { ...component };
    if (e.target.files[0]) {
      let fileurl = await upload(e.target.files[0]);
      formdata.content[i][imageSection] = fileurl;
    }
    try {
      var form = { section: section, type: type, details: { ...formdata } };
      let { data } = await api.patch(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE, form);
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
    allData.reviews ? allData.reviews.push(data) : (allData.reviews = [data]);
    setReviews(allData);
  };
  const fetchNewsReviewsData = (data) => {
    let allData = newsReviews;
    allData.content ? allData.content.push(data) : (allData.content = [data]);
    setNewsReviews(allData);
  };
  const deleteReview = (index) => {
    let allData = reviews;
    const result = reviews.reviews.filter((element, i) => i != index);
    allData.reviews = result;
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
    const result = foodDrools.content.filter((element, i) => i != index);
    allData.content = result;
    setFoodDrools({ ...allData });
  };
  const deletePrivateDining = (index) => {
    let allData = privateDining;
    const result = privateDining.images.filter((element, i) => i != index);
    allData.images = result;
    setPrivateDining({ ...allData });
  };

  const openFileInput = (image) => {
    document.getElementById(image).click();
  };

  useEffect(async () => {
    setLoading(true);
    try {
      let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.BOOK_AN_EXPERIENCE);
      setBookExperience(data);
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
      all[ele.section] = ele;
    });
    setHeader(all.header.details);
    setBookingTypes(all.booking_types.details);
    setContinueBrowsing(all.continue_browsing.details);
    setUpcomingSupperClubs(all.upcoming_supper_clubs.details);
    setChefsPrivateDining(all.chefs_private_dining.details);
    setReviews(all.reviews.details);
    setConsciousDining(all.what_we_cook.details);
    setNewsReviews(all.news_reviews.details);
    setFoodDrools(all.food_drools.details);
    setPrivateDining(all.private_dining.details);
    setGift(all.gift.details);
    setPatronPrivilage(all.gift.details);
    setCorporate(all.corporate.details);
    setDuchchef(all.duchchef.details);
    setBlog(all.blog.details);
    setHomeFooter(all.home_footer.details);
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
                      <Colxx xxs="12">
                        <div>
                          <Button
                            onClick={() => {
                              openFileInput("headerImage");
                            }}
                            className="icon-button"
                            style={{ float: "right" }}
                          >
                            <i className="simple-icon-pencil" />
                            <br></br>
                            <input
                              type="file"
                              id="headerImage"
                              rclassName="d-none"
                              onChange={(e) => changeImageHeader(e, "image", "header", header, "header")}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={header && header.image ? header.image : ""}
                              thumb={header && header.image ? header.image : ""}
                              className="card-img-top"
                            ></SingleLightbox>
                          </Col>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.header.content[0].title" />
                        </Label>
                        <Input type="text" name="title" value={header ? header.title : ""} onChange={handleHeader} />
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
              onClick={(e) => handleClickBookExp(e, "header", header, "header")}
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
                          onChange={(e) => changeImageBookingTypes(e, "image", "booking_types", bookingTypes, "privee", "booking_types")}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                      {bookingTypes && bookingTypes.privee && isImageOrVideo(bookingTypes.privee.image) ===
                    "video" ? (
                      <video style={{ height: "300px",objectFit:"cover",width:"100%" }} className="video" autoPlay muted loop>
                        <source
                          src={bookingTypes.privee.image}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <SingleLightbox
                          large={bookingTypes && bookingTypes.privee ? bookingTypes.privee.image : ""}
                          thumb={bookingTypes && bookingTypes.privee ? bookingTypes.privee.image : ""}
                          className="card-img-top"
                        ></SingleLightbox>
                    )}
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
                          onChange={(e) => changeImageBookingTypes(e, "image", "booking_types", bookingTypes, "supper_club", "booking_types")}
                          style={{ display: "none" }}
                        />
                      </Button>
                      <br></br>
                      <Col md={11}>
                      {bookingTypes && bookingTypes.supper_club &&isImageOrVideo(bookingTypes.supper_club.image) ===
                    "video" ? (
                      <video style={{ height: "300px",objectFit:"cover",width:"100%" }} className="video" autoPlay muted loop>
                        <source
                          src={bookingTypes.supper_club.image}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <SingleLightbox
                      large={bookingTypes && bookingTypes.supper_club ? bookingTypes.supper_club.image : ""}
                      thumb={bookingTypes && bookingTypes.supper_club ? bookingTypes.supper_club.image : ""}
                      className="card-img-top"
                    ></SingleLightbox>
                    )}
                        
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
                      value={bookingTypes.privee ? bookingTypes.privee.title : ""}
                      onChange={(e) => handleBookingTypes(e, "privee")}
                    />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[1].title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={bookingTypes.supper_club ? bookingTypes.supper_club.title : ""}
                      onChange={(e) => handleBookingTypes(e, "supper_club")}
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
                      value={bookingTypes.privee ? bookingTypes.privee.description : ""}
                      onChange={(e) => handleBookingTypes(e, "privee")}
                    />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[1].description" />
                    </Label>
                    <Input
                      type="text"
                      name="description"
                      value={bookingTypes.supper_club ? bookingTypes.supper_club.description : ""}
                      onChange={(e) => handleBookingTypes(e, "supper_club")}
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
                      name="button_text"
                      value={bookingTypes.privee ? bookingTypes.privee.button_text : ""}
                      onChange={(e) => handleBookingTypes(e, "privee")}
                    />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.bookingTypes.content[1].button" />
                    </Label>
                    <Input
                      type="text"
                      name="button_text"
                      value={bookingTypes.supper_club ? bookingTypes.supper_club.button_text : ""}
                      onChange={(e) => handleBookingTypes(e, "supper_club")}
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
              onClick={(e) => handleClickBookExp(e, "booking_types", bookingTypes, "booking_types")}
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
              onClick={(e) => handleClickBookExp(e, "continue_browsing", continueBrowsing, "continue_browsing")}
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
          <h4>Upcoming Tickets</h4>
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
              onClick={(e) => handleClickBookExp(e, "upcoming_supper_clubs", upcomingSupperClubs, "upcoming_supper_clubs")}
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
              onClick={(e) => handleClickBookExp(e, "chefs_private_dining", chefsPrivateDining, "chefs_private_dining")}
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
                            <IntlMessages id="bookExperience.reviews.title" />
                          </Label>
                          <Input
                            type="text"
                            name="title"
                            value={reviews.reviews[index].title ? reviews.reviews[index].title : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.reviews.ratings" />
                          </Label>
                          <Input
                            type="number"
                            name="rating"
                            value={reviews.reviews[index].rating ? reviews.reviews[index].rating : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.reviews.description" />
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            value={reviews.reviews[index].description ? reviews.reviews[index].description : ""}
                            onChange={(e) => handleReviews(e, index)}
                          />
                          <Label className="mt-4">
                            <IntlMessages id="bookExperience.reviews.reviewer" />
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
                  onClick={(e) => handleClickBookExp(e, "reviews", reviews, "reviews_slider")}
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
                              onChange={(e) => changeImageConsciousDining(e, 0, "what_we_cook", consciousDining, "what_we_cook_slider")}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={consciousDining.content ? consciousDining.content[0].image : ""}
                              thumb={consciousDining.content ? consciousDining.content[0].image : ""}
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
                              onChange={(e) => changeImageConsciousDining(e, 1, "what_we_cook", consciousDining, "what_we_cook_slider")}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={consciousDining.content ? consciousDining.content[1].image : ""}
                              thumb={consciousDining.content ? consciousDining.content[1].image : ""}
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
                              onChange={(e) => changeImageConsciousDining(e, 2, "what_we_cook", consciousDining, "what_we_cook_slider")}
                              style={{ display: "none" }}
                            />
                          </Button>
                          <br></br>
                          <Col md={11}>
                            <SingleLightbox
                              large={consciousDining.content ? consciousDining.content[2].image : ""}
                              thumb={consciousDining.content ? consciousDining.content[2].image : ""}
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
                          name="text"
                          value={consciousDining.content ? consciousDining.content[0].text : ""}
                          onChange={(e) => handleConsciousDining(e, 0)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.consciousDining.content[1].title" />
                        </Label>
                        <Input
                          type="text"
                          name="text"
                          value={consciousDining.content ? consciousDining.content[1].text : ""}
                          onChange={(e) => handleConsciousDining(e, 1)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="4">
                        <Label className="mt-4">
                          <IntlMessages id="bookExperience.consciousDining.content[2].title" />
                        </Label>
                        <Input
                          type="text"
                          name="text"
                          value={consciousDining.content ? consciousDining.content[2].text : ""}
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
              onClick={(e) => handleClickBookExp(e, "what_we_cook", consciousDining, "what_we_cook_slider")}
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
                  onClick={(e) => handleClickBookExp(e, "news_reviews", newsReviews, "news_reviews_slider")}
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
                      {foodDrools.content &&
                        foodDrools.content.map((foodDrool, index) => {
                          return (
                            <Colxx xxs="12" md="12">
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
                                    onChange={(e) => changeImageFoodDrools(e, index, "food_drools", foodDrools, "food_drools_gallery")}
                                    style={{ display: "none" }}
                                  />
                                </Button>
                          
                                <br></br>
                                <Col>
                                  <SingleLightbox
                                    large={foodDrools.content[index] ? foodDrools.content[index] : ""}
                                    thumb={foodDrools.content[index] ? foodDrools.content[index] : ""}
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
                  onClick={(e) => handleClickBookExp(e, "food_drools", foodDrools, "food_drools_gallery")}
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
                    openFileInput(`foodDroolsImage${foodDrools.content ? foodDrools.content.length : 0}`);
                  }}
                >
                  <input
                    type="file"
                    id={`foodDroolsImage${foodDrools.content ? foodDrools.content.length : 0}`}
                    rclassName="d-none"
                    onChange={(e) =>
                      changeImageFoodDrools(e, foodDrools.content ? foodDrools.content.length : 0, "food_drools", foodDrools, "food_drools_gallery")
                    }
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
                      <IntlMessages id="bookExperience.gift.hashtag" />
                    </Label>
                    <Input type="text" name="hashtag" value={gift.gift ? gift.gift.hashtag : ""} onChange={(e) => handleGift(e, "gift")} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.title" />
                    </Label>
                    <Input type="text" name="title" value={gift.gift ? gift.gift.title : ""} onChange={(e) => handleGift(e, "gift")} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.description" />
                    </Label>
                    <Input type="textarea" name="description" value={gift.gift ? gift.gift.description : ""} onChange={(e) => handleGift(e, "gift")} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.button" />
                    </Label>
                    <Input type="text" name="button_text" value={gift.gift ? gift.gift.button_text : ""} onChange={(e) => handleGift(e, "gift")} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "gift", gift, "gift")}
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
                      <IntlMessages id="bookExperience.patronPrivilage.hashtag" />
                    </Label>
                    <Input
                      type="text"
                      name="hashtag"
                      value={patronPrivilage.patron ? patronPrivilage.patron.hashtag : ""}
                      onChange={(e) => handleGift(e, "patron")}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patronPrivilage.title" />
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={patronPrivilage.patron ? patronPrivilage.patron.title : ""}
                      onChange={(e) => handleGift(e, "patron")}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.description" />
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={patronPrivilage.patron ? patronPrivilage.patron.description : ""}
                      onChange={(e) => handleGift(e, "patron")}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.patronPrivilage.button" />
                    </Label>
                    <Input
                      type="text"
                      name="button_text"
                      value={patronPrivilage.patron ? patronPrivilage.patron.button_text : ""}
                      onChange={(e) => handleGift(e, "patron")}
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
              onClick={(e) => handleClickBookExp(e, "gift", gift, "gift")}
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
          <h4>Dutch your Chef</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.hashtag" />
                    </Label>
                    <Input type="text" name="hashtag" value={gift.duchchef ? gift.duchchef.hashtag : ""} onChange={(e) => handleGift(e, "duchchef")} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.title" />
                    </Label>
                    <Input type="text" name="title" value={gift.duchchef ? gift.duchchef.title : ""} onChange={(e) => handleGift(e, "duchchef")} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.description" />
                    </Label>
                    <Input type="textarea" name="description" value={gift.duchchef ? gift.duchchef.description : ""} onChange={(e) => handleGift(e, "duchchef")} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.gift.button" />
                    </Label>
                    <Input type="text" name="button_text" value={gift.duchchef ? gift.duchchef.button_text : ""} onChange={(e) => handleGift(e, "duchchef")} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "gift", gift, "gift")}
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
                    {corporate.content &&
                      corporate.content.map((data, index) => {
                        return (
                          <div>
                            <Label className="mt-4">
                              <IntlMessages id="bookExperience.corporate.name" />
                            </Label>
                            <Input type="text" name="name" value={data.name ? data.name : ""} onChange={(e) => handleCorporate(e, index)} />
                            <Label className="mt-4">
                              <IntlMessages id="bookExperience.corporate.description" />
                            </Label>
                            <Input
                              type="textarea"
                              name="description"
                              value={data.description ? data.description : ""}
                              onChange={(e) => handleCorporate(e, index)}
                            />
                            <Label className="mt-4">
                              <IntlMessages id="bookExperience.corporate.position" />
                            </Label>
                            <Input type="text" name="position" value={data.position ? data.position : ""} onChange={(e) => handleCorporate(e, index)} />

                            <Label className="mt-4">
                              <IntlMessages id="bookExperience.corporate.button_text" />
                            </Label>
                            <Input
                              type="text"
                              name="button_text"
                              value={data.button_text ? data.button_text : ""}
                              onChange={(e) => handleCorporate(e, index)}
                            />
                            <Label className="mt-4">
                              <IntlMessages id="bookExperience.corporate.image" />
                            </Label>
                            <div>
                              <Button
                                onClick={() => {
                                  openFileInput(`corporateImage${index}`);
                                }}
                                className="icon-button"
                                style={{ float: "right" }}
                              >
                                <i className="simple-icon-pencil" />
                                <br></br>
                                <input
                                  type="file"
                                  id={`corporateImage${index}`}
                                  rclassName="d-none"
                                  onChange={(e) => changeImageCorporate(e, "image", "corporate", corporate, index, "corporate_slider")}
                                  style={{ display: "none" }}
                                />
                              </Button>
                              <br></br>
                              <Col md={4}>
                                <SingleLightbox large={data ? data.image : ""} thumb={data ? data.image : ""} className="card-img-top"></SingleLightbox>
                              </Col>
                            </div>
                          </div>
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
              onClick={(e) => handleClickBookExp(e, "corporate", corporate, "corporate_slider")}
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
                              onChange={(e) => changeImageBlog(e, "image", "blog", blog, 0, "blog_list")}
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
                              onChange={(e) => changeImageBlog(e, "image", "blog", blog, 1, "blog_list")}
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
                              onChange={(e) => changeImageBlog(e, "image", "blog", blog, 2, "blog_list")}
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
              onClick={(e) => handleClickBookExp(e, "blog", blog, "blog_list")}
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
          <h4>Private Dining</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Label className="mt-4">
                    <IntlMessages id="bookExperience.privateDining.title" />
                  </Label>
                  <Input type="text" name="title" value={privateDining ? privateDining.title : ""} onChange={handlePrivateDining} />
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.privateDining.image" />
                    </Label>
                    <Row>
                      {privateDining.images &&
                        privateDining.images.map((privateDine, index) => {
                          return (
                            <Colxx xxs="12" md="4">
                              <div>
                                <Button
                                  onClick={() => {
                                    openFileInput(`privateDiningImage${index}`);
                                  }}
                                  className="icon-button"
                                  style={{ float: "right" }}
                                >
                                  <i className="simple-icon-pencil" />
                                  <br></br>
                                  <input
                                    type="file"
                                    id={`privateDiningImage${index}`}
                                    rclassName="d-none"
                                    onChange={(e) => changeImagePrivateDining(e, index, "private_dining", privateDining, "private_dining")}
                                    style={{ display: "none" }}
                                  />
                                </Button>
                                <Button
                                  onClick={() => {
                                    deletePrivateDining(index);
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
                                    large={privateDining.images[index] ? privateDining.images[index] : ""}
                                    thumb={privateDining.images[index] ? privateDining.images[index] : ""}
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
                  onClick={(e) => handleClickBookExp(e, "private_dining", privateDining, "private_dining")}
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
                    openFileInput(`privateDiningImage${privateDining.images ? privateDining.images.length : 0}`);
                  }}
                >
                  <input
                    type="file"
                    id={`privateDiningImage${privateDining.images ? privateDining.images.length : 0}`}
                    rclassName="d-none"
                    onChange={(e) =>
                      changeImagePrivateDining(e, privateDining.images ? privateDining.images.length : 0, "private_dining", privateDining, "private_dining")
                    }
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
          <h4>Home Footer</h4>
        </Col>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.homeFooter.desktop_button_call" />
                    </Label>
                    <Input type="text" name="desktop_button_call" value={homeFooter ? homeFooter.desktop_button_call : ""} onChange={handleHomeFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.homeFooter.desktop_button_email" />
                    </Label>
                    <Input type="text" name="desktop_button_email" value={homeFooter ? homeFooter.desktop_button_email : ""} onChange={handleHomeFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.homeFooter.desktop_description" />
                    </Label>
                    <Input type="text" name="desktop_description" value={homeFooter ? homeFooter.desktop_description : ""} onChange={handleHomeFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.homeFooter.desktop_title" />
                    </Label>
                    <Input type="text" name="desktop_title" value={homeFooter ? homeFooter.desktop_title : ""} onChange={handleHomeFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.homeFooter.mobile_button" />
                    </Label>
                    <Input type="text" name="mobile_button" value={homeFooter ? homeFooter.mobile_button : ""} onChange={handleHomeFooter} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.homeFooter.moblie_title" />
                    </Label>
                    <Input type="text" name="moblie_title" value={homeFooter ? homeFooter.moblie_title : ""} onChange={handleHomeFooter} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickBookExp(e, "home_footer", homeFooter, "home_footer")}
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
