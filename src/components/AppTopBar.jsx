/* eslint-disable react/no-unused-state */
import {
  Button, Nav, Navbar, NavItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import LoginModal from 'pages/auth/LoginModal.jsx';
import { Component } from 'react';
import { connect } from 'react-redux';
import RegisterModal from 'pages/auth/RegisterModal.jsx';
import Logout from 'pages/auth/Logout.jsx';

/**
 * This component is the top bar of the application
 */
class AppTopBar extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isOpen: false,
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <>
        <NavItem>
          <span className="nav-link">
            <strong>{user ? `Welcome ${user.username}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );

    const guestLinks = (
      <>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </>
    );
    const { togglefunc: tfunction } = this.props;
    return (
      <Navbar
        color="light"
        light
        className="navbar shadow-sm p-3 mb-2 bg-white rounded"
        expand="md"
      >
        <Button color="secondary" onClick={tfunction}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <div className="sidebar-header">
          <h3>Solar Offset</h3>
        </div>

        <Nav className="ml-auto" navbar>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>

      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(AppTopBar);
