import React, { useState, useRef, useEffect } from "react";
import { Row, Card, CardBody, Button, CardTitle, Input, FormGroup } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import GalleryDetail from "../../elements/GalleryDetail";
import SingleLightbox from "components/pages/SingleLightbox";
import DropzoneComponent from "react-dropzone-component";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import fileapi from "helpers/fileupload";
import { NotificationManager } from "components/common/react-notifications";
import "dropzone/dist/min/dropzone.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-tagsinput/react-tagsinput.css";
import { images } from "helpers/images";
import TimePicker from "react-time-picker";
import Map from "../singleview/map";
import moment from "moment";
import Select from "react-select";
import CustomSelectInput from "components/common/CustomSelectInput";
const Singleview = ({ event, setEvent, chefs }) => {
  const { upload } = fileapi();
  const ReactDOMServer = require("react-dom/server");
  const [selectedChef, setSelectedChef] = useState({});
  const [selectedMealTime, setSelectedMealTime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userGalleryPic, setUserGalleryPic] = useState([]);
  const [tempFile, setTempFile] = useState([]);
  const [fileAction, setFileAction] = useState("none");
  const [imageToDelete, setImageToDelete] = useState(null);
  const [dropZone, setDropZone] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [mylat, setLat] = useState(12.959555780366589);
  const [mylong, setLong] = useState(77.58477366143252);
  const [mapKey, setMapKey] = useState("");
  const autoComplete = useRef(null);
  useEffect(async () => {
    setSelectedChef({ key: event.chef.id, value: event.chef.id, label: event.chef.name });
    if (event.lat) {
      setLat(event.lat);
    }
    if (event.lng) {
      setLong(event.lng);
    }
    let response = await api.get(axiosURLS.INTEGRATIONS);
    setMapKey(response.data.google_map.api_key);
    let tempSelectedMealTime = event.new_dates.map((daterow,key)=>({key: key, value: daterow.time, label: daterow.time})); 
    setSelectedMealTime(tempSelectedMealTime);
  }, [event]);
  let componentConfig = { postUrl: "no-url" };
  let eventHandlers = {
    addedfile: (file) => {
      setFileAction("add");
      setTempFile(file);
    },
    removedfile: (file) => {
      setFileAction("remove");
      setTempFile(file);
    },
    init: (dropzone) => {
      setDropZone(dropzone);
    },
  };
  const djsConfig = {
    thumbnailHeight: 160,
    maxFilesize: 2,
    autoProcessQueue: false,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview mb-3">
        <div className="d-flex flex-row ">
          <div className="p-0 w-30 position-relative">
            <div className="dz-error-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="dz-success-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="preview-container">
              {/*  eslint-disable-next-line jsx-a11y/alt-text */}
              <img data-dz-thumbnail className="img-thumbnail border-0" />
              <i className="simple-icon-doc preview-icon" />
            </div>
          </div>
          <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
            <div>
              <span data-dz-name />
            </div>
            <div className="text-primary text-extra-small" data-dz-size />
            <div className="dz-progress">
              <span className="dz-upload" data-dz-uploadprogress />
            </div>
            <div className="dz-error-message">
              <span data-dz-errormessage />
            </div>
          </div>
        </div>
        <a href="#/" className="remove" data-dz-remove>
          <i className="glyph-icon simple-icon-trash" />
        </a>
      </div>
    ),
  };
  useEffect(async () => {
    let allFiles = [...userGalleryPic];
    if (fileAction === "add") {
      allFiles.push(tempFile);
    } else if (fileAction === "remove") {
      const index = allFiles.findIndex((obj) => obj.upload.uuid === tempFile.upload.uuid);
      if (index > -1) {
        allFiles.splice(index, 1);
      }
    }
    await setUserGalleryPic(allFiles);
  }, [tempFile]);
  useEffect(async () => {
    setIsLoading(true);
    if (imageToDelete) {
      if (event.pictures) {
        let temp = [...event.pictures];
        const index = temp.indexOf(imageToDelete);
        if (index > -1) {
          temp.splice(index, 1);
        }
        try {
          let formdata = { pictures: temp };
          if (event.booking_count > 0) {
            NotificationManager.warning("Caution event already have bookings", "Event has booking", 3000, null, null, "");
          }
          let { data } = await api.patch(axiosURLS.EVENT + "/" + event.id, formdata);
          setEvent(data);
          setImageToDelete(null);
          NotificationManager.success("Picture deleted successfully", "Success", 3000, null, null, "");
        } catch (err) {
          console.log(err);
          console.log(err.response);
          if (err.response) {
            NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
          }
        }
      }
    }
    setIsLoading(false);
  }, [imageToDelete]);
  const changeImage = (e) => {
    e.preventDefault();
    setUserPicture(e.target.files[0]);
  };
  const handleChange = (e) => {
    let tempdata = { ...event };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setEvent(tempdata);
  };
  const handleClick = async () => {
    let error = "";
    let formdata = { ...event };
    if (!formdata["title"] || formdata["title"] === "") {
      error = "Title Required";
    }
    if (!formdata["desc"] || formdata["desc"] === "") {
      error = "Description Required";
    }
    if (error != "") {
      NotificationManager.error(error, "Error", 3000, null, null, "");
      return false;
    }
    formdata["lat"] = mylat;
    formdata["lng"] = mylong;
    if (selectedChef && selectedChef.value !== event.chef.id) {
      formdata["chef"] = selectedChef.value;
    } else {
      delete formdata["chef"];
    }
    delete formdata["dates"];
    delete formdata["what_to_expect"];
    delete formdata["id"];
    delete formdata["bookings"];
    delete formdata["booking_count"];
    delete formdata["booking_by_date"];
    setIsLoading(true);
    try {
      if (event.booking_count > 0) {
        NotificationManager.warning("Caution event already have bookings", "Event has booking", 3000, null, null, "");
      }
      let { data } = await api.patch(axiosURLS.EVENT + "/" + event.id, formdata);
      NotificationManager.success("Event updated successfully", "Success", 3000, null, null, "");
      setEvent(data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const inputFile = useRef(null);
  const handleChefSelect = (val) => {
    setSelectedChef(val);
    console.log(val);
  };
  const deletePicture = () => {};
  const uploadImages = async () => {
    setIsLoading(true);
    if (userGalleryPic.length > 0) {
      try {
        let temp = [];
        if (event.pictures) {
          temp = [...event.pictures];
        }

        await Promise.all(
          userGalleryPic.map(async (item) => {
            let fileurl = await upload(item);
            temp.push(fileurl);
          })
        );
        console.log(temp);
        let formdata = { pictures: temp };
        if (event.booking_count > 0) {
          NotificationManager.warning("Caution event already have bookings", "Event has booking", 3000, null, null, "");
        }
        let { data } = await api.patch(axiosURLS.EVENT + "/" + event.id, formdata);
        setEvent(data);
        setUserGalleryPic([]);
        setFileAction("none");
        dropZone.removeAllFiles(true);
        setTempFile(null);
        NotificationManager.success("Picture uploaded successfully", "Success", 3000, null, null, "");
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
    }
    setIsLoading(false);
  };
  const addDate = () => {
    let tempevent = { ...event };
    let temparr = [];
    if (tempevent.new_dates && tempevent.new_dates.length > 0) {
      temparr = [...tempevent.new_dates];
    }
    let newDate = moment().format("M D YY");
    temparr.push({ date: newDate, time: "Lunch", from: "12:00", to: "14:00" });
    tempevent["new_dates"] = temparr;
    setEvent(tempevent);
  };
  const addWte = () => {
    let tempevent = { ...event };
    let temparr = [];
    if (tempevent.what_to_expect && tempevent.what_to_expect.length > 0) {
      temparr = [...tempevent.what_to_expect];
    }
    temparr.push("");
    tempevent["what_to_expect"] = temparr;
    setEvent(tempevent);
  };
  const handleDateDelete = (key) => {
    let tempevent = { ...event };
    let temparr = [];
    if (tempevent.new_dates && tempevent.new_dates.length > 0) {
      temparr = [...tempevent.new_dates];
      if (key > -1) {
        temparr.splice(key, 1);
      }
      tempevent["new_dates"] = temparr;
      setEvent(tempevent);
    }
  };
  const handleWteDelete = (key) => {
    let tempevent = { ...event };
    let temparr = [];
    if (tempevent.what_to_expect && tempevent.what_to_expect.length > 0) {
      temparr = [...tempevent.what_to_expect];
      if (key > -1) {
        temparr.splice(key, 1);
      }
      tempevent["what_to_expect"] = temparr;
      setEvent(tempevent);
    }
  };
  const handleWteChange = (e, key) => {
    let tempevent = { ...event };
    let val = e.target.value;
    tempevent["what_to_expect"][key] = val;
    setEvent(tempevent);
  };
  const handleEventUpload = async (param) => {
    let tempevent = { ...event };
    let formdata = {};
    if (param === "new_dates" && tempevent.new_dates && tempevent.new_dates.length > 0) {
      let newDates = tempevent.new_dates.map((daterow) => {
        return { date: daterow.date, time: daterow.time, from: daterow.from, to: daterow.to };
      });
      formdata["new_dates"] = newDates;
    }
    if (param === "what_to_expect" && tempevent.what_to_expect && tempevent.what_to_expect.length > 0) {
      formdata["what_to_expect"] = tempevent.what_to_expect;
    }
    setIsLoading(true);
    try {
      if (event.booking_count > 0) {
        NotificationManager.warning("Caution event already have bookings", "Event has booking", 3000, null, null, "");
      }
      let { data } = await api.patch(axiosURLS.EVENT + "/" + event.id, formdata);
      NotificationManager.success("Event updated successfully", "Success", 3000, null, null, "");
      setEvent(data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setIsLoading(false);
  };
  const setTime = (val, key,param) => {
    let formdata = { ...event };
    formdata["new_dates"][key][param] = val;
    setEvent(formdata);
  };

  const setDate = (val, key) => {
    console.log(val, key, "setdate", moment(val).utcOffset(330), moment().utcOffset());
    let temp = { ...event };
    temp["new_dates"][key]["date"] = moment(val).utcOffset(moment().utcOffset()).format("Y-MM-DD");
    setEvent(temp);
  };
  const setMealTime = (val, key) => {
    let temp = { ...event };
    temp["new_dates"][key]["time"] = val.value;
    setEvent(temp);
    let tempSelectedMealTime = { ...selectedMealTime };
    tempSelectedMealTime[key] = val;
    setSelectedMealTime(tempSelectedMealTime);
  };
  const updateGalleryImage = async (picture, replace) => {
    let temp = [];
    if (event.pictures) {
      temp = [...event.pictures];
    }
    const findIndex = temp.findIndex((row) => {
      return row === replace ? true : false;
    });
    if (findIndex > -1) {
      temp.splice(findIndex, 1);
    }
    let fileurl = await upload(picture);
    temp.push(fileurl);
    let formdata = { pictures: temp };
    if (event.booking_count > 0) {
      NotificationManager.warning("Caution event already have bookings", "Event has booking", 3000, null, null, "");
    }
    try {
      let { data } = await api.patch(axiosURLS.EVENT + "/" + event.id, formdata);
      setEvent(data);
      setUserGalleryPic([]);
      setFileAction("none");
      dropZone.removeAllFiles(true);
      setTempFile(null);
      NotificationManager.success("Picture cropped successfully", "Success", 3000, null, null, "");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
  };
  return (
    <Row>
      <Colxx xxs="12" lg="4" className="mb-4 col-left">
        <Card className="mb-4">
          <CardBody>
            <FormGroup>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.chef" />
              </p>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                options={chefs.map((chef, i) => {
                  return { label: chef.name, value: chef.id, key: chef.id };
                })}
                value={selectedChef}
                onChange={handleChefSelect}
              />
            </FormGroup>
            <FormGroup>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.title" />
              </p>
              <input onChange={handleChange} type="text" name="title" className="form-control" value={event.title} />
            </FormGroup>
            <FormGroup className="mt-3">
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.description" />
              </p>
              <Input onChange={handleChange} type="textarea" name="desc" className="form-control" value={event.desc} />
            </FormGroup>
            <FormGroup>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.venue" />
              </p>
              <input onChange={handleChange} type="textarea" name="venue" className="form-control" value={event.venue} />
            </FormGroup>
            <FormGroup>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.seats" />
              </p>
              <input onChange={handleChange} type="number" name="seats" className="form-control" value={event.seats} />
            </FormGroup>
            <FormGroup>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.price" />
              </p>
              <input onChange={handleChange} type="number" name="price" className="form-control" value={event.price} />
            </FormGroup>
            <FormGroup>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.seats_chefs_table" />
              </p>
              <input onChange={handleChange} type="number" name="seats_chefs_table" className="form-control" value={event.seats_chefs_table} />
            </FormGroup>
            <FormGroup>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.price_chefs_table" />
              </p>
              <input onChange={handleChange} type="number" name="price_chefs_table" className="form-control" value={event.price_chefs_table} />
            </FormGroup>

            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.course" />
            </p>
            <Input type="text" className="form-control mb-2" name="course" value={event.course ? event.course : ""} onChange={handleChange} />

            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.drinks" />
            </p>
            <Input className="form-control mb-2" type="text" name="drinks" value={event.drinks ? event.drinks : ""} onChange={handleChange} />

            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.meal_highlight" />
            </p>
            <Input
              className="form-control mb-2"
              type="text"
              name="meal_highlight"
              value={event.meal_highlight ? event.meal_highlight : ""}
              onChange={handleChange}
            />

            <Button color="primary" className={`btn-shadow btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleClick}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.update" />
              </span>
            </Button>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.gallery" />
            </CardTitle>
            <GalleryDetail updateGalleryImage={updateGalleryImage} setImageToDelete={setImageToDelete} handleClick={deletePicture} images={event.pictures} />
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.add_picture" />
            </CardTitle>
            <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
            <Button color="primary" className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={uploadImages}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.upload" />
              </span>
            </Button>
          </CardBody>
        </Card>
      </Colxx>
      <Colxx xxs="12" lg="8" className="mb-4 col-right">
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.dates" />
            </CardTitle>
            <Row>
              {event.new_dates &&
                event.new_dates.map((daterow, key) => (
                  <Colxx xxs="12" md="12">
                    <Row>
                      <div className="position-relative text-right mt-n4 mr-n4">
                        <Button
                          onClick={() => {
                            handleDateDelete(key);
                          }}
                          color="primary"
                          className="icon-button"
                        >
                          <i className="simple-icon-trash" />
                        </Button>
                      </div>
                      <Colxx xxs="12" md="3">
                        <p className="text-muted text-small mb-0">
                          <IntlMessages id="forms.date" />
                        </p>
                        <DatePicker
                          className="mb-1"
                          key={key + "datepikerevent"}
                          selected={Date.parse(daterow.date)}
                          onChange={(val) => setDate(val, key)}
                          shouldCloseOnSelect
                        />
                      </Colxx>
                      <Colxx xxs="12" md="2">
                        <p className="text-muted text-small mb-0">
                          <IntlMessages id="menu.meal_time" />
                        </p>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          key={key + "timeevent"}
                          options={[
                            { label: "Lunch", value: "Lunch", key: 0 },
                            { label: "Dinner", value: "Dinner", key: 1 },
                          ]}
                          value={selectedMealTime[key]}
                          onChange={(val) => setMealTime(val, key)}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <p className="text-muted text-small mb-0">
                            <IntlMessages id="forms.timefrom" />
                          </p>
                          <TimePicker value={daterow.from ? daterow.from : ""} onChange={(val) => setTime(val, key,'from')} />
                        </FormGroup>
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <FormGroup>
                          <p className="text-muted text-small mb-0">
                            <IntlMessages id="forms.timetill" />
                          </p>
                          <TimePicker value={daterow.to ? daterow.to : ""} onChange={(val) => setTime(val, key,'to')} />
                        </FormGroup>
                      </Colxx>
                    </Row>
                  </Colxx>
                ))}
            </Row>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={() => {
                handleEventUpload("new_dates");
              }}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.update" />
              </span>
            </Button>
            <Button color="primary" className={`btn-shadow ml-3 mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={addDate}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.add_more" />
              </span>
            </Button>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.what_to_expect" />
            </CardTitle>
            <Row>
              {event.what_to_expect &&
                event.what_to_expect.map((row, key) => (
                  <Colxx xxs="12">
                    <div className="position-relative text-right mt-n4 mr-n4">
                      <Button
                        onClick={() => {
                          handleWteDelete(key);
                        }}
                        color="primary"
                        className="icon-button"
                      >
                        <i className="simple-icon-trash" />
                      </Button>
                    </div>
                    <input
                      type="text"
                      onChange={(e) => {
                        handleWteChange(e, key);
                      }}
                      className="form-control mb-5"
                      value={row}
                    />
                  </Colxx>
                ))}
            </Row>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={() => {
                handleEventUpload("what_to_expect");
              }}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.update" />
              </span>
            </Button>
            <Button color="primary" className={`btn-shadow ml-3 mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={addWte}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="forms.add_more" />
              </span>
            </Button>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>Venue Location</CardTitle>
            <Row>
              <Colxx xxs="12">
                <input ref={autoComplete} placeholder="Search a place..." type="text" className="form-control" />
                <Map
                  zoom={zoom}
                  setLat={setLat}
                  autoComplete={autoComplete}
                  mapKey={mapKey}
                  setLong={setLong}
                  mylat={mylat}
                  mylong={mylong}
                  setZoom={setZoom}
                />
              </Colxx>
              <Colxx xxs="12" className="mt-4">
                <Button color="primary" className={`btn-shadow btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleClick}>
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="forms.update" />
                  </span>
                </Button>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default Singleview;
