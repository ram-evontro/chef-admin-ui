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
const S3 = ({ match }) => {
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
    let newfomdata = { key_name: 's3_bucket', key_value: { ...formdata } };
    try {
      await api.patch(axiosURLS.INTEGRATION + '/s3_bucket', newfomdata);
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
        let {data} = await api.get(axiosURLS.INTEGRATION + '/s3_bucket');
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
          <Breadcrumb heading="menu.s3_bucket" match={match} />
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
                    <Label className="mt-2">
                      <IntlMessages id="forms.access_key" />
                    </Label>
                    <Input
                      type="text"
                      name="accessKeyId"
                      value={formdata.accessKeyId ? formdata.accessKeyId : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-2">
                      <IntlMessages id="forms.secret_key" />
                    </Label>
                    <Input
                      type="text"
                      name="secretAccessKey"
                      value={formdata.secretAccessKey ? formdata.secretAccessKey : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-2">
                      <IntlMessages id="forms.region" />
                    </Label>
                    <Input
                      type="text"
                      name="region"
                      value={formdata.region ? formdata.region : ''}
                      onChange={handleChange}
                    />
                    <Label className="mt-2">
                      <IntlMessages id="forms.signature_version" />
                    </Label>
                    <Input
                      type="text"
                      name="signatureVersion"
                      value={formdata.signatureVersion ? formdata.signatureVersion : ''}
                      onChange={handleChange}
                    /> 
                    <Label className="mt-2">
                      <IntlMessages id="forms.bucket" />
                    </Label>
                    <Input
                      type="text"
                      name="Bucket"
                      value={formdata.Bucket ? formdata.Bucket : ''}
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

export default S3;
