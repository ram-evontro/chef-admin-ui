import React from "react";
import { Row, Input,Button } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
const PriceContainer = ({ price, handleChange,handlePriceDelete }) => {
  return (
    <Row>
      <Colxx xxs="12" md="2" className="mb-4 col-right">
        <p className="text-muted text-small mb-1">
          <IntlMessages id="forms.min_diner" />
        </p>
        <Input type="text" className="form-control mb-2" name="min_diner" value={price.min_diner ? price.min_diner : ""} onChange={(e)=>{handleChange(e,price._id)}} />
      </Colxx>
      <Colxx xxs="12" md="2" className="mb-4 col-right">
        <p className="text-muted text-small mb-1">
          <IntlMessages id="forms.max_diner" />
        </p>
        <Input type="text" className="form-control mb-2" name="max_diner" value={price.max_diner ? price.max_diner : ""} onChange={(e)=>{handleChange(e,price._id)}} />
      </Colxx>
      <Colxx xxs="12" md="3" className="mb-4 col-right">
        <p className="text-muted text-small mb-1">
          <IntlMessages id="forms.price_per_diner" />
        </p>
        <Input
          type="text"
          className="form-control mb-2"
          name="price_per_diner"
          value={price.price_per_diner ? price.price_per_diner : ""}
          onChange={(e)=>{handleChange(e,price._id)}}
        />
      </Colxx>
      <Colxx xxs="12" md="2" className="mb-4 col-right">
        <p className="text-muted text-small mb-1">
          <IntlMessages id="forms.min_courses" />
        </p>
        <Input type="text" className="form-control mb-2" name="min_courses" value={price.min_courses ? price.min_courses : ""} onChange={(e)=>{handleChange(e,price._id)}} />
      </Colxx>
      <Colxx xxs="12" md="2" className="mb-4 col-right">
        <p className="text-muted text-small mb-1">
          <IntlMessages id="forms.max_courses" />
        </p>
        <Input type="text" className="form-control mb-2" name="max_courses" value={price.max_courses ? price.max_courses : ""} onChange={(e)=>{handleChange(e,price._id)}} />
      </Colxx>
      <Colxx xxs="12" md="1" className="mb-4 col-right">
      <Button onClick={()=>{handlePriceDelete(price._id)}} color="primary" className="icon-button">
          <i className="simple-icon-trash" />
        </Button>
       </Colxx>
      
    </Row>
  );
};

export default PriceContainer;
