import * as React from 'react';
import {
  Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';
import styled from '@emotion/styled';
import { GlobalStateContext } from '../context';
import Spinner from './Spinner';
import { useHeadlineStats } from '../hooks';

const ChangeWrapper = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  ${({ isPositive }) => `color: ${isPositive ? '#2dce89' : '#f5365c'};`}
`;

const NON_FINITE_DISPLAY = 'N/A';

function HeadlineStats(): JSX.Element {
  const {
    data: { dailyMetrics }, selectedCampaignId, queryIds: { dailyMetrics: qid }, headlineDateRange,
  } = React.useContext(GlobalStateContext);

  const { isLoading, stats } = useHeadlineStats({
    qid, dailyMetrics, selectedCampaignId, headlineDateRange,
  });

  return isLoading ? (<Spinner />) : (
    <>
      <Row className="mb-4">
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Impressions
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">
                    {stats.impressions.val.toLocaleString()}
                  </span>
                </Col>
                <Col className="col-auto">
                  { headlineDateRange < 60 && (
                    <ChangeWrapper isPositive={stats.impressions.change > 0}>
                      <i className={`ni ni-bold-${stats.impressions.change > 0 ? 'up' : 'down'} mr-1`} />
                      {isFinite(stats.impressions.change) ? `${Math.round(Math.abs(stats.impressions.change))}%` : NON_FINITE_DISPLAY}
                    </ChangeWrapper>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Clicks
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">
                    {stats.clicks.val.toLocaleString()}
                  </span>
                </Col>
                <Col className="col-auto">
                  { headlineDateRange < 60 && (
                    <ChangeWrapper isPositive={stats.clicks.change > 0}>
                      <i className={`ni ni-bold-${stats.clicks.change > 0 ? 'up' : 'down'} mr-1`} />
                      {isFinite(stats.clicks.change) ? `${Math.round(Math.abs(stats.clicks.change))}%` : NON_FINITE_DISPLAY}
                    </ChangeWrapper>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    CTR %
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">
                    {stats.ctr.val.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </Col>
                <Col className="col-auto">
                  { headlineDateRange < 60 && (
                    <ChangeWrapper isPositive={stats.ctr.change > 0}>
                      <i className={`ni ni-bold-${stats.ctr.change > 0 ? 'up' : 'down'} mr-1`} />
                      {isFinite(stats.ctr.change) ? `${Math.round(Math.abs(stats.ctr.change))}%` : NON_FINITE_DISPLAY}
                    </ChangeWrapper>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Spend
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">
                    {`$${stats.spend.val.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  </span>
                </Col>
                <Col className="col-auto">
                  {headlineDateRange < 60 && (
                    <ChangeWrapper isPositive={stats.spend.change > 0}>
                      <i className={`ni ni-bold-${stats.spend.change > 0 ? 'up' : 'down'} mr-1`} />
                      {isFinite(stats.spend.change) ? `${Math.round(Math.abs(stats.spend.change))}%` : NON_FINITE_DISPLAY}
                    </ChangeWrapper>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    CPM
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">
                    {`$${stats.cpm.val.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  </span>
                </Col>
                <Col className="col-auto">
                  { headlineDateRange < 60 && (
                    <ChangeWrapper isPositive={stats.cpm.change > 0}>
                      <i className={`ni ni-bold-${stats.cpm.change > 0 ? 'up' : 'down'} mr-1`} />
                      {isFinite(stats.cpm.change) ? `${Math.round(Math.abs(stats.cpm.change))}%` : NON_FINITE_DISPLAY}
                    </ChangeWrapper>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    CPC
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">
                    {`$${stats.cpc.val.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  </span>
                </Col>
                <Col className="col-auto">
                  {headlineDateRange < 60 && (
                    <ChangeWrapper isPositive={stats.cpc.change > 0}>
                      <i className={`ni ni-bold-${stats.cpc.change > 0 ? 'up' : 'down'} mr-1`} />
                      {isFinite(stats.cpc.change) ? `${Math.round(Math.abs(stats.cpc.change))}%` : NON_FINITE_DISPLAY}
                    </ChangeWrapper>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Conversions
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">
                    {stats.conversions.val.toLocaleString()}
                  </span>
                </Col>
                <Col className="col-auto" pl={0}>
                  { headlineDateRange < 60 && (
                    <ChangeWrapper isPositive={stats.conversions.change > 0}>
                      <i className={`ni ni-bold-${stats.conversions.change > 0 ? 'up' : 'down'} mr-1`} />
                      {isFinite(stats.conversions.change) ? `${Math.round(Math.abs(stats.conversions.change))}%` : NON_FINITE_DISPLAY}
                    </ChangeWrapper>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-5 mb-xl-0">
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    CPA
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">
                    {`$${stats.cpa.val.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  </span>
                </Col>
                <Col className="col-auto">
                  { headlineDateRange < 60 && (
                    <ChangeWrapper isPositive={stats.cpa.change > 0}>
                      <i className={`ni ni-bold-${stats.cpa.change > 0 ? 'up' : 'down'} mr-1`} />
                      {isFinite(stats.cpa.change) ? `${Math.round(Math.abs(stats.cpa.change))}%` : NON_FINITE_DISPLAY}
                    </ChangeWrapper>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default HeadlineStats;
