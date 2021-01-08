import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { logout, hasRole, isAuthenticated } from '../../auth/auth';
import AdminRoutesEnum from '../../enums/AdminRoutesEnum';
import NotAuthRoutesEnum from '../../enums/NotAuthRoutesEnum';
import UserRolesEnum from '../../enums/UserRolesEnum';
import UserRoutesEnum from '../../enums/UserRoutesEnum';

interface AppProps {
  testProp?: string;
}

interface AppState {
  testProp?: string;
}

class NavigationBar extends React.PureComponent<AppProps, AppState> {
  render() {
    return (
      <header className="header-6">
        <div className="branding">
          <NavLink to={UserRoutesEnum.HOME} className="nav-link">
            <span className="title">Service Manager</span>
          </NavLink>
        </div>
        <div className="header-nav">
          { !isAuthenticated()
          && <NavLink to={NotAuthRoutesEnum.LOGIN} className="nav-link">Login</NavLink>}

          { isAuthenticated()
          && <NavLink to={UserRoutesEnum.HOME} className="nav-link">Home</NavLink>}

          { isAuthenticated()
          && <NavLink to={UserRoutesEnum.SERVICESTORE} className="nav-link nav-text">Service Store</NavLink>}

          { hasRole(UserRolesEnum.ADMIN)
          && <NavLink to={AdminRoutesEnum.OPERATORSTORE} className="nav-link nav-text">Operator Store</NavLink>}

        </div>
        <div className="header-actions">
          { isAuthenticated()
          && (
          <Link to={NotAuthRoutesEnum.LOGIN} onClick={logout} className="nav-link nav-text">
            Log Out
          </Link>
          )}
        </div>
      </header>
    );
  }
}

export default NavigationBar;
