import * as React from 'react';
import {
  Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { GlobalStateContext, GlobalDispatchContext } from '../context';

type PageHeaderProps = {
  title: string;
}

const mapDaysToTitle = {
  60: 'Last 60 Days',
  30: 'Last 30 Days',
  14: 'Last 14 Days',
  7: 'Last 7 Days',
  1: 'Yesterday',
};

function PageHeader({ title }: PageHeaderProps): JSX.Element {
  const { headlineDateRange } = React.useContext(GlobalStateContext);
  const dispatch = React.useContext(GlobalDispatchContext);
  const headlineDateRangeString = headlineDateRange.toString();
  const handleSelectClick = (days) => () => {
    dispatch({
      type: 'SET_HEADLINE_DATE_RANGE',
      value: days,
    });
  };
  return (
    <Row className="mb-3">
      <Col className="d-flex flex-column justify-content-center" sm="5">
        <h6 className="h2 d-inline-block mb-0">
          { title }
        </h6>
      </Col>
      <Col className="d-flex flex-row-reverse d-md-flex" sm="7">
        <UncontrolledDropdown>
          <DropdownToggle caret>
            { mapDaysToTitle[headlineDateRangeString] }
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            { Object.entries(mapDaysToTitle).map(([key, value]) => key !== headlineDateRangeString && (
              <DropdownItem key={value} onClick={handleSelectClick(Number(key))}>
                { value }
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
    </Row>
  );
}

export default PageHeader;
