import * as React from 'react';
import { Link } from 'gatsby';
import {
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media,
} from 'reactstrap';
import { logout } from '../utils/auth';
import { GlobalStateContext, GlobalDispatchContext } from '../context';

type HeaderAvatarDropdownProps = {
  avatarTextColor?: string;
}

const HeaderAvatarDropdown = ({ avatarTextColor = 'light' }: HeaderAvatarDropdownProps): JSX.Element => {
  const { name } = React.useContext(GlobalStateContext);
  const dispatch = React.useContext(GlobalDispatchContext);
  const handleLogout = (): void => logout(() => {
    dispatch({
      type: 'LOGOUT',
    });
  });
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className="pr-0" nav>
        <Media className="align-items-center">
          <div className="bg-white avatar avatar-sm rounded-circle d-flex justify-content-center">
            <i className="ni ni-single-02 text-primary" />
          </div>
          <Media className="ml-2 d-none d-lg-block">
            <span className={`mb-0 text-sm font-weight-bold ${avatarTextColor === 'dark' ? 'text-dark' : 'text-white'}`}>
              { name }
            </span>
          </Media>
        </Media>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem href="mailto:support@delvify.io?subject=Dashboard Support">
          <i className="ni ni-support-16" />
          <span>Support</span>
        </DropdownItem>
        <DropdownItem href="mailto:support@delvify.io?subject=Dashboard Feedback">
          <i className="ni ni-notification-70" />
          <span>Feedback</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem href="#pablo" onClick={handleLogout} tag={Link} to="/login">
          <i className="ni ni-user-run" />
          <span>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default HeaderAvatarDropdown;
