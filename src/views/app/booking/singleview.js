import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import UserCardBasic from 'components/cards/UserCardBasic';
import {dinerData} from 'data/diners';
import posts from 'data/posts';
import Log from './singleview/log';
import Diners from './singleview/diners';
const Singleview = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');
  return (
    <Row>
      <Colxx xxs="12">
        <Breadcrumb match={match} />
        <Nav tabs className="separator-tabs ml-0 mb-5">
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === 'details',
                'nav-link': true,
              })}
              onClick={() => {
                setActiveTab('details');
              }}
              location={{}}
              to="#"
            >
              <IntlMessages id="pages.details" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === 'diners',
                'nav-link': true,
              })}
              onClick={() => {
                setActiveTab('diners');
              }}
              location={{}}
              to="#"
            >
              <IntlMessages id="pages.diners" />
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="details">
            <Row>
              <Colxx xxs="12" lg="5" className="mb-4 col-left">
                <Card className="mb-2">
                  <CardBody>
                    <CardTitle>
                      <h3>Host Details</h3>
                    </CardTitle>
                    <p> <b>Name:</b> Customer</p>
                    <p> <b>Email:</b> Customer@email.com</p>
                    <p> <b>Phone:</b> 9829012345</p>
                  </CardBody>
                </Card>
                <Card className="mb-2">
                  <CardBody>
                  <CardTitle>
                      <h3>Order Details</h3>
                    </CardTitle>
                    <p> <b>Order No:</b> 1234</p>
                    <p> <b>Type:</b> Virtual Dining</p>
                    <p> <b>Diner Count:</b> 12</p>
                    <p> <b>Order status:</b> Order Plcaed</p>
                    <p> <b>Additional message:</b> Please make it less spicy</p>
                  </CardBody>
                </Card>
                <Card className="mb-2">
                  <CardBody>
                  <CardTitle>
                      <h3>Payment Details</h3>
                    </CardTitle>
                    <p> <b>Payment Method:</b> Online</p>
                    <p> <b>Trancation No:</b> 1234243434343</p>
                    <p> <b>Status:</b> Paid</p>
                    <p> <b>Date:</b> 12-12-2000</p>
                   
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" lg="7" className="mb-4 col-right">
              {posts.map((itemData) => {
                    return (
                      <Log
                        data={itemData}
                        key={`post_${itemData.key}`}
                        className="mb-4"
                      />
                    );
                  })}
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="diners">
            <Row>
              <Diners diners={dinerData} />
            </Row>
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>
  );
};

export default Singleview;
