import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, CardTitle, FormGroup, Label, CustomInput, Button, FormText, Form } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";
import api from "helpers/api";
import * as axiosURLS from "helpers/endpoints";
import { NotificationManager } from "components/common/react-notifications";
const BookingSettings = ({ match }) => {
  const [formdata, setFormdata] = useState({});
  const [waiterdata, setWaiterdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    let tempdata = { ...formdata };
    let val = e.target.value;
    let name = e.target.name;
    tempdata[name] = val;
    setFormdata(tempdata);
  };
  const handleWaiterChange = (e, index) => {
    let tempdata = [...waiterdata];
    let val = e.target.value;
    let name = e.target.name;
    tempdata[index][name] = val;
    setWaiterdata(tempdata);
  };
  const deleteWaiter = (index) => {
    let tempdata = [...waiterdata];
    delete tempdata[index];
    setWaiterdata(tempdata);
  };
  const addWaiter = (e, index) => {
    let tempdata = [...waiterdata];
    let toAdd = {
      max_diners: 6,
      min_diners: 1,
      servers: 1,
    };
    tempdata.push(toAdd);
    setWaiterdata(tempdata);
  };
  const handleWaiterClick = ()=>{
    let tempdata = { ...formdata };
    tempdata.waiter_data = waiterdata;
    setFormdata(tempdata);
    handleClick();
  }
  const handleClick = async () => {
    setIsLoading(true);
    let newfomdata = { key_name: "booking_settings", key_value: { ...formdata } };
    try {
      await api.patch(axiosURLS.INTEGRATION + "/booking_settings", newfomdata);
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
      let { data } = await api.get(axiosURLS.INTEGRATION + "/booking_settings");
      setFormdata(data.key_value);
      let waiterData = data?.key_value?.waiter_data ?? [];
      setWaiterdata(waiterData);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Fetch Error", 3000, null, null, "");
      }
    }
  }, []);
  return (
    <React.Fragment>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.booking_settings" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form>
                <Row>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.vd_max_diners" />
                    </Label>
                    <Input type="text" name="vd_max_diners" value={formdata.vd_max_diners ? formdata.vd_max_diners : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.vd_min_diners" />
                    </Label>
                    <Input type="text" name="vd_min_diners" value={formdata.vd_min_diners ? formdata.vd_min_diners : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.ct_max_diners" />
                    </Label>
                    <Input type="text" name="ct_max_diners" value={formdata.ct_max_diners ? formdata.ct_max_diners : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.ct_min_diners" />
                    </Label>
                    <Input type="text" name="ct_min_diners" value={formdata.ct_min_diners ? formdata.ct_min_diners : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.max_otp_resends" />
                    </Label>
                    <Input type="text" name="max_otp_resends" value={formdata.max_otp_resends ? formdata.max_otp_resends : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.service_charges" />
                    </Label>
                    <Input type="text" name="service_charges" value={formdata.service_charges ? formdata.service_charges : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.tax" />
                    </Label>
                    <select name="tax" id="tax" onChange={handleChange} value={formdata.tax ? formdata.tax : "inclusive"} className="form-control">
                      <option value="inclusive">Inclusive</option>
                      <option value="exclusive">Exclusive</option>
                    </select>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.tax_amount" />
                    </Label>
                    <Input type="text" name="tax_amount" value={formdata.tax_amount ? formdata.tax_amount : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.booking_hours" />
                    </Label>
                    <select
                      name="booking_hours"
                      id="booking_hours"
                      onChange={handleChange}
                      value={formdata.booking_hours ? formdata.booking_hours : "12"}
                      className="form-control"
                    >
                      <option value="0">0</option>
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="48">48</option>
                    </select>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.server_cost" />
                    </Label>
                    <Input type="text" name="server_cost" value={formdata.server_cost ? formdata.server_cost : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12">
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
            <CardTitle>
              <h2 className="mt-2 ml-2">Server / Waiter Config</h2>
            </CardTitle>
            <CardBody>
              <Form>
                <Row>
                  {waiterdata.map((waiter, index) => (
                    <React.Fragment key={index}>
                       <Colxx xxs="12" md="3">
                        <Label>
                          <IntlMessages id="forms.min_diners" />
                        </Label>
                        <Input
                          type="number"
                          name="min_diners"
                          value={waiter.min_diners ? waiter.min_diners : ""}
                          onChange={(e) => {
                            handleWaiterChange(e, index);
                          }}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <Label>
                          <IntlMessages id="forms.max_diners" />
                        </Label>
                        <Input
                          type="number"
                          name="max_diners"
                          value={waiter.max_diners ? waiter.max_diners : ""}
                          onChange={(e) => {
                            handleWaiterChange(e, index);
                          }}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <Label>
                          <IntlMessages id="forms.servers" />
                        </Label>
                        <Input
                          type="number"
                          name="servers"
                          value={waiter.servers ? waiter.servers : ""}
                          onChange={(e) => {
                            handleWaiterChange(e, index);
                          }}
                        />
                      </Colxx>
                      <Colxx xxs="12" md="3">
                        <Button onClick={()=>{deleteWaiter(index)}} color="primary" className="icon-button">
                          <i className="simple-icon-trash" />
                        </Button>
                      </Colxx>
                    </React.Fragment>
                  ))}
                  <Colxx xxs="12">
                    <center>
                      <Button color="primary" className={`btn-shadow mt-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={handleWaiterClick}>
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="forms.update" />
                        </span>
                      </Button>
                      <Button color="primary" className={`btn-shadow mt-4 ml-4 btn-multiple-state ${isLoading ? "show-spinner" : ""}`} onClick={addWaiter}>
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="forms.add_more" />
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

export default BookingSettings;
