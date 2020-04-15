import * as React from 'react';
import find from 'ramda/es/find';
import propEq from 'ramda/es/propEq';
import prop from 'ramda/es/prop';
import styled from '@emotion/styled';
import {
  Container, Row, Col,
} from 'reactstrap';
import { GlobalStateContext } from '../context';
import HeaderAvatarDropdown from './HeaderAvatarDropdown';

const RowWithBorder = styled(Row)`
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
`;

function DashboardHeader({ children }): JSX.Element {
  const { data: { campaigns }, selectedCampaignId } = React.useContext(GlobalStateContext);
  const campaign = React.useMemo(() => find(propEq('id', selectedCampaignId))(campaigns), [selectedCampaignId]);
  return (
    <div className="header pb-8 pt-5">
      <Container fluid>
        <RowWithBorder className="bg-secondary">
          <Col className="d-flex flex-column justify-content-center" xs="7">
            <h1 className="display-3 text-black">
              { prop('name', campaign) }
            </h1>
            {/* <h3 className="mb-0 text-uppercase d-lg-inline-block">
              { prop('name', campaign) }
            </h3> */}
          </Col>
          <Col className="d-flex flex-row-reverse d-md-flex" xs="5">
            <HeaderAvatarDropdown avatarTextColor="dark" />
          </Col>
        </RowWithBorder>
        { children }
      </Container>
    </div>
  );
}

export default DashboardHeader;
