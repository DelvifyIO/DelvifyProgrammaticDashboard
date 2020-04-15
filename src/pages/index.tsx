import * as React from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';

import { getToken } from '../utils/auth';

const LoadingBackground = styled.div`
  background-color: #129EF0;
`;

const Root = () => {
  React.useEffect(() => {
    if (getToken()) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, []);

  return <LoadingBackground />;
};

export default Root;
