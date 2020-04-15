import * as React from 'react';
import {
  Card, CardBody, Container, Row, Col,
} from 'reactstrap';
import DashboardHeader from './DashboardHeader';
import PageHeader from './PageHeader';
import HeadlineStats from './HeadlineStats';
import LineGraph from './LineGraph';
import { GlobalStateContext, GlobalDispatchContext } from '../context';
import { useInitOverview } from '../hooks';
import hasConversions from '../utils/hasConversions';
import Spinner from './Spinner';
import RegionPerformance from './RegionPerformance';
import PerformanceByTime from './PerformanceByTime';
import InsertionOrderBreakdown from './InsertionOrderBreakdown';
import CreativeSize from './CreativeSize';
import ContactCard from './ContactCard';
import DevicePerformance from './DevicePerformance';

const maxHeight = { height: '100%' };

function Overview(): JSX.Element {
  const state = React.useContext(GlobalStateContext);
  const { isLoading, devicePerformanceData } = useInitOverview(
    state,
    React.useContext(GlobalDispatchContext),
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <DashboardHeader>
        <PageHeader title="Campaign Overview" />
        <HeadlineStats />
      </DashboardHeader>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0">
            {state.data.dailyMetrics.length > 0 && state.selectedCampaignId ? (
              <LineGraph />
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          <Col>
            <InsertionOrderBreakdown />
          </Col>
        </Row>
        { hasConversions(devicePerformanceData.map((e) => e.conversionPercentage)) ? (
          <>
            <Row className="mb-5" style={{ height: '520px' }}>
              <Col sm={6} style={maxHeight}>
                <PerformanceByTime />
              </Col>
              <Col sm={6} style={maxHeight}>
                <CreativeSize />
              </Col>
            </Row>
            <Row className="mb-5" style={{ height: '630px' }}>
              <Col md={7} style={maxHeight}>
                <RegionPerformance />
              </Col>
              <Col md={5} style={maxHeight}>
                <Row className="mb-5">
                  <Col>
                    <DevicePerformance data={devicePerformanceData} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ContactCard />
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <Row className="mb-5" style={{ height: '220px' }}>
            <Col md={7} style={maxHeight}>
              <Card style={maxHeight}>
                <CardBody className="d-flex justify-content-center align-items-center">
                  There were no conversions in the past 30 days
                </CardBody>
              </Card>
            </Col>
            <Col md={5} style={maxHeight}>
              <ContactCard />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Overview;
