import React, { useState } from 'react';
import {
  Row,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Details from './menuview/details';

import Custombreadcrumb from '../elements/Custombreadcrum';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

const Menuview = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Menu Name</h1>
          <Custombreadcrumb append={'/view?p=1212121221323'} appendname={'Chef Name'} match={match} />
          <Details />
        </Colxx>
      </Row>
    </>
  );
};
export default Menuview;
