import * as React from 'react';
import { Link } from 'gatsby';

import Page from '../components/Page';
import Container from '../components/Container';

const browser = typeof window !== 'undefined' && window;

const NotFoundPage = () => browser && (
  <Page>
    <Container>
      <h1>404: Page not found.</h1>
      <p>
          You've hit the void.
        {' '}
        <Link to="/">Go back.</Link>
      </p>
    </Container>
  </Page>
);

export default NotFoundPage;
