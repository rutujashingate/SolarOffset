import DashboardLayout from 'layout/DashboardLayout.jsx';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import { GET_COUNTRY_DATA } from 'api/urls.js';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PAYMENT_CHECKOUT_PAGE } from 'navigation/routes/index.js';
import CountryDetailModal from 'components/CountryDetailModal.jsx';
import { loadUser } from 'actions/authActions.js';
import { getUserToken } from 'utils/helpers.js';
import { POUND_SYMBOL } from 'utils/constants.js';

/**
 * This method is used to render the Funding Screen.
 * @returns {JSX.Element}
 * @constructor
 */
function FundingScreen() {
  const navigate = useNavigate();
  const { zoneKey } = useParams();

  const userToken = getUserToken();

  const [fundFormData, setFundFormData] = useState({});
  const [countryDetailModalIsOpen, setCountryDetailModalIsOpen] = useState(false);

  const { data: countryData, isLoading: countryDataIsLoading } = useQuery({
    queryKey: [GET_COUNTRY_DATA(zoneKey)],
    queryFn: () => axios.get(GET_COUNTRY_DATA(zoneKey)),
    onSuccess: (data) => {
      setFundFormData({
        ...fundFormData,
        zoneKey: data?.data?.zoneKey,
      });
    },
  });

  const handleFundingFormSubmit = (e) => {
    e.preventDefault();
    loadUser();
    navigate(PAYMENT_CHECKOUT_PAGE, {
      state: {
        amount: fundFormData.amount,
        zoneKey,
      },
    });
  };

  const fundingCardDetails = useMemo(() => [
    {
      title: 'Country Name',
      value: countryData?.data?.countryName || countryData?.data?.zoneName,
    },
    {
      title: 'Cost of Solar Panel',
      value: `£ ${countryData?.data?.solarPanelCost}`,
    },
    {
      title: 'Total Carbon Footprint',
      value: countryData?.data?.emissionData?.carbonIntensity ? `${countryData?.data?.emissionData?.carbonIntensity} CO2 Tonnes` : 'N/A',
    },
    {
      title: 'Zone',
      value: countryData?.data?.zoneName,
    },
  ], [countryData, countryDataIsLoading]);
  return (
    <DashboardLayout>
      <CountryDetailModal
        isOpen={countryDetailModalIsOpen}
        onToggle={() => setCountryDetailModalIsOpen(!countryDetailModalIsOpen)}
        zoneKey={countryData?.data?.zoneKey}
        hideFundButton
      />
      <div className="container my-4">
        {countryDataIsLoading && (
          <div>
            <p>
              Details Loading
              <Spinner />
            </p>
          </div>
        )}

        <Card>
          <CardBody>
            <p>Funding Screen</p>
            <Row>
              {fundingCardDetails.map((data) => (
                <Col md={3}>
                  <p className="mb-1"><b>{data.title}</b></p>
                  <p>{data.value}</p>
                </Col>
              ))}
            </Row>
            <Button className="d-block ms-auto " color="primary" onClick={() => setCountryDetailModalIsOpen(true)}>
              {' '}
              View
              More
            </Button>
          </CardBody>
        </Card>

        <div className="my-4">
          <Card>
            <CardHeader>
              <CardTitle>Funding Details</CardTitle>
            </CardHeader>
            <CardBody>
              {!userToken && (
                <Alert color="danger">User needs to log in</Alert>
              )}
              <Form>
                <FormGroup>
                  <Label for="Country">Select Country</Label>
                  <Input
                    id="zone"
                    name="zone"
                    value={countryData?.data?.countryName ? `${countryData?.data?.zoneName} (${countryData?.data?.countryName})` : countryData?.data?.zoneName}
                    disabled
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="amount">
                    Amount
                    (
                    {POUND_SYMBOL}
                    {' '}
                    / GBP)
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder={`Enter amount in ${POUND_SYMBOL} / GBP`}
                    onChange={(e) => setFundFormData({
                      ...fundFormData,
                      amount: e.target.value,
                    })}
                  />
                </FormGroup>

                <Button
                  disabled={!userToken}
                  type="submit"
                  color="success"
                  className="d-block ms-auto"
                  onClick={handleFundingFormSubmit}
                >
                  Proceed
                  to Fund
                </Button>

              </Form>
            </CardBody>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default FundingScreen;
