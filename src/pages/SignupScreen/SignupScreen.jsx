import AuthCard from 'components/AuthCard';
import { Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { APP_LOGIN_PAGE } from 'navigation/routes/index';
import DashboardLayout from 'layout/DashboardLayout';

/**
 * This method is used to render the SignupScreen
 * @returns {JSX.Element}
 * @constructor
 */
function SignupScreen() {
  const navigate = useNavigate();
  const handleNavigateToLogIn = () => {
    navigate(APP_LOGIN_PAGE);
  };
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-center align-items-center h-100">
        <AuthCard
          title="Create Account"
          rightHeading="Have an account ?"
          rightBtnText="Sign In"
          flexReverse
          rightBtnAction={handleNavigateToLogIn}
        >
          <Input placeholder="First Name" name="firstName" type="text" className="my-3" />
          <Input placeholder="Last Name" name="lastName" type="text" className="my-3" />
          <Input placeholder="Email" name="userEmail" type="email" className="my-3" />
          <Input placeholder="Password" name="password" type="password" className="my-3" />
          <Button className="px-5 my-3">
            Create Account
          </Button>
        </AuthCard>
      </div>

    </DashboardLayout>
  );
}

export default SignupScreen;
