import * as React from 'react';
import { State, Dispatch } from './types';
import reducers, { initialState } from './reducers';

export const GlobalStateContext = React.createContext<State>(initialState);
export const GlobalDispatchContext = React.createContext<Dispatch>(() => initialState);
export * from './reducers';
export * from './types';

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducers, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
