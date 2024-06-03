import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import { GET_PAYMENT_INTENT } from 'api/urls.js';
import axios from 'axios';
import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from 'components/StripeCheckoutForm.jsx';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51N6LNtCbBJi68Z9HChFZi4blZd0zVCZHPpcCMxT3oXREW1r1GB68hwaSV5nTwhQ8q00ABZQLu9T2tvXnpdBFMnuP00C3PpgG77');

/**
 * This method is used to render payment checkout screen.
 * This also initializes the stripe payment gateway.
 * @returns {JSX.Element}
 * @constructor
 */
function PaymentCheckoutScreen() {
  const location = useLocation();
  const { mutate: getClientSecret, data: clientSecret, isLoading: clientSecretIsLoading } = useMutation({
    mutationKey: [GET_PAYMENT_INTENT],
    mutationFn: (body) => axios.post(GET_PAYMENT_INTENT, body),
  });

  useEffect(() => {
    if (location?.state?.amount) {
      getClientSecret({ amount: location.state.amount });
    }
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  console.log(clientSecret);
  const options = {
    clientSecret: clientSecret?.data?.clientSecret,
    appearance,
  };

  return (
    <div className="d-flex h-100">
      <div className="flex-basis-50 bg-success d-flex justify-content-center align-items-center">
        <h4 className="text-white">
          Thanks for contributing towards a greener future
        </h4>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-basis-50">
        {(!clientSecretIsLoading && clientSecret?.data) && (
          <Elements options={options} stripe={stripePromise}>
            <StripeCheckoutForm zoneKey={location?.state?.zoneKey} amount={location?.state?.amount} />
          </Elements>
        )}
      </div>

    </div>
  );
}

export default PaymentCheckoutScreen;
