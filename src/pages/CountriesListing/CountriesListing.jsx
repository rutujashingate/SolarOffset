import DashboardLayout from 'layout/DashboardLayout.jsx';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Row, Spinner,
} from 'reactstrap';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { GET_ALL_COUNTRIES, GET_COUNTRY_DATA } from 'api/urls.js';
import axios from 'axios';
import { useMemo, useState } from 'react';
import CountryDetailModal from 'components/CountryDetailModal.jsx';

/**
 * This method is used to render the Country's Detail Data.
 * @param zoneKey
 * @returns {JSX.Element}
 * @constructor
 */
function CountryDetailCard({ zoneKey }) {
  const [countryDetailModalIsOpen, setCountryDetailModalIsOpen] = useState(false);

  const { data: countryData, isLoading: countryDataIsLoading } = useQuery({
    queryKey: [GET_COUNTRY_DATA(zoneKey)],
    queryFn: () => axios.get(GET_COUNTRY_DATA(zoneKey)),
    onSuccess: (data) => console.log(data),
  });

  return (
    <>
      <CountryDetailModal
        isOpen={countryDetailModalIsOpen}
        onToggle={() => setCountryDetailModalIsOpen(!countryDetailModalIsOpen)}
        zoneKey={countryData?.data?.zoneKey}
      />
      <Card className="h-100">
        {!countryDataIsLoading ? (
          <>
            <CardHeader tag="h5">
              {countryData?.data?.countryName ? `${countryData?.data?.zoneName} (${countryData?.data?.countryName})` : countryData?.data?.zoneName}
            </CardHeader>
            <CardBody>
              <div>
                <p><b>Carbon Footprint</b></p>
                <p>{countryData?.data?.emissionData?.carbonIntensity || 'N/A'}</p>
                <p><b>Cost of a Solar Panel</b></p>
                <p>{countryData?.data?.solarPanelCost}</p>

                <p><b>Power Consumption Total</b></p>
                <p>{countryData?.data?.powerData?.powerConsumptionTotal || 'N/A'}</p>
                <p><b>Power Production Total</b></p>
                <p>{countryData?.data?.powerData?.powerProductionTotal || 'N/A'}</p>

                <Button className="w-100" color="secondary" onClick={() => setCountryDetailModalIsOpen(true)}>
                  {' '}
                  View
                  More
                </Button>
              </div>
            </CardBody>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="grow" variant="dark" />
          </div>
        )}
      </Card>
    </>

  );
}

/**
 * This method is used to render the Countries Listing Page.
 * @returns {JSX.Element}
 * @constructor
 */
function CountriesListing() {
  const [listingCountries, setListingCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  console.log(listingCountries);
  const {
    data: allCountries,
    isLoading: isLoadingAllCountries,
  } = useQuery({
    queryKey: [GET_ALL_COUNTRIES],
    queryFn: () => axios.get(GET_ALL_COUNTRIES),
  });

  const countrySelectOptions = useMemo(() => {
    if (allCountries) {
      return allCountries?.data?.data.map((data) => ({
        label: `${data.zoneName} ${data?.countryName ? `(${data.countryName})` : ''}`,
        value: data.zoneKey,
      }));
    }
    return [];
  }, [allCountries]);

  const handleAddCountry = () => {
    setListingCountries([...listingCountries, selectedCountry.value]);
    setSelectedCountry(null);
  };

  return (
    <DashboardLayout>
      <Container className="py-5">
        <h5 className="text-center mb-5">Compare countries by adding them to the card</h5>
        <Row className="gy-5">
          {listingCountries.map((country) => (
            <Col md={4} key={country}>
              <CountryDetailCard zoneKey={country} />
            </Col>
          ))}
          <Col md={4}>
            <Card body className="h-100 justify-content-between">
              <CardTitle tag="h5">
                Select A Country
              </CardTitle>
              <div className="my-5">
                <Select
                  value={selectedCountry}
                  isLoading={isLoadingAllCountries}
                  options={countrySelectOptions}
                  onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                />
              </div>
              <Button onClick={handleAddCountry}>
                Add
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
}

export default CountriesListing;
