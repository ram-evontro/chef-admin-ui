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
import toast from 'react-hot-toast';
const Razorpay = ({ match }) => {
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
    let newfomdata = { key_name: 'razorpay', key_value: { ...formdata } };
    try {
      await api.patch(axiosURLS.INTEGRATION + '/razorpay', newfomdata);
      toast.success('Data saved successfully');
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
  useEffect( async ()=>{
    try {
        let {data} = await api.get(axiosURLS.INTEGRATION + '/razorpay');
        setFormdata(data.key_value);
      } catch (err) {
        console.log(err);
        console.log(err.response);
        if (err.response) {
          toast.error(err.response.data.message);
        }
    }
  },[]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.razorpay" match={match} />
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
                      <IntlMessages id="forms.key_id" />
                    </Label>
                    <Input
                      type="text"
                      name="key_id"
                      value={formdata.key_id ? formdata.key_id : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-4">
                      <IntlMessages id="forms.key_secret" />
                    </Label>
                    <Input
                      type="text"
                      name="key_secret"
                      value={formdata.key_secret ? formdata.key_secret : ''}
                      onChange={handleChange}
                    />
                   <Label className="mt-4">
                      <IntlMessages id="forms.webhook_secret" />
                    </Label>
                    <Input
                      type="text"
                      name="webhook_secret"
                      value={formdata.webhook_secret ? formdata.webhook_secret : ''}
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

export default Razorpay;
