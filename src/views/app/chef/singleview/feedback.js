import React, { useState } from 'react';
import { Row,Card,CardBody } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import Rating from 'components/common/Rating';
import friendsData from 'data/follow';
const Feedback = () => {
  return (
    <Row>
      {friendsData.map((itemData) => {
        return (
          <Colxx xxs="12">
            <Card className="card d-flex mb-3">
              <div className="d-flex flex-grow-1 min-width-zero">
                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                <img
            alt=""
            src="/assets/img/profiles/l-4.jpg"
            className="img-thumbnail border-0 rounded-circle ml-0 mr-4 list-thumbnail align-self-center small"
          />
                <Rating total={5} rating={3} interactive={false} />
                <br />
                    <p>Some feedback text</p>
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
