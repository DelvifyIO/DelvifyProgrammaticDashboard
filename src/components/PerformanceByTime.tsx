import * as React from 'react';
import {
  Card, CardBody, CardHeader, Row, Col,
} from 'reactstrap';
import styled from '@emotion/styled';
import Spinner from './Spinner';
import PerformanceByTimeLegend from './PerformanceByTimeLegend';
import { GlobalStateContext } from '../context';
import { useSetPerformanceByTime } from '../hooks';

const StyledCol = styled(Col)`
  height: 10px;
  margin-left: 2px;
  font-size: 0.5rem;
  color: rgba(0, 0, 0, 0.8);
  padding: 0;
  /* text-align: center; */
  ${({ amt, rangecap }) => amt > 0 && rangecap && `background-color: rgba(0,126,214,${amt / rangecap});`}
  ${({ amt, rangecap }) => amt === 0 && rangecap && 'background-color: rgba(0,0,0,0.05);'}
  ${({ num }) => num > 1 && `text-align: ${num < 3 ? 'center' : 'right'};`}
`;

const mapKeyToTime = {
  0: '12am',
  2: '2am',
  4: '4am',
  6: '6am',
  8: '8am',
  10: '10am',
  12: '12pm',
  14: '2pm',
  16: '4pm',
  18: '6pm',
  20: '8pm',
  22: '10pm',
};

function PerformanceByTime(): JSX.Element {
  const { queryIds, selectedCampaignId } = React.useContext(GlobalStateContext);

  const { data, rangeCap, isLoading } = useSetPerformanceByTime(
    queryIds['30daysTimeofday'],
    selectedCampaignId,
  );

  return isLoading && data.length === 0 ? (
    <Spinner />
  ) : (
    <Card className="shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <Col>
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Last 30 days
            </h6>
            <h3 className="mb-0">Conversions by Time Of Day</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pl-3 pr-6">
        {data.map((outer, key) => (
          <Row className="mt-1" key={key}>
            <StyledCol className="text-right">
              <span className="pr-1">{ key % 2 === 0 && `${mapKeyToTime[key]}` }</span>
            </StyledCol>
            {outer.map((amt, i) => (
              <StyledCol
                key={`${selectedCampaignId}:${i}`}
                amt={amt}
                rangecap={rangeCap}
              />
            ))}
          </Row>
        ))}
        <Row className="mt-1">
          <StyledCol />
          <StyledCol>Sun</StyledCol>
          <StyledCol>Mon</StyledCol>
          <StyledCol>Tue</StyledCol>
          <StyledCol>Wed</StyledCol>
          <StyledCol>Thu</StyledCol>
          <StyledCol>Fri</StyledCol>
          <StyledCol>Sat</StyledCol>
        </Row>
        <Row className="mt-3">
          {/* Margin between Legend and Chart */}
          <Col />
          <PerformanceByTimeLegend rangecap={8} StyledCol={StyledCol} />
        </Row>
      </CardBody>
    </Card>
  );
}

export default PerformanceByTime;
