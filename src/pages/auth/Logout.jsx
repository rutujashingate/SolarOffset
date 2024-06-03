import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';

/**
 * This modal is used to render the Logout component.
 */
class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <NavLink onClick={this.props.logout} tag={Link} to="/">
        Logout
      </NavLink>
    );
  }
}

export default connect(
  null,
  { logout },
)(Logout);
