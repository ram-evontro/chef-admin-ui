import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IntlMessages from 'helpers/IntlMessages';
import api from 'helpers/api';
import * as axiosURLS from 'helpers/endpoints';
import { NotificationManager } from 'components/common/react-notifications';
const WebsiteSettings = ({ match }) => {
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
    let newfomdata = { key_name: 'website_settings', key_value: { ...formdata } };
    try {
      await api.patch(axiosURLS.INTEGRATION + '/website_settings', newfomdata);
      NotificationManager.success('Saved successfully', 'Saved', 3000, null, null, '');
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setIsLoading(false);
      if (err.response) {
        NotificationManager.error(err.response.data.message, 'Update Error', 3000, null, null, '');
      }
    }
    setIsLoading(false);
  };
  useEffect( async ()=>{
    try {
        let {data} = await api.get(axiosURLS.INTEGRATION + '/website_settings');
        setFormdata(data.key_value);
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          NotificationManager.error(err.response.data.message, 'Fetch Error', 3000, null, null, '');
          
        }
    }
  },[]);
  return (
    <>
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
                  <Label className="mt-4">
                    <IntlMessages id="forms.logo" />
                    </Label>
                    <Input
                      type="text"
                      name="logo"
                      value={formdata.logo ? formdata.logo : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="forms.address" />
                    </Label>
                    <Input
                      type="text"
                      name="address"
                      value={formdata.address ? formdata.address : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="forms.email" />
                    </Label>
                    <Input
                      type="text"
                      name="email"
                      value={formdata.email ? formdata.email : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="forms.phone" />
                    </Label>
                    <Input
                      type="text"
                      name="phone"
                      value={formdata.phone ? formdata.phone : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="forms.facebook_link" />
                    </Label>
                    <Input
                      type="text"
                      name="facebook_link"
                      value={formdata.facebook_link ? formdata.facebook_link : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="forms.instagram_link" />
                    </Label>
                    <Input
                      type="text"
                      name="instagram_link"
                      value={formdata.instagram_link ? formdata.instagram_link : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="forms.twitter_link" />
                    </Label>
                    <Input
                      type="text"
                      name="twitter_link"
                      value={formdata.twitter_link ? formdata.twitter_link : ''}
                      onChange={handleChange}
                    />
                    <center>
                      <Button
                        color="primary"
                        className={`btn-shadow mt-4 btn-multiple-state ${
                          isLoading ? 'show-spinner' : ''
                        }`}
                        onClick={handleClick}
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

export default WebsiteSettings;
