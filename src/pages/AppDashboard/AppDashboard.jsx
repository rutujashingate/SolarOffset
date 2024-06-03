import DashboardLayout from 'layout/DashboardLayout.jsx';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label, Spinner,
} from 'reactstrap';
import Select from 'react-select';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GET_HOUSE_TYPES, GET_TOTAL_CARBON_EMISSION } from 'api/urls.js';
import axios from 'axios';
import humanizeString from 'utils/humanizeString.js';
import CountryDetailModal from 'components/CountryDetailModal.jsx';
import { Link } from 'react-router-dom';
import { COUNTRIES_LISTING_PAGE } from 'navigation/routes/index.js';

/**
 * This method is used to get the house type options
 * @param houseOptions
 * @returns {{label: *, value: *}[]}
 */
const getHouseSelectOptions = (houseOptions) => (houseOptions || []).map((ele) => ({
  label: humanizeString(ele),
  value: ele,
}));

/**
 * This method is used to get the total years options
 * Returns an array of date (decades) in descending order from 2020 to 1900
 */
const getTotalYearsOptions = () => {
  const years = [];
  for (let i = 2020; i >= 1900; i -= 10) {
    years.push({
      label: `${i} - ${i + 9}`,
      value: i,
    });
  }
  return years;
};

/**
 * This method is used to handle the carbon footprint calculator
 * Fetches data from Backend API and renders it on the frontend
 * @param CFCForm
 * @param setCFCForm
 * @param handleCFCFormSubmit
 * @returns {JSX.Element}
 * @constructor
 */
function CarbonFootprintCalculator({ CFCForm, setCFCForm, handleCFCFormSubmit }) {
  const {
    data: houseTypesData,
    isLoading: houseTypesLoading,
  } = useQuery({
    queryKey: [GET_HOUSE_TYPES],
    queryFn: () => axios.get(GET_HOUSE_TYPES),
  });

  // eslint-disable-next-line max-len
  const houseTypeOptions = useMemo(() => getHouseSelectOptions(houseTypesData?.data), [houseTypesData]);
  const houseBuiltYearOptions = useMemo(getTotalYearsOptions, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carbon Offset Calculator</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex">
          <div className="w-100">
            {/* CFC Form */}
            <Form onSubmit={handleCFCFormSubmit}>
              <FormGroup>
                <Label for="exampleEmail">
                  House Type
                </Label>
                <Select
                  isLoading={houseTypesLoading}
                  options={houseTypeOptions}
                  onChange={(e) => setCFCForm({ ...CFCForm, houseType: e.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">
                  House Built Year
                </Label>
                <Select
                  options={houseBuiltYearOptions}
                  onChange={(e) => setCFCForm({ ...CFCForm, houseBuiltYear: e.value })}
                />
              </FormGroup>

              <div className="d-flex justify-content-center">
                <Button color="success px-4 p-2 fw-bold" type="submit">
                  Predict Carbon Footprint
                </Button>
              </div>

            </Form>

          </div>
        </div>
      </CardBody>
    </Card>
  );
}

/**
 * This method is used to render the dashboard
 * @returns {JSX.Element}
 * @constructor
 */
function AppDashboard() {
  const [CFCForm, setCFCForm] = useState({
    houseType: null,
    houseBuiltYear: null,
    totalCarbonFootPrint: 0,
    isLoading: false,
  });

  const [CBFCountryModalToggle, setCBFCountryModalToggle] = useState({});

  const [amountDonated, setAmountDonated] = useState(100);

  const {
    mutate: getTotalCarbonEmission,
    data: CFData,
    isLoading: CFDataIsLoading,
    isSuccess: CFDataIsSuccess,
  } = useMutation({
    mutationKey: [GET_TOTAL_CARBON_EMISSION],
    mutationFn: (body) => axios.post(GET_TOTAL_CARBON_EMISSION, body),
  });

  const handleCFCFormSubmit = (event) => {
    event.preventDefault();
    setCFCForm({
      ...CFCForm,
      isLoading: true,
    });

    getTotalCarbonEmission({
      homeType: CFCForm.houseType,
      homeBuiltYear: CFCForm.houseBuiltYear,
    });
  };

  const handleCBFCountryModalToggle = (key) => {
    setCBFCountryModalToggle({
      ...CBFCountryModalToggle,
      [key]: CBFCountryModalToggle[key] ? !CBFCountryModalToggle[key] : true,
    });
  };

  return (
    <DashboardLayout>
      <div className="container py-5">
        <h1 className="text-center fw-bold landing-title">
          Make a Global Impact: Empower UK Households to Offset Their Carbon Footprint with
          Solar Panels
        </h1>
        <p className="text-center my-4">
          Welcome to our platform! We are on a mission to create a sustainable future by empowering UK households to
          take action against climate change. Our unique solution allows individuals to fund solar panel installations
          in various countries, offsetting their carbon footprint and making a positive impact on the environment. With
          your contribution, you can join us in supporting clean energy projects worldwide and build a better future for
          generations to come. Let's make a global impact together - join us today!
        </p>
        {/* <div className="d-flex justify-content-center"> */}
        {/*  <Button color="success" className="px-5 p-3 rounded fw-bold">Calculate your Carbon Footprint</Button> */}

        {/* </div> */}
      </div>
      <div className="container">
        {/* eslint-disable-next-line max-len */}
        <CarbonFootprintCalculator CFCForm={CFCForm} setCFCForm={setCFCForm} handleCFCFormSubmit={handleCFCFormSubmit} />
      </div>
      {CFDataIsLoading && (
        <div className="d-flex justify-content-center align-items-center my-3">
          <p className="mb-0 me-4">
            Calculating Carbon Footprint
          </p>
          <Spinner type="grow" color="success" />
        </div>
      )}

      {(!CFDataIsLoading && CFDataIsSuccess) && (
        <div className="mb-5">
          <div className="container mt-4">
            <Card>
              <CardHeader>
                Carbon Footprint Data
              </CardHeader>
              <CardBody>
                <p>
                  Amount of Carbon Footprint Generated is
                  <b>
                    {' '}
                    {CFData?.data?.totalCarbonEmission}
                  </b>
                  {' '}
                  Tonnes per year
                </p>
                <hr />
                <p>Well If that doesn't make sense. Here is a real world representation</p>
                <p>
                  If you are a
                  <b> CAR</b>
                  {' '}
                  guy
                </p>
                <p>
                  That is an equivalent of travelling
                  <b>
                    {' '}
                    {CFData?.data?.modesOfTransport?.car}
                    {' '}
                    kms
                  </b>
                  {' '}
                  in a car
                </p>

                <p>
                  If you are a
                  {' '}
                  <b> TRAIN</b>
                  {' '}
                  guy
                </p>
                <p>
                  That is an equivalent of travelling
                  <b>
                    {' '}
                    {CFData?.data?.modesOfTransport?.train}
                    kms
                  </b>
                  {' '}
                  in a train
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="container my-4">
            <Card>
              <CardHeader>
                Suggested Countries
              </CardHeader>
              <CardBody>
                <p className="mb-1"><b>Enter Amount to Donate (in £)</b></p>
                <Input
                  value={amountDonated}
                  onChange={(e) => setAmountDonated(e.target.value)}
                  type="number"
                  placeholder="Enter Amount to Donate"
                />

                {CFData?.data?.emissionCountriesData && CFData?.data.emissionCountriesData.map((countryData) => (
                  <Card
                    key={countryData.country.countryName}
                    className={`mt-4 ${countryData?.hasLowestCostOfSolarPanel && 'light-bg-background'}`}
                  >

                    <CardBody>
                      <h5>{countryData.type}</h5>
                      <hr />

                      {countryData?.hasLowestCostOfSolarPanel
                        && <p>Best option to offset the entire carbon footprint - Has the highest value to cost ratio</p>}
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="mb-1"><b>Country</b></p>
                          <p>{countryData.country.countryName}</p>
                        </div>

                        <div>
                          <p className="mb-1"><b>Cost of a Solar Panel</b></p>
                          <p>
                            £
                            {' '}
                            {countryData.country.solarPanelCost}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1">
                            <b>Amount to offset carbon footprint</b>
                          </p>
                          <p>
                            £
                            {' '}
                            {countryData.totalAmountToOffset}
                          </p>

                        </div>
                        <div>
                          <p className="mb-1">
                            <b>Carbon Emission / Day</b>
                          </p>
                          <p>
                            {countryData.country.emissionData.carbonIntensity}
                            {' '}
                            C02 tonnes
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="mb-1">
                          <b>
                            Total Amount of
                            carbon offset
                          </b>
                        </p>
                        <p>
                          {Math.floor((10 / countryData.country.solarPanelCost) * parseInt(amountDonated, 10))}
                          {' '}
                          CO2
                          tonnes
                        </p>
                      </div>
                      <Button
                        onClick={() => handleCBFCountryModalToggle(countryData.country.zoneKey)}
                        color="primary d-block ms-auto"
                      >
                        View More
                      </Button>
                      <CountryDetailModal
                        key={countryData.country.zoneKey}
                        isOpen={CBFCountryModalToggle[countryData.country.zoneKey]}
                        onToggle={() => handleCBFCountryModalToggle(countryData.country.zoneKey)}
                        zoneKey={countryData.country.zoneKey}
                      />
                    </CardBody>
                  </Card>
                ))}

              </CardBody>
              <p className="text-center">
                You can also choose and compare a country of your choice -
                {' '}
                <Link to={COUNTRIES_LISTING_PAGE}>Compare Countries</Link>
              </p>
            </Card>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}

export default AppDashboard;
