/* eslint-disable */
import React, { Component } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from 'actions/authActions';
import { clearErrors } from 'actions/errorActions';

/**
 * This method is used to render the LoginModal component.
 */
class LoginModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props;
    if ( error !== prevProps.error ) {
      // Check for register error
      if ( error.id === 'LOGIN_FAIL' ) {
        this.setState({msg: error.msg.msg});
      } else {
        this.setState({msg: null});
      }
    }

    // If authenticated, close modal
    if ( this.state.modal ) {
      if ( isAuthenticated ) {
        this.handleToggleModal();
      }
    }
  }

  handleToggleModal = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      modal: !this.state.modal,
    });
  };

  handleInputOnChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleFormOnSubmit = e => {
    e.preventDefault();

    const {email, password} = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.handleToggleModal} href='#'>
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.handleToggleModal}>
          <ModalHeader toggle={this.handleToggleModal}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.handleFormOnSubmit}>
              <FormGroup>
                <Label for="username">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="username"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.handleInputOnChange}
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.handleInputOnChange}
                />
                <Button color="dark" style={{marginTop: '2rem'}} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
  mapStateToProps,
  {login, clearErrors},
)(LoginModal);
