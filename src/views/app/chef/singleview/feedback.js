import React, { useState } from "react";
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";
import friendsData from "data/follow";
const Feedback = ({ feedbacks }) => {
  return (
    <Row>
      {feedbacks?.map((itemData, index) => {
        return (
          <Colxx key={`feedback_${index}`} xxs="12">
            <Card className="card d-flex mb-3">
              <div className="d-flex flex-grow-1 min-width-zero">
                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                  <Row className="w-100">
                    <Colxx xss="12" md="2">
                      {itemData?.from?itemData.from.name:'NA'}
                    </Colxx>
                    <Colxx xss="12" md="4">
                    
                    </Colxx>
                    <Colxx xss="12" md="6">
                      {itemData.message}
                    </Colxx>
                  </Row>
                </CardBody>
              </div>
            </Card>
          </Colxx>
        );
      })}
    </Row>
  );
};

export default Feedback;
