import React, { Component } from 'react';
import {
  Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from 'actions/authActions';
import { clearErrors } from 'actions/errorActions';

/**
 * This method is used to render the RegisterModal component.
 */
class RegisterModal extends Component {
  state = {
    modal: false,
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    country: '',
    msg: null,
    registersuccess: false,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.setState({ registersuccess: true });
        setTimeout(this.handleToggleModal, 2000);
      }
    }
  }

  handleToggleModal = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleInputOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegisterFormOnSubmit = (e) => {
    e.preventDefault();

    const {
      firstname, lastname, username, email, password, country,
    } = this.state;

    // Create user object
    const newUser = {
      firstname,
      lastname,
      username,
      email,
      password,
      country,
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.handleToggleModal} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.handleToggleModal}>
          <ModalHeader toggle={this.handleToggleModal}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            {this.state.registersuccess ? (
              <Alert color="success">Registeration Successful!</Alert>
            ) : null}
            <Form onSubmit={this.handleRegisterFormOnSubmit}>
              <FormGroup>
                <Label for="firstname">FirstName</Label>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Firstname"
                  className="mb-3"
                  onChange={this.handleInputOnChange}
                />

                <Label for="lastname">LastName</Label>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Lastname"
                  className="mb-3"
                  onChange={this.handleInputOnChange}
                />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.handleInputOnChange}
                />

                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
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

                {/* <Label for="country">Country</Label> */}
                {/* <Input */}
                {/*  type="text" */}
                {/*  name="country" */}
                {/*  id="country" */}
                {/*  placeholder="country" */}
                {/*  className="mb-3" */}
                {/*  onChange={this.handleInputOnChange} */}
                {/* /> */}
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
  mapStateToProps,
  { register, clearErrors },
)(RegisterModal);
