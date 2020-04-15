import * as React from 'react';
import {
  Card, CardBody, CardHeader, Row, Col, Progress,
} from 'reactstrap';

const mapDeviceToIconClass = {
  Tablet: 'ni ni-tablet-button',
  Desktop: 'ni ni-laptop',
  'Smart Phone': 'ni ni-mobile-button',
};
function DevicePerformance({ data }): JSX.Element {
  return (
    <Card className="shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <Col>
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Last 30 days
            </h6>
            <h3 className="mb-0">Conversions by Device</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        {data.map((device) => (
          <div key={device.deviceType} className="progress-wrapper">
            <div className="progress-info">
              <div className="progress-label">
                <i className={mapDeviceToIconClass[device.deviceType]} />
                {' '}
                <span>{device.deviceType}</span>
              </div>
              <div className="progress-percentage">
                <span>
                  {`${device.conversionPercentage.toFixed(0)}%`}
                </span>
              </div>
            </div>
            <Progress max="100" value={device.conversionPercentage} color={device.barColor} />
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

export default DevicePerformance;
