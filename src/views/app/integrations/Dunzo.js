import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, CardTitle, FormGroup, Label, CustomInput, Button, FormText, Form, CardHeader } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import toast from "react-hot-toast";
import moment from "moment";
const Dunzo = ({ match }) => {
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
    let newfomdata = { key_name: "dunzo", key_value: { ...formdata } };
    try {
      await api.patch(axiosURLS.INTEGRATION + "/dunzo", newfomdata);
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
  const sendEmail = async () =>{
    setIsLoading(true);
    try {
      let { data } = await api.post(axiosURLS.DUNZO_EMAIL,{email:'harvindersharad@gmail.com',from:moment().subtract(5,'days').valueOf(),to:moment().subtract(3,'days').valueOf()});
     console.log(data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
    setIsLoading(false);
  }
  const downloadPDF = async () =>{
    setIsLoading(true);
    try {
      let { data } = await api.post(axiosURLS.DUNZO_PDF,{month:9,year:2021});
     console.log(data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
    setIsLoading(false);
  }
  useEffect(async () => {
    try {
      let { data } = await api.get(axiosURLS.INTEGRATION + "/dunzo");
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
          <Breadcrumb heading="menu.dunzo" match={match} />
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
                      <IntlMessages id="forms.url" />
                    </Label>
                    <Input type="text" name="url" value={formdata.url ? formdata.url : ""} onChange={handleChange} />
                    <Label>
                      <IntlMessages id="forms.client_id" />
                    </Label>
                    <Input type="text" name="client_id" value={formdata.client_id ? formdata.client_id : ""} onChange={handleChange} />
                    <Label>
                      <IntlMessages id="forms.client_secret" />
                    </Label>
                    <Input type="text" name="client_secret" value={formdata.client_secret ? formdata.client_secret : ""} onChange={handleChange} />
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
          <Card className="mb-4">
            <CardHeader className="mt-4">
              <h2>Reports</h2>
            </CardHeader>
            <CardBody>
              <Row>
                <Colxx xxs="12">
                  <Button color="primary" className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={sendEmail}>
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                    Email Reports
                    </span>
                  </Button>
                  <Button color="primary" className={`btn-shadow mt-4 ml-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={downloadPDF}>
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                    Download PDF
                    </span>
                  </Button>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Dunzo;
