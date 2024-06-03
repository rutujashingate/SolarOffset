import DashboardLayout from 'layout/DashboardLayout.jsx';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { USER_FUND_COUNTRY } from 'api/urls.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { APP_DASHBOARD_PAGE } from 'navigation/routes/index.js';

/**
 * This method renders the payment succes screen
 * It also handles the API call to update the user funding
 * @returns {JSX.Element}
 * @constructor
 */
function PaymentSuccessScreen() {
  const navigate = useNavigate();
  const {
    mutate: updateTotalUserFunding,
  } = useMutation({
    mutationKey: [USER_FUND_COUNTRY],
    mutationFn: (body) => axios.post(USER_FUND_COUNTRY, body),
    onSuccess: () => {
      setTimeout(() => {
        navigate(APP_DASHBOARD_PAGE);
      }, 5000);
    },
  });

  useEffect(() => {
    const { search } = window.location;
    const urlParams = Object.fromEntries(new URLSearchParams(search));
    if (urlParams?.amount && urlParams.zoneKey) {
      updateTotalUserFunding({
        amount: urlParams.amount,
        zoneKey: urlParams.zoneKey,
      });
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="container h-75">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-between align-items-center">
            <h3 className="text-center mb-3">Thanks for contributing towards a green future</h3>
            <p className="mb-5">You can track your funding details in the dashboard</p>
            <FontAwesomeIcon icon={faCheckCircle} color="green" fontSize="80" />
            <p className="mt-5">You will be redirected to the dashboard in a few seconds</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PaymentSuccessScreen;
