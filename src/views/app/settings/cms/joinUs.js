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
import { NotificationManager } from "components/common/react-notifications";
import * as axiosURLS from "helpers/endpoints";
const JoinUs = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState({});
  const { upload } = fileapi();

  const handleHeader = (e, x = -1) => {
    let tempdata = { ...header };
    let val = e.target.value;
    let name = e.target.name;
    if (x !== -1) {
      tempdata.content[x][name] = val;
    } else {
      tempdata[name] = val;
    }
    setHeader(tempdata);
  };

  const handleClickForJoinUs = async (e, section, component) => {
    setIsLoading(true);
    let newfomdata = { section: section, type: component.type, details: { ...component } };
    try {
      await api.patch(axiosURLS.BASE_URL + axiosURLS.JOIN_US, newfomdata);
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
    setLoading(true);
    try {
    //   let { data } = await api.get(axiosURLS.BASE_URL + axiosURLS.JOIN_US);
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
    setHeader(data.join_us ? data.join_us.header : {});
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
                      <IntlMessages id="bookExperience.joinUs.header.title" />
                    </Label>
                    <Input type="textarea" name="title" value={header.title ? header.title : ""} onChange={handleHeader} />
                    <Label className="mt-4">
                      <IntlMessages id="bookExperience.joinUs.header.button" />
                    </Label>
                    <Input type="text" name="button" value={header.button ? header.button : ""} onChange={handleHeader} />
                  </Colxx>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <center>
            <Button
              color="primary"
              className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`}
              onClick={(e) => handleClickForJoinUs(e, "header", header)}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="bookExperience.joinUs.update" />
              </span>
            </Button>
          </center>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};
export default JoinUs;
