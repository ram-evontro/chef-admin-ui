import React from "react";
import { Row, Card, CardBody} from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
const Support = ({ match }) => {
  return (
    <React.Fragment>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.support" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <div className="text-center">
                <i className={`iconsminds-security-settings large-icon`} />
                <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">Need help or found a bug?</h5>
                <div className="pl-3 pr-3 pt-3 pb-0 d-flex flex-column flex-grow-1">
                  <p className="mb-4">Contact us on +91-9999999999</p>
                  <p className="mb-4">Mail us on info@abcd.com</p>
                </div>
              </div>
              <div className="text-right">
              <p className="text-muted mb-4">Software version 1.2</p>
              <p className="text-muted mb-1">Made with <i className="text-danger simple-icon-heart"></i></p>
              <p className="text-muted mb-4">by Monk Tech Labs</p>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </React.Fragment>
  );
};

export default Support;
