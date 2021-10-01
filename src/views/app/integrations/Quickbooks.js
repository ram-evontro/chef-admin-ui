import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, CardTitle, FormGroup, Label, CustomInput, Button, FormText, Form } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
const Quickbooks = ({ match }) => {
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
    let newfomdata = { key_name: "quickbooks", key_value: { ...formdata } };
    try {
      await api.patch(axiosURLS.INTEGRATION + "/quickbooks", newfomdata);
      toast.success("Data saved successfully");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
    setIsLoading(false);
  };
  useEffect(async () => {
    window.location.hash = '';
    try {
      let { data } = await api.get(axiosURLS.INTEGRATION + "/quickbooks");
      setFormdata(data.key_value);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.quickbooks" match={match} />
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
                    <Label>
                      <IntlMessages id="forms.client_id" />
                    </Label>
                    <Input type="text" name="client_id" value={formdata.client_id ? formdata.client_id : ""} onChange={handleChange} />
                    <Label className="mt-3">
                      <IntlMessages id="forms.client_secret" />
                    </Label>
                    <Input type="text" name="client_secret" value={formdata.client_secret ? formdata.client_secret : ""} onChange={handleChange} />
                    <Label className="mt-3">
                      <IntlMessages id="forms.redirect_url" />
                    </Label>
                    <Input type="text" name="redirect_url" value={formdata.redirect_url ? formdata.redirect_url : ""} onChange={handleChange} />
                    <Label className="mt-3">
                      <IntlMessages id="forms.url" />
                    </Label>
                    <Input type="text" name="url" value={formdata.url ? formdata.url : ""} onChange={handleChange} />
                    <center>
                      <a
                        href={axiosURLS.BASE_URL + axiosURLS.QUICKBOOKSAUTH}
                        className={`btn-shadow btn btn-primary mt-4 mr-3 btn-multiple-state`}
                        target="_blank"
                      >
                        <span className="label">
                          <IntlMessages id="forms.authorize" />
                        </span>
                      </a>
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
    </>
  );
};

export default Quickbooks;
