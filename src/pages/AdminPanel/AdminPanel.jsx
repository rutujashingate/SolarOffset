import React, { useState } from 'react';
import DashboardLayout from 'layout/DashboardLayout.jsx';
import {
  Button, Nav, NavItem, NavLink, TabContent, Table, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ADMIN_DETAIL_PAGE } from 'navigation/routes/index.js';

/**
 * This method is used to get all the users from the backend
 * @param setUser
 * @returns {Promise<void>}
 */
async function getUser(setUser) {
  await axios.get('/auth/alluser').then((res) => {
    const users = res.data.filter((user) => user?.role !== 'admin');
    setUser(users);
  });
}

/**
 * This method is used to get all the countries from the backend
 * @param setCountries
 * @returns {Promise<void>}
 */
async function getCountries(setCountries) {
  await axios.get('/countries').then((res) => {
    const countries = res.data.data;
    setCountries(countries);
  });
}

/**
 * This page is used to display the admin panel
 * @returns {JSX.Element}
 * @constructor
 */
function AdminPanel() {
  const [activeTab, setActive] = useState('1');
  const [pageLoaded, setPageLoaded] = useState(0);
  const [users, setUser] = useState([]);
  const [countries, setCountries] = useState([]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActive(tab);
    }
  };

  if (!pageLoaded) {
    getUser(setUser);
    getCountries(setCountries);
    setPageLoaded(1);
  }

  function deleteUser(id, index) {
    if (confirm('Do you want to proceed?')) {
      axios.delete(`/auth/${id}`).then((res) => getUser(setUser));

      // users.splice(index, 1);
      // setUser(users);
    }
  }

  return (
    <DashboardLayout>
      <div className="container">
        <Nav tabs>
          <NavItem className="navItems">
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1');
              }}
            >
              Users
            </NavLink>
          </NavItem>
          <NavItem className="navItems">
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2');
              }}
            >
              Countries
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Table className="mt-4" bordered striped responsive>
              <thead>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    username
                  </th>
                  <th>
                    email
                  </th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.email}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td><Link to={ADMIN_DETAIL_PAGE} state={{ info: 'user', ...user }}>More detail</Link></td>
                    <td>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => deleteUser(user._id, index)}
                      >
                        -
                      </Button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="2">
            <Table className="mt-4" striped bordered responsive>
              <thead>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    Zone Name
                  </th>
                  <th>
                    Solarpanel Cost
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {countries.map((country, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{country.zoneName}</td>
                    <td>{country.solarPanelCost}</td>
                    <td><Link to={ADMIN_DETAIL_PAGE} state={{ info: 'country', ...country }}>More detail</Link></td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </TabPane>
        </TabContent>
      </div>
    </DashboardLayout>
  );
}

export default AdminPanel;
