import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import DashboardLayout from 'layout/DashboardLayout.jsx';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GET_USER_DATA_BY_ID } from 'api/urls.js';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table,
} from 'reactstrap';
import getFormattedDate from 'utils/getFormattedDate.js';
import humanizeString from 'utils/humanizeString.js';
import CountryDetailModal from 'components/CountryDetailModal.jsx';
import { POUND_SYMBOL } from 'utils/constants.js';

/**
 * This component is used to display the user details
 * @param user
 * @returns {JSX.Element}
 */
function userDetails(user) {
  const {
    data: userData,
  } = useQuery({
    queryKey: ['user', user.id],
    queryFn: () => axios.get(GET_USER_DATA_BY_ID(user._id)),
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>

        </CardHeader>
        <CardBody>
          <div className="d-flex">
            <div className="flex-basis-50 card-right-divider details">
              <p className="mb-1">
                <b>Username: </b>
                {humanizeString(user.username)}

              </p>
              <p className="mb-1">
                <b>Email: </b>
                {user.email}
              </p>

            </div>
            <div className="justify-content-center details">
              <p className="mb-1">
                <b>
                  Total Funded
                  {' '}
                  {POUND_SYMBOL}
                  {' '}
                  / GBP:
                </b>
                {' '}
                {userData?.data?.funding[0]?.amountFunded || 'N/A'}

              </p>
              <p>
                <b>
                  Total Countries Funded :

                </b>
                {userData?.data?.funding && (userData?.data?.funding.length || 0)}
              </p>
            </div>
          </div>

        </CardBody>
      </Card>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>
            <h6>Funding Details</h6>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered striped responsive>
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  Country Name
                </th>
                <th>
                  Amount
                </th>
                <th>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {userData?.data?.funding && userData?.data?.funding.map((data, index) => (
                <tr key={data?.timeStamp}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {data?.countryName}
                  </td>
                  <td>
                    {data?.amountFunded}
                  </td>
                  <td>
                    {getFormattedDate(data?.timeStamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

/**
 * This component is used to display the funding details
 * @param zone
 * @returns {JSX.Element}
 */
function countryDetail(zone) {
  const [countryDetailModalIsOpen, setCountryDetailModalIsOpen] = useState(false);

  const fundingCardDetails = useMemo(() => [
    {
      title: 'Country Name',
      value: zone?.countryName || zone.zoneName,
    },
    {
      title: 'Cost of Solar Panel',
      value: `£ ${zone.solarPanelCost}`,
    },
    {
      title: 'Total Carbon Footprint',
      value: zone?.carbonIntensity ? `${zone?.carbonIntensity} CO2 Tonnes` : 'N/A',
    },
    {
      title: 'Zone',
      value: zone.zoneName,
    },
  ], [zone]);

  return (
    <>
      <CountryDetailModal
        isOpen={countryDetailModalIsOpen}
        onToggle={() => setCountryDetailModalIsOpen(!countryDetailModalIsOpen)}
        zoneKey={zone?.zoneKey}
        hideFundButton
      />
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
          <Button
            className="d-block ms-auto"
            color="primary"
            onClick={() => setCountryDetailModalIsOpen(true)}
          >
            {' '}
            View More
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

/**
 * This component is used to display the details of the user or the country
 * This acts as a wrapper component for the user details and country details
 * @returns {JSX.Element}
 * @constructor
 */
function DetailBox() {
  const location = useLocation();
  const handleBack = () => {
    window.location.href = '/admin/';
  };
  const { state } = location;
  return (
    <DashboardLayout>
      <div className="container mt-5">
        <Link className="d-block mb-4" onClick={handleBack}> Back </Link>
        {(state.info === 'user') ? userDetails(state) : countryDetail(state)}

      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(DetailBox);
