/* eslint-disable react/no-array-index-key */
import React,{useState} from "react";
import { injectIntl } from "react-intl";
import { Card, CardBody, CardTitle, InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import Logcard from "./logcard";


const Log = ({ data, className, intl, logAction, isLoadingForLog }) => {
  const { messages } = intl;
  const [formdata,setFormdata] = useState({});
  const handleChange = (e)=>{
    let temp ={...formdata};
    let name = e.target.name;
    let value = e.target.value;
    temp[name]=value;
    setFormdata(temp);
  }
  const handleClick = async ()=>{
   await logAction('add',formdata);
   setFormdata({});
  }
  const handleDelete = (id)=>{
    logAction('delete',{"logId":id});
  }
  const renderComments = (data) => {
    return data.map((item, index) => {
      return <Logcard handleDelete={handleDelete} data={item} key={index} />;
    });
  };
  return (
    <Card className={className}>
      <CardBody>
        <CardTitle>{messages["pages.order_log"]}</CardTitle>
        <div className="mt-5 remove-last-border">{renderComments(data)}</div>
        <InputGroup>
          <Input name="message" value={formdata.message} onChange={handleChange} placeholder={messages["pages.add_details"]} />
          <InputGroupAddon addonType="append">
            <Input type="date" name="date" value={formdata.date} onChange={handleChange} placeholder={messages["pages.date"]} />
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button  color="primary" className={`btn-shadow btn-multiple-state ${isLoadingForLog ? "show-spinner" : ""}`} onClick={handleClick}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                {messages["pages.save"]}
              </span>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default injectIntl(React.memo(Log));
