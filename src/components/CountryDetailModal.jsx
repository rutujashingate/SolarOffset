import {
  Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row,
} from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GET_COUNTRY_DATA } from 'api/urls.js';
import getFormattedDate from 'utils/getFormattedDate.js';
import humanizeString from 'utils/humanizeString.js';
import { useNavigate } from 'react-router-dom';
import { FUNDING_PAGE } from 'navigation/routes/index.js';

/**
 * This component is used to display the country details in a modal
 * @param isOpen
 * @param onToggle
 * @param zoneKey
 * @param hideFundButton
 * @returns {JSX.Element}
 * @constructor
 */
function CountryDetailModal({
  isOpen = false, onToggle, zoneKey, hideFundButton = false,
}) {
  const navigate = useNavigate();

  const { data: countryData } = useQuery({
    queryKey: ['country', zoneKey],
    queryFn: () => axios.get(GET_COUNTRY_DATA(zoneKey)),
    enabled: isOpen,
  });

  /**
   * This function is used to navigate to the funding page
   */
  const handleNavigateToFund = () => {
    navigate(FUNDING_PAGE(zoneKey));
  };
  return (
    <Modal isOpen={isOpen} toggle={onToggle} size="xl" centered scrollable>
      <ModalHeader toggle={onToggle}>{countryData?.data?.countryName || countryData?.data?.zoneName}</ModalHeader>
      <ModalBody className="p-4">
        <div className="d-flex justify-content-between">
          <div>
            <p className="mb-1"><b>Cost of a Solar Panel</b></p>
            <p>
              £
              {' '}
              {countryData?.data?.solarPanelCost}
            </p>
          </div>
          <div>
            <p className="mb-1"><b>Total Carbon Footprint</b></p>
            <p>
              {countryData?.data?.emissionData?.carbonIntensity || 'N/A'}
              {' '}
              C02 tonnes
            </p>
          </div>
          <div>
            <p className="mb-1"><b>Zone</b></p>
            <p>
              {countryData?.data?.zoneName}
            </p>
          </div>

          <div>
            <p className="mb-1"><b>Last Updated Emission</b></p>
            <p>
              {countryData?.data?.emissionAndPowerConsumptionUpdatedTime ? getFormattedDate(countryData?.data?.emissionAndPowerConsumptionUpdatedTime) : 'N/A'}
            </p>
          </div>
        </div>

        <hr />
        <div>
          <h5>
            <b>Power Production</b>
          </h5>
          <h6>
            {' '}
            Total:
            {' '}
            <b>
              {countryData?.data?.powerData?.powerProductionTotal}
              {' '}
              MW
            </b>
          </h6>

          <Row
            className="d-flex justify-content-between"
          >
            {' '}
            {/* eslint-disable-next-line max-len */}
            {countryData?.data?.powerData?.powerProductionBreakdown && Object.keys(countryData?.data?.powerData?.powerProductionBreakdown).map((key) => (
              <Col md={1}>
                <p className="mb-1">
                  <b>{humanizeString(key)}</b>
                </p>
                <p>{countryData?.data?.powerData?.powerProductionBreakdown[key] || 'N/A'}</p>
              </Col>
            ))}
          </Row>

        </div>

        <hr />
        <div>
          <h5>
            <b>Power Consumption</b>
          </h5>
          <h6>
            {' '}
            Total:
            {' '}
            <b>
              {countryData?.data?.powerData?.powerConsumptionTotal}
              {' '}
              MW
            </b>
          </h6>

          <Row
            className="d-flex justify-content-between"
          >
            {/* eslint-disable-next-line max-len */}
            {countryData?.data?.powerData?.powerConsumptionBreakdown && Object.keys(countryData?.data?.powerData?.powerConsumptionBreakdown).map((key) => (
              <Col md={1}>
                <p className="mb-1">
                  <b>{humanizeString(key)}</b>
                </p>
                <p>{countryData?.data?.powerData?.powerProductionBreakdown[key] || 'N/A'}</p>
              </Col>
            ))}
          </Row>

          <hr />
          <div>
            <p>
              Power Import Total:
              <b>
                {countryData?.data?.powerData?.powerImportTotal ? `${countryData?.data?.powerData?.powerImportTotal} MW` : 'N/A'}
              </b>
            </p>

            <p>
              Power Export Total:
              <b>
                {countryData?.data?.powerData?.powerExportTotal ? `${countryData?.data?.powerData?.powerExportTotal} MW` : 'N/A'}
              </b>
            </p>
          </div>

        </div>

      </ModalBody>
      <ModalFooter>
        {!hideFundButton && (
          <Button color="primary" onClick={handleNavigateToFund}>
            Fund
          </Button>
        )}

        {' '}
        <Button color="secondary" onClick={onToggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CountryDetailModal;
