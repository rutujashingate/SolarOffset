import AuthCard from 'components/AuthCard';
import { Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { APP_SIGNUP_PAGE } from 'navigation/routes/index';
import DashboardLayout from 'layout/DashboardLayout';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

/**
 * This method is used to render the Login Screen.
 * @returns {JSX.Element}
 * @constructor
 */
function LoginScreen() {
  const [loginDet, setloginDet] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate(APP_SIGNUP_PAGE);
  };
  const onChange = (e) => {
    setloginDet({ ...loginDet, [e.target.name]: e.target.value });
  };
  const onClick = () => {
    axios.post('http://localhost:3000/auth/login', { ...loginDet })
      .then((res) => console.log(res.data));
  };
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-center align-items-center h-100">
        <AuthCard
          title="Login in to your account"
          rightHeading="New Here ?"
          rightBtnText="Sign Up"
          rightBtnAction={handleNavigateToSignUp}
        >
          <Input placeholder="Username" name="username" type="email" className="my-3" onChange={onChange} />
          <Input placeholder="Password" name="password" type="password" className="my-3" onChange={onChange} />
          <Button className="px-5 my-3" onClick={onClick}>
            Sign In
          </Button>
        </AuthCard>
      </div>
    </DashboardLayout>
  );
}

export default (LoginScreen);
