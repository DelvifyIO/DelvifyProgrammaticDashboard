import * as React from 'react';
import { navigate } from 'gatsby';
import { Button } from 'reactstrap';

import { GlobalDispatchContext } from '../context';

function HomeTableViewButton({ row }): JSX.Element {
  const dispatch = React.useContext(GlobalDispatchContext);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch({
      type: 'SET_SELECTED_CAMPAIGN_ID',
      value: row.original.googleId,
    });
    navigate('dashboard/overview');
  };

  return (
    <div className="d-flex justify-content-center">
      <Button className="btn-icon btn-3" type="button" color="primary" onClick={handleClick}>
        <span className="btn-inner--icon">
          <i className="fas fa-search" />
        </span>
        <span className="btn-inner--text">View</span>
      </Button>
    </div>
  );
}

export default HomeTableViewButton;
