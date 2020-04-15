import * as React from 'react';
import {
  Card,
  Container,
  Row,
  Col,
} from 'reactstrap';
import HomeTable from './HomeTable';

import UserHeader from './UserHeader';
import { GlobalStateContext } from '../context';
import { makeCampaigns } from '../transforms';

function Home(): JSX.Element {
  const { data: { campaigns, alltimeMetrics } } = React.useContext(GlobalStateContext);

  const transformedCampaigns = React.useMemo(
    () => makeCampaigns(campaigns, alltimeMetrics),
    [campaigns, alltimeMetrics],
  );

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="bg-secondary shadow">
              <HomeTable data={transformedCampaigns} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
