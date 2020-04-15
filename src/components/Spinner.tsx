import * as React from 'react';
import {
  Spinner,
} from 'reactstrap';

export default (): JSX.Element => (
  <div className="d-flex flex-row justify-content-center align-items-center p-5">
    <Spinner type="grow" color="danger" style={{ width: '3rem', height: '3rem' }} />
    <Spinner type="grow" color="info" style={{ width: '3rem', height: '3rem' }} />
    <Spinner type="grow" color="warning" style={{ width: '3rem', height: '3rem' }} />
  </div>
);
