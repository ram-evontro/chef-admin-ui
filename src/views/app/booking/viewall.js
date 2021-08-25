/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Card, CardBody, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import bookings from 'data/bookings';
import { adminRoot } from 'constants/defaultValues';
const BookingItem = (props) => {
  return (
    <Card className="d-flex flex-row mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <NavLink
            to={`${adminRoot}/booking/view?p=${props.details.id}`}
            className="list-item-heading mb-1 truncate w-40 w-xs-100"
          >
            {props.details.user.name}
          </NavLink>
          <p className="mb-1 text-muted text-small w-15 w-xs-100">
            {props.details.diner_count} Diners
          </p>
          <p className="mb-1 text-muted text-small w-15 w-xs-100">
            {props.details.type === 'delivery'
              ? 'Virtual Dining'
              : "Chef's Table"}
          </p>
          <p className="mb-1 text-muted text-small w-15 w-xs-100">
            {props.details.booking_date}
          </p>
          <div className="w-15 w-xs-100 text-right">
            <Badge color={'primary'} pill>
              {props.details.status}
            </Badge>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

const Viewall = ({match}) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.viewall" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx>
          {bookings.map((booking, index) => {
            return <BookingItem key={`booking_${index}`} details={booking} />;
          })}
        </Colxx>
      </Row>
    </>
  );
};

export default Viewall;
