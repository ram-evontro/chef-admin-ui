import React, { useState, useEffect, useRef } from "react";
import { Row, Card, CardBody, Button, CardTitle } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import GalleryDetail from "containers/pages/GalleryDetail";
import SingleLightbox from "components/pages/SingleLightbox";
import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
import fileapi from "helpers/fileupload";
const Details = ({ id }) => {
  const [user, setUser] = useState({});
  const [chefTypes, setChefTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tagsLO, setTagsLO] = useState([]);
  const ReactDOMServer = require("react-dom/server");
  const [userPicture, setUserPicture] = useState(null);
  let componentConfig = { postUrl: "no-url" };
  const { upload } = fileapi();
  let eventHandlers = {
    addedfile: (file) => {
      console.log(file);
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
    setLoading(true);
    try {
      let response = await api.get(axiosURLS.USERS + "/" + id);
      let tempuser = response.data;
      Object.assign(tempuser, tempuser.details);
      setUser(tempuser);
      if(tempuser.tags){
      setTagsLO(tempuser.tags)
      }
      response = await api.get(axiosURLS.CHEF_TYPES_ALL);
      setChefTypes(response.data);
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

        let response = await api.patch(axiosURLS.USERS + "/" + id, formdata);
        let tempuser = response.data;
        Object.assign(tempuser, tempuser.details);
        setUser(tempuser);
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
        delete temp["id"];
        delete temp["isEmailVerified"];
        delete temp["status"];
        temp["tags"] = tagsLO;
        let formdata = { details: temp };
        let { data } = await api.post(axiosURLS.USER_DETAILS_UPDATE + "/" + id, formdata);
        console.log(data);
        // setUser(data);
        NotificationManager.success("User updated successfully", "Success", 3000, null, null, "");
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
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
  return (
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
            thumb={userPicture ? URL.createObjectURL(userPicture) : user.picture}
            large={userPicture ? URL.createObjectURL(userPicture) : user.picture}
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
            <GalleryDetail />
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              <IntlMessages id="pages.add_picture" />
            </CardTitle>
            <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Details;
