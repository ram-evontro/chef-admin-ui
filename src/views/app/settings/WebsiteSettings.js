import React, { useEffect, useState, useRef } from "react";
import { Row, Card, CardBody, Input, Label, Button, Form } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import SingleLightbox from "components/pages/SingleLightbox";
import { NotificationManager } from "components/common/react-notifications";
import fileapi from "helpers/fileupload";
const WebsiteSettings = ({ match }) => {
  const { upload } = fileapi();
  const [userPicture, setUserPicture] = useState(null);
  const [formdata, setFormdata] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
  };
  const handleClick = async () => {
    setIsLoading(true);

    let newfomdata = { key_name: "website_settings", key_value: { ...formdata } };
    if (userPicture) {
      let fileurl = await upload(userPicture);
      newfomdata["key_value"]["logo"] = fileurl;
    }
    try {
      await api.patch(axiosURLS.INTEGRATION + "/website_settings", newfomdata);
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
  useEffect(async () => {
    try {
      let { data } = await api.get(axiosURLS.INTEGRATION + "/website_settings");
      setFormdata(data.key_value);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Fetch Error", 3000, null, null, "");
      }
    }
  }, []);
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
          <Breadcrumb heading="menu.website_settings" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12">
                    <Row>
                      <Colxx xxs="12" md="4">
                        {" "}
                        <div className="position-absolute card-top-buttons">
                          <Button onClick={openFileInput} outline color="white" className="icon-button">
                            <i className="simple-icon-pencil" />
                            <input type="file" ref={inputFile} className="d-none" onChange={changeImage} />
                          </Button>
                        </div>
                        <SingleLightbox
                          thumb={
                            userPicture
                              ? URL.createObjectURL(userPicture)
                              : formdata.logo
                              ? formdata.logo
                              : "https://chef.websohamhost.com/assets/img/CAP_Logo.png"
                          }
                          large={
                            userPicture
                              ? URL.createObjectURL(userPicture)
                              : formdata.logo
                              ? formdata.logo
                              : "https://chef.websohamhost.com/assets/img/CAP_Logo.png"
                          }
                          className="card-img-top"
                        />
                      </Colxx>
                    </Row>

                    <Label className="mt-4">
                      <IntlMessages id="forms.address" />
                    </Label>
                    <Input type="text" name="address" value={formdata.address ? formdata.address : ""} onChange={handleChange} />
                    <Label className="mt-4">
                      <IntlMessages id="forms.email" />
                    </Label>
                    <Input type="text" name="email" value={formdata.email ? formdata.email : ""} onChange={handleChange} />
                    <Label className="mt-4">
                      <IntlMessages id="forms.phone" />
                    </Label>
                    <Input type="text" name="phone" value={formdata.phone ? formdata.phone : ""} onChange={handleChange} />
                    <Label className="mt-4">
                      <IntlMessages id="forms.facebook_link" />
                    </Label>
                    <Input type="text" name="facebook_link" value={formdata.facebook_link ? formdata.facebook_link : ""} onChange={handleChange} />
                    <Label className="mt-4">
                      <IntlMessages id="forms.instagram_link" />
                    </Label>
                    <Input type="text" name="instagram_link" value={formdata.instagram_link ? formdata.instagram_link : ""} onChange={handleChange} />
                    <Label className="mt-4">
                      <IntlMessages id="forms.twitter_link" />
                    </Label>
                    <Input type="text" name="twitter_link" value={formdata.twitter_link ? formdata.twitter_link : ""} onChange={handleChange} />
                    <Label className="mt-4">
                      <IntlMessages id="forms.website_url" />
                    </Label>
                    <Input type="text" name="website_url" value={formdata.website_url ? formdata.website_url : ""} onChange={handleChange} />
                    <center>
                      <Button color="primary" className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleClick}>
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="forms.update" />
                        </span>
                      </Button>
                    </center>
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};

export default WebsiteSettings;
