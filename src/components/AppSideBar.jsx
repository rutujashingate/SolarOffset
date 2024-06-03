import classNames from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useSelector } from 'react-redux';
import {
  faFlagCheckered, faMoneyBill1Wave, faPaperPlane, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { COUNTRIES_LISTING_PAGE, USER_FUNDING_LISTING } from 'navigation/routes/index.js';

/**
 * This component is the sidebar of the application
 * @param isOpen
 * @returns {JSX.Element}
 * @constructor
 */
function AppSideBar({ isOpen }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className={classNames('sidebar', { 'is-open': isOpen })}>
      <div className="app-sidebar side-menu">
        <h3 className="p-4 text-white fw-bold">Solar Offset</h3>
        {(isAuthenticated && user?.role === 'admin') ? (
          <Nav vertical className="list-unstyled pb-3">
            <NavItem className="nav-item">
              <NavLink tag={Link} to="/admin">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Admin Panel
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav vertical className="list-unstyled pb-3">
            <NavItem className="nav-item">
              <NavLink tag={Link} to="/">
                <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink tag={Link} to={COUNTRIES_LISTING_PAGE}>
                <FontAwesomeIcon icon={faFlagCheckered} className="me-2" />
                Countries
              </NavLink>
            </NavItem>
            {(isAuthenticated && user?.role === 'user')
              ? (
                <NavItem className="nav-item">
                  <NavLink tag={Link} to={USER_FUNDING_LISTING}>
                    <FontAwesomeIcon icon={faMoneyBill1Wave} className="me-2" />
                    Funding
                  </NavLink>
                </NavItem>
              ) : null}
          </Nav>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(AppSideBar);
