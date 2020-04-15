import * as React from 'react';
import GlobalContextProvider from './src/context';

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
);
