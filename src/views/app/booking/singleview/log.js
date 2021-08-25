/* eslint-disable react/no-array-index-key */
import React from 'react';
import { injectIntl } from 'react-intl';
import {
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import Logcard from './logcard';
const renderComments = (data) => {
  return data.comments.map((item, index) => {
    return <Logcard data={item} key={index} />;
  });
};

const Log = ({ data, className, intl }) => {
  const { messages } = intl;
  return (
    <Card className={className}>
      <CardBody>
          <CardTitle>
          {messages['pages.order_log']}
          </CardTitle>
        <div className="mt-5 remove-last-border">{renderComments(data)}</div>
        <InputGroup className="comment-container">
          <Input placeholder={messages['pages.add_details']} />
          <InputGroupAddon addonType="append">
            <Button color="primary">
              <span className="d-inline-block">{messages['pages.save']}</span>
              <i className="simple-icon-arrow-right ml-2" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default injectIntl(React.memo(Log));
