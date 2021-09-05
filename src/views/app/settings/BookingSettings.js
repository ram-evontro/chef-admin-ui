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
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if (err.response) {
        NotificationManager.error(err.response.data.message, "Fetch Error", 3000, null, null, "");
      }
    }
  }, []);
  return (
    <>
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
                      <IntlMessages id="forms.max_distance" />
                    </Label>
                    <Input type="text" name="max_distance" value={formdata.max_distance ? formdata.max_distance : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.max_otp_resends" />
                    </Label>
                    <Input type="text" name="max_otp_resends" value={formdata.max_otp_resends ? formdata.max_otp_resends : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.mood_bag_cost" />
                    </Label>
                    <Input type="text" name="mood_bag_cost" value={formdata.mood_bag_cost ? formdata.mood_bag_cost : ""} onChange={handleChange} />
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <Label className="mt-4">
                      <IntlMessages id="forms.delivery_charges" />
                    </Label>
                    <Input type="text" name="delivery_charges" value={formdata.delivery_charges ? formdata.delivery_charges : ""} onChange={handleChange} />
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
        </Colxx>
      </Row>
    </>
  );
};

export default BookingSettings;
