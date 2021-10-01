import React, { useEffect, useState, useRef } from "react";
import { Row, Card, CardBody, Input, CardTitle, FormGroup, Label, CustomInput, Button, FormText, Form } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import SingleLightbox from "components/pages/SingleLightbox";
import { images } from "helpers/images";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import { connect } from "react-redux";
import api from "helpers/api";
import fileapi from "helpers/fileupload";
import { NotificationManager } from "components/common/react-notifications";
import * as axiosURLS from "helpers/endpoints";
import { loginUserSuccess } from "redux/actions";
const Account = ({ match, currentUser, updateUserAction }) => {
  const { upload } = fileapi();
  const [loading, setLoading] = useState(false);
  const [userPicture, setUserPicture] = useState(null);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({});
  useEffect(() => {
    let tempUser = { ...currentUser.user };
    delete tempUser["id"];
    delete tempUser["role"];
    delete tempUser["isEmailVerified"];
    setFormData(tempUser);
  }, [currentUser]);
  const handleClick = async (attr) => {
    setLoading(true);
    if (attr === "user") {
      try {
        if (userPicture) {
          let fileurl = await upload(userPicture);
          formData["picture"] = fileurl;
        }
        let { data } = await api.patch(axiosURLS.USERS + "/" + currentUser.user.id, formData);
        NotificationManager.success("User updated successfully", "Success", 3000, null, null, "");
        let tempState = { ...currentUser };
        Object.assign(tempState.user, formData);
        updateUserAction(tempState);
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
    }
    if (attr === "password") {
      try {
        let tempPass = {...passwordData};
        if (tempPass.password === tempPass.confirm_password && tempPass.password!='') {
          let { data } = await api.patch(axiosURLS.USERS + "/" + currentUser.user.id, { password: tempPass.password });
          NotificationManager.success("Password changed successfully", "Success", 3000, null, null, "");
        } else {
          NotificationManager.error("Password and confirm password dont match", "Error occured", 3000, null, null, "");
        }
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, "Error occured", 3000, null, null, "");
        }
      }
    }
    setLoading(false);
  };
  const handleChange = (e) => {
    let tempdata = { ...formData };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormData(tempdata);
  };
  const handleChangePassword = (e) => {
    let tempdata = { ...passwordData };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setPasswordData(tempdata);
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
    <React.Fragment>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.account" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Row>
                <Colxx xxs="12" md="4">
                 <div className="position-absolute card-top-buttons">
                    <Button onClick={openFileInput} outline color="white" className="icon-button">
                      <i className="simple-icon-pencil" />
                      <input type="file" ref={inputFile} className="d-none" onChange={changeImage} />
                    </Button>
                  </div>
                  <SingleLightbox
                    thumb={userPicture ? URL.createObjectURL(userPicture) : formData.picture ? formData.picture : images.chefplaceholder.default}
                    large={userPicture ? URL.createObjectURL(userPicture) : formData.picture ? formData.picture : images.chefplaceholder.default}
                    className="card-img-top"
                  />
                </Colxx>
                <Colxx xxs="12" md="8">
                  <p className="text-muted text-small mb-1">
                    <IntlMessages id="forms.name" />
                  </p>
                  <input onChange={handleChange} value={formData.name} type="text" name="name" className="form-control mb-2" />
                  <p className="text-muted text-small mb-1">
                    <IntlMessages id="forms.email" />
                  </p>
                  <input type="text" onChange={handleChange} value={formData.email} name="email" className="form-control mb-2" />
                  <p className="text-muted text-small mb-1">
                    <IntlMessages id="forms.mobile" />
                  </p>
                  <input type="text" onChange={handleChange} value={formData.mobile} name="mobile" className="form-control mb-2" />
                </Colxx>
              </Row>
              <Row>
                <Colxx xxs="12" md="12">
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
                </Colxx>
              </Row>
            </CardBody>
          </Card>
          <Card className="mb-4">
            <CardBody>
              <Row>
                <Colxx xxs="12" md="6">
                  <p className="text-muted text-small mb-1">
                    <IntlMessages id="forms.password" />
                  </p>
                  <input type="password" onChange={handleChangePassword} name="password" value={passwordData.password} className="form-control mb-2" />
                </Colxx>
                <Colxx xxs="12" md="6">
                  <p className="text-muted text-small mb-1">
                    <IntlMessages id="forms.confirm_password" />
                  </p>
                  <input
                    type="password"
                    onChange={handleChangePassword}
                    name="confirm_password"
                    value={passwordData.confirm_password}
                    className="form-control mb-2"
                  />
                </Colxx>
              </Row>
              <Row>
                <Colxx xxs="12" md="12">
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""}`}
                    onClick={() => {
                      handleClick("password");
                    }}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="forms.change_password" />
                    </span>
                  </Button>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return {
    currentUser,
  };
};
export default connect(mapStateToProps, { updateUserAction: loginUserSuccess })(Account);
