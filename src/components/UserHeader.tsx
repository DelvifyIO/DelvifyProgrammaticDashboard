import * as React from 'react';
import {
  Container, Row, Col,
} from 'reactstrap';
import { GlobalStateContext } from '../context';
import HeaderAvatarDropdown from './HeaderAvatarDropdown';

import backgroundImgUrl from '../assets/img/theme/home-cover-gradient.jpg';

const UserHeader = () => {
  const state = React.useContext(GlobalStateContext);
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-6 d-flex align-items-center"
        style={{
          minHeight: '300px',
          backgroundImage:
                `url(${backgroundImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        {/* <span className="mask bg-gradient-default opacity-8" /> */}
        {/* Header container */}
        <Container fluid>
          <Row>
            <Col xs="8" className="d-flex flex-column pt-5">
              <h1 className="display-2 text-white">
                {`Hello ${state.name}`}
              </h1>
              <p className="text-white mt-0 mb-5">
                Which account would you like to review today?
              </p>
            </Col>
            <Col className="d-flex flex-row-reverse d-md-flex" xs="4">
              <HeaderAvatarDropdown />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
