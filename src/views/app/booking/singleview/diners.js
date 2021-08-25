import React from 'react';
import { Card, CardBody, Badge, CustomInput } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import ThumbnailImage from 'components/cards/ThumbnailImage';
const DinerItem = ({ item }) => {
  return (
    <Colxx xxs="12" md="4">
      <Card className="card mb-3">
        <div style={{width:'100%'}} className=" min-width-full">
          <CardBody className="align-self-center d- min-width-zero align-items-md-center">
            <NavLink
              to="#"
              location={{}}
              id={`toggler${item.id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              <ThumbnailImage
                rounded
                small
                src="/assets/img/profiles/l-2.jpg"
                alt="profile"
                className="m-4"
              />
              <span className="align-middle d-inline-block">{item.title}</span>
            </NavLink>
            <p className="mb-1 text-muted text-small  w-xs-100">
              {item.category}
            </p>
            <p className="mb-1 text-muted text-small  w-xs-100">
              {item.createDate}
            </p>
          </CardBody>
        </div>
        <div className="card-body pt-1">
          <p><b>Menu:</b> Thai Deligths</p>
          <p><b>Preferences:</b> More Spicy</p>
          <p><b>Allergic to:</b> Mushrooms</p>
          <p><b>Address:</b> dfffsdfsfsdfsd</p>
          <p><b>Feedback:</b> dfffsdfsfsdfsd</p>
        </div>
      </Card>
    </Colxx>
  );
};

const Diners = (props) => {
  return (
    <>
      {props.diners.map((item, index) => (
        <DinerItem key={`todo_item_${index}`} item={item} />
      ))}
    </>
  );
};

export default Diners;
