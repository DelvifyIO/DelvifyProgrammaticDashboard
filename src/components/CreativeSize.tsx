import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from '@emotion/styled';
import {
  Card, CardBody, CardHeader, Row, Col,
} from 'reactstrap';
import Spinner from './Spinner';
import { GlobalStateContext } from '../context';
import { useSetCreativeSize } from '../hooks';

const PieWrapper = styled.div`
  max-height: 340px;
`;

const pieOptions = {
  legend: {
    display: true,
  },
};

function CreativeSize(): JSX.Element {
  const { queryIds, selectedCampaignId } = React.useContext(GlobalStateContext);

  const { isLoading, data } = useSetCreativeSize({
    qid: queryIds['30daysCreative'],
    selectedCampaignId,
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <Card style={{ height: '100%' }} className="shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <Col>
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Last 30 days
            </h6>
            <h3 className="mb-0">Conversions by Creative Size</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <PieWrapper className="chart">
          <Pie
            data={data}
            options={pieOptions}
          />
        </PieWrapper>
      </CardBody>
    </Card>
  );
}

export default CreativeSize;
