import React, { Suspense } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import { Router } from '@reach/router'

import Amplify from 'aws-amplify'
import config from '../aws-exports'

const Dashboard = React.lazy(() => import('./dashboard'));
const Login = React.lazy(() => import('./login'));
const Register = React.lazy(() => import('./register'));
const Admin = React.lazy(() => import('./register'));

const LoadingBackground = styled.div`
  background-color: #129EF0;
`;

Amplify.configure(config);

const Root = () => {
  return (
    <Layout>
      <Router>
        <Suspense fallback={<LoadingBackground />}>
          <Dashboard path="/dashboard"/>
          <Login path="/login"/>
          <Register path="/register"/>
          <Admin path="/admin"/>
        </Suspense>
      </Router>
    </Layout>
  )
};

export default Root;
