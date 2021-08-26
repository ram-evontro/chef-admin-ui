import React from 'react';
import { Row, Card, CardBody, CardTitle, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Datatable from '../elements/Datatable';
const Cheftypes = ({ match }) => {
    
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.chef_types" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
            <Datatable />
        </Colxx>
      </Row>
    </>
  );
};

export default Cheftypes;
