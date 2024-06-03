import React from 'react';
import { useSelector } from 'react-redux';
import AdminPanel from 'pages/AdminPanel/AdminPanel.jsx';
import AppDashboard from 'pages/AppDashboard/AppDashboard.jsx';

/**
 * This method is used to handle the dashboard switch between admin and user.
 * @returns {JSX.Element}
 * @constructor
 */
function DashboardSwitch() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    (isAuthenticated && user?.role === 'admin') ? <AdminPanel /> : <AppDashboard />
  );
}

export default DashboardSwitch;
