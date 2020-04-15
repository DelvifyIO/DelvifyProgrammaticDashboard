import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

const NavbarImg = styled.img`
  margin: -1.5rem 0;
  max-height: 9rem;
`;

const Sidebar = ({ logo, routes }) => {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const toggleCollapse = (): void => setCollapseOpen(!collapseOpen);
  const closeCollapse = (): void => setCollapseOpen(false);

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
      <Container fluid>
        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0">
            <NavbarImg alt={logo.imgAlt} src={logo.imgSrc} />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none" />
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <NavbarBrand>
                  <NavbarImg alt={logo.imgAlt} src={logo.imgSrc} />
                </NavbarBrand>
              </Col>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>
            {routes.map((prop, key) => (
              prop.shouldShow && (
                <NavItem key={key}>
                  <Link
                    className="nav-link"
                    to={prop.path}
                    activeClassName="active"
                    onClick={closeCollapse}
                  >
                    <i className={prop.sidebarIcon} />
                    {prop.name}
                  </Link>
                </NavItem>
              )
            ))}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
