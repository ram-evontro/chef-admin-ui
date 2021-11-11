import React from "react";
import { Row, Card, CardBody, CardSubtitle, CardImg, CardText, CustomInput, Badge } from "reactstrap";
import { adminRoot } from "constants/defaultValues";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "components/common/CustomBootstrap";

const ImageListView = ({ menu, isSelect, collect, onCheckItem,id }) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={menu.id}>
      <ContextMenuTrigger id="menu_id" data={menu.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, menu.id)}
          className={classnames({
            active: isSelect,
          })}
        >
          <div className="position-relative">
            <NavLink to={`${adminRoot}/chef/menuview?p=${id}&menu=${menu.id}`} className="w-40 w-sm-100">
              <CardImg className="menu_fixed_image" top alt={menu.title} src={menu.cover_picture} />
            </NavLink>
            <Badge color={menu.status ? "primary" : "secondary"} pill className="position-absolute badge-top-left">
              {menu.status ? "Active" : "Inactive"}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput className="item-check mb-0" type="checkbox" id={`check_${menu.id}`} checked={isSelect} onChange={() => {}} label="" />
              </Colxx>
              <Colxx xxs="10">
                <CardSubtitle>{menu.title.substring(0, 25)}</CardSubtitle>
              </Colxx>
              <Colxx xxs="12">
                <CardText className="text-muted text-small mb-0 font-weight-light">{menu.desc.padEnd(50).substring(0, 35)}...</CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);
