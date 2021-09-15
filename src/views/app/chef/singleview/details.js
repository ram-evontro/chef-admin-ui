import React, { useState, useEffect, useRef } from "react";
import { Row, Card, CardBody, Button, CardTitle } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import GalleryDetail from "../../elements/GalleryDetail";
import SingleLightbox from "components/pages/SingleLightbox";
import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import fileapi from "helpers/fileupload";
import { images } from "helpers/images";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const Details = ({ id, setUserName, setChefTypesForView, setFeedbacks }) => {
  const onMarkerDragEnd = (event) => {
    console.log(event);
    setLat(event.latLng.lat());
    setLong(event.latLng.lng());
  };
  const mapClick = (event) => {
    console.log(event);
    setLat(event.latLng.lat());
    setLong(event.latLng.lng());
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap((map) => {
      function zoomChanged() {
        setZoom(this.getZoom());
      }
      return (
        <GoogleMap zoom={zoom} onZoomChanged={zoomChanged} onClick={mapClick} defaultCenter={{ lat: mylat, lng: mylong }}>
          <Marker draggable={true} onDragEnd={onMarkerDragEnd} position={{ lat: mylat, lng: mylong }} />
        </GoogleMap>
      );
    })
  );

  const [zoom, setZoom] = useState(8);
  const [mylat, setLat] = useState(12.959555780366589);
  const [mylong, setLong] = useState(77.58477366143252);
  const [user, setUser] = useState({});
  const [chefTypes, setChefTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tagsLO, setTagsLO] = useState([]);
  const ReactDOMServer = require("react-dom/server");
  const [userPicture, setUserPicture] = useState(null);
  const [userGalleryPic, setUserGalleryPic] = useState([]);
  const [tempFile, setTempFile] = useState([]);
  const [fileAction, setFileAction] = useState("none");
  const [imageToDelete, setImageToDelete] = useState(null);
  const [dropZone, setDropZone] = useState(null);
  let componentConfig = { postUrl: "no-url" };
  const { upload } = fileapi();
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
  let spreadUser = (data) => {
    let tempuser = data;
    Object.assign(tempuser, tempuser.details);
    setUser(tempuser);
    if (tempuser.tags) {
      setTagsLO(tempuser.tags);
    }
    setUserName(tempuser.name);
  };
  useEffect(async () => {
    setLoading(true);
    try {
      let { data } = await api.get(axiosURLS.USERS + "/" + id);
      if (data.details.coordinates) {
        setLong(data.details.coordinates.lng);
        setLat(data.details.coordinates.lat);
      }
      spreadUser(data);
      if (data.feedbacks) {
        setFeedbacks(data.feedbacks);
      }
      let response = await api.get(axiosURLS.CHEF_TYPES_ALL);

      setChefTypes(response.data);
      setChefTypesForView(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
      }
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    let tempdata = { ...user };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setUser(tempdata);
  };
  const handleClick = async (attr) => {
    setLoading(true);
    if (attr === "user") {
      try {
        let formdata = { name: user.name, email: user.email, mobile: user.mobile, picture: user.picture };
        if (userPicture) {
          let fileurl = await upload(userPicture);
          formdata["picture"] = fileurl;
        }

        let { data } = await api.patch(axiosURLS.USERS + "/" + id, formdata);
        spreadUser(data);
        NotificationManager.success("User updated successfully", "Success", 3000, null, null, "");
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
    }
    if (attr === "details") {
      try {
        let temp = { ...user };
        delete temp["name"];
        delete temp["email"];
        delete temp["mobile"];
        delete temp["role"];
        delete temp["picture"];
        delete temp["details"];
        delete temp["gallery_pictures"];
        delete temp["id"];
        delete temp["isEmailVerified"];
        delete temp["status"];
        temp["tags"] = tagsLO;
        temp["coordinates"] = {};
        temp["coordinates"]["lat"] = mylat;
        temp["coordinates"]["lng"] = mylong;
        let formdata = { details: temp };
        let { data } = await api.post(axiosURLS.USER_DETAILS_UPDATE + "/" + id, formdata);
        spreadUser(data);
        NotificationManager.success("User updated successfully", "Success", 3000, null, null, "");
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
    }
    if (attr === "uploadimages") {
      if (userGalleryPic.length > 0) {
        try {
          let temp = [];
          if (user.gallery_pictures) {
            temp = [...user.gallery_pictures];
          }

          await Promise.all(
            userGalleryPic.map(async (item) => {
              let fileurl = await upload(item);
              temp.push(fileurl);
            })
          );
          console.log(temp);
          let formdata = { details: { gallery_pictures: temp } };
          let { data } = await api.post(axiosURLS.USER_DETAILS_UPDATE + "/" + id, formdata);
          spreadUser(data);
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
    }
    if (attr === "deleteimage") {
      if (user.gallery_pictures) {
        let temp = [...user.gallery_pictures];
        const index = temp.indexOf(imageToDelete);
        if (index > -1) {
          temp.splice(index, 1);
        }
        try {
          let formdata = { details: { gallery_pictures: temp } };
          let { data } = await api.post(axiosURLS.USER_DETAILS_UPDATE + "/" + id, formdata);
          spreadUser(data);
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
    setLoading(false);
    console.log(user);
  };

  const changeImage = (e) => {
    e.preventDefault();
    setUserPicture(e.target.files[0]);
  };
  const inputFile = useRef(null);
  const openFileInput = () => {
    inputFile.current.click();
  };
  return loading ? (
    <div className="loading" />
  ) : (
    <Row>
      <Colxx xxs="12" lg="4" className="mb-4 col-left">
        <Card className="mb-4">
          <div className="position-absolute card-top-buttons">
            <Button onClick={openFileInput} outline color="white" className="icon-button">
              <i className="simple-icon-pencil" />
              <input type="file" ref={inputFile} className="d-none" onChange={changeImage} />
            </Button>
          </div>
          <SingleLightbox
            thumb={userPicture ? URL.createObjectURL(userPicture) : user.picture ? user.picture : images.chefplaceholder.default}
            large={userPicture ? URL.createObjectURL(userPicture) : user.picture ? user.picture : images.chefplaceholder.default}
            className="card-img-top"
          />
          <CardBody>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.name" />
            </p>
            <input onChange={handleChange} type="text" name="name" className="form-control mb-2" value={user.name} />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.email" />
            </p>
            <input onChange={handleChange} type="text" name="email" className="form-control mb-2" value={user.email} />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.mobile" />
            </p>
            <input onChange={handleChange} type="text" name="mobile" className="form-control mb-2" value={user.mobile} />

            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""}`}
              onClick={() => {
                handleClick("user");
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
          </CardBody>
        </Card>

        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.details" />
            </CardTitle>
            <div>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.chef_type" />
              </p>
              <select className="form-control mb-2" onChange={handleChange} name="chef_type" value={user.chef_type} id="chef_type">
                {chefTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.intro" />
              </p>
              <textarea
                onChange={handleChange}
                name="intro"
                value={user.intro}
                id="intro"
                className="form-control mb-2"
                id="intro"
                cols="30"
                rows="8"
              ></textarea>
              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.bankdetails" />
              </p>
              <textarea
                className="form-control mb-2"
                onChange={handleChange}
                name="bankdetails"
                value={user.bankdetails}
                id="bankdetails"
                id="bankdetails"
                cols="30"
                rows="8"
              ></textarea>

              <p className="text-muted text-small mb-1">
                <IntlMessages id="forms.tags" />
              </p>
              <div className="mb-2">
                <TagsInput value={tagsLO} onChange={(val) => setTagsLO(val)} inputProps={{ placeholder: "" }} />
              </div>
              <Button
                color="primary"
                className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""}`}
                onClick={() => {
                  handleClick("details");
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
            </div>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs="12" lg="8" className="mb-4 col-right">
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.gallery" />
            </CardTitle>
            <GalleryDetail setImageToDelete={setImageToDelete} handleClick={handleClick} images={user.gallery_pictures} />
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.add_picture" />
            </CardTitle>
            <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${loading ? "show-spinner" : ""}`}
              onClick={() => {
                handleClick("uploadimages");
              }}
            >
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
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="maps.address" />
            </CardTitle>
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.address" />
            </p>
            <input onChange={handleChange} type="text" name="address1" className="form-control mb-2" value={user.address1} />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.address2" />
            </p>
            <input onChange={handleChange} type="text" name="address2" className="form-control mb-2" value={user.address2} />
            <p className="text-muted text-small mb-1">
              <IntlMessages id="forms.pincode" />
            </p>
            <input onChange={handleChange} type="text" name="pincode" className="form-control mb-2" value={user.pincode} />
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeGvtCVnIAyMWAWdfTpYVjjvU7j9oOYSo&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div className="map-item" />}
              containerElement={<div className="map-item" />}
              mapElement={<div className="map-item" />}
            />
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""}`}
              onClick={() => {
                handleClick("details");
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
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Details;
