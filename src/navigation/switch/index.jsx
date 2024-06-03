import { Route, Routes } from 'react-router-dom';
import {
  ADMIN_DASHBOARD_PAGE,
  ADMIN_DETAIL_PAGE,
  APP_DASHBOARD_PAGE,
  APP_LOGIN_PAGE,
  APP_SIGNUP_PAGE,
  COUNTRIES_LISTING_PAGE,
  FUNDING_PAGE,
  PAYMENT_CHECKOUT_PAGE,
  PAYMENT_SUCCESS_PAGE,
  USER_FUNDING_LISTING,
} from 'navigation/routes/index';
import LoginScreen from 'pages/LoginScreen/LoginScreen';
import SignupScreen from 'pages/SignupScreen/SignupScreen';
import AdminPanel from 'pages/AdminPanel/AdminPanel.jsx';
import CountriesListing from 'pages/CountriesListing/CountriesListing.jsx';
import FundingScreen from 'pages/FundingScreen/FundingScreen.jsx';
import DashboardSwitch from 'pages/DashBoardSwitch/DashboardSwitch.jsx';
import DetailBox from 'components/DetailBox.jsx';
import { loadUser } from 'actions/authActions.js';
import PaymentCheckoutScreen from 'pages/PaymentCheckoutScreen/PaymentCheckoutScreen.jsx';
import PaymentSuccessScreen from 'pages/PaymentSuccessScreen/PaymentSuccessScreen.jsx';
import { useEffect } from 'react';
import UserFundDetails from 'pages/userFundDetails/UserFundDetails.jsx';
import store from '../../store.js';

/**
 * This component is used to display the Auth routes
 * @returns {JSX.Element}
 * @constructor
 */
function AuthRoutes() {
  return (
    <>
      <Route path={APP_LOGIN_PAGE} element={<LoginScreen />} />
      <Route path={APP_SIGNUP_PAGE} element={<SignupScreen />} />
    </>
  );
}

/**
 * This component contains the dashboard routes
 * @returns {JSX.Element}
 * @constructor
 */
function DashboardRoutes() {
  return (
    <>
      <Route path={ADMIN_DASHBOARD_PAGE} element={<AdminPanel />} />
      <Route path={APP_DASHBOARD_PAGE} element={<DashboardSwitch />} />
      <Route path={COUNTRIES_LISTING_PAGE} element={<CountriesListing />} />
      <Route path={FUNDING_PAGE()} element={<FundingScreen />} />
      <Route path={ADMIN_DETAIL_PAGE} element={<DetailBox />} />
      <Route path={PAYMENT_CHECKOUT_PAGE} element={<PaymentCheckoutScreen />} />
      <Route path={PAYMENT_SUCCESS_PAGE} element={<PaymentSuccessScreen />} />
      <Route path={USER_FUNDING_LISTING} element={<UserFundDetails />} />
    </>
  );
}

function AppSwitch() {
  useEffect(() => store.dispatch(loadUser()));
  return (
    <Routes>
      {AuthRoutes()}
      {DashboardRoutes()}
    </Routes>
  );
}

export default AppSwitch;
