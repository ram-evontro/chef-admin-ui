import React, { useState } from 'react';
import {
  Row,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
} from 'reactstrap';
import Menu from './singleview/menu';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from 'components/common/CustomBootstrap';
const Allmenus = ({match}) => {
  return (
    <Row>
      <Colxx xxs="12">
      <Breadcrumb heading="menu.allmenus" match={match} />
        <Menu />
      </Colxx>
    </Row>
  );
};

export default Allmenus;
