import * as React from 'react';
import {
  Container, Row, Card, Col,
} from 'reactstrap';
import Layout from './Layout';

const AuthLayout: React.FC = ({ children }) => {
  React.useEffect(() => {
    document.body.classList.add('bg-default');
    return () => {
      document.body.classList.remove('bg-default');
    };
  }, []);
  return (
    <Layout>
      <div className="main-content">
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="fill-default" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">{children}</Row>
        </Container>
      </div>
      {/* <AuthFooter /> */}
    </Layout>
  );
};

export default AuthLayout;
