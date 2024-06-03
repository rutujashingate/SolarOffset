import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import React from 'react';
import DashboardLayout from 'layout/DashboardLayout.jsx';
import { Link } from 'react-router-dom';
import { APP_DASHBOARD_PAGE, COUNTRIES_LISTING_PAGE } from 'navigation/routes/index.js';

/**
 * This method is used to display user funding details
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function UserFundDetails(props) {
  const { user } = props.auth;
  return (
    <DashboardLayout>
      <div className="container">
        {user?.funding?.length > 0
          ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <b>Country Name</b>
                  </th>
                  <th>
                    <b>Amount Funded (GBP)</b>
                  </th>
                  <th>
                    <b>Date</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {user?.funding?.map((fund) => {
                  const date = new Date(fund.timeStamp);
                  return (
                    <tr>
                      <td>{fund.countryName}</td>
                      <td>{fund.amountFunded}</td>
                      <td>
                        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="container mt-5">
              <div className="d-flex mt-5 flex-column justify-content-center align-items-center">
                <h3 className="text-center">No Funding Details Available</h3>
                <p>You can calculate your carbon footprint or choose to compare countries to fund</p>

                <div className="d-flex justify-content-between">
                  <Link to={APP_DASHBOARD_PAGE} className="text-white btn bg-success me-5">
                    Calculate Carbon
                    Footprint
                  </Link>
                  <Link to={COUNTRIES_LISTING_PAGE} className="text-white btn bg-success">Compare Countries</Link>
                </div>
              </div>

            </div>
          )}
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(UserFundDetails);
