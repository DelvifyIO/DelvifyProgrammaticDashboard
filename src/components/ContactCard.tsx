import * as React from 'react';
import {
  Card, CardBody, Row, Col, Button,
} from 'reactstrap';

export default function ContactCard(): JSX.Element {
  return (
    <Card style={{ height: '100%' }} className="bg-gradient-danger">
      <CardBody>
        <div className="my-3">
          <div className="h6 surtitle text-light text-uppercase">Looking for more insights?</div>
          {/* <Button size="lg" color="secondary" type="button">
            Contact Support
          </Button> */}
          <Button href="mailto:support@delvify.io?subject=Contact Support" className="btn-icon btn-3 mt-2" color="secondary" size="lg" type="button">
            <span className="btn-inner--icon">
              <i className="ni ni-email-83" />
            </span>
            <span className="btn-inner--text">Contact Support</span>
          </Button>
          {/* <div>
            <i className="ni ni-email-83 text-primary" />
            <span className="h1 text-white">Contact Support</span>

          </div> */}
        </div>
        <Row>
          <Col>
            <span className="h6 surtitle text-light text-uppercase">Account Manager</span>
            <span className="d-block h3 text-white">Dan Lee</span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
