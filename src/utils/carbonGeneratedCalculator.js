import { homeTypes } from 'utils/constants';

/**
 * Calculate the carbon generated based on the home type and the year
 * @param homeKey
 * @param year
 * @returns {number}
 */
const carbonGeneratedCalculator = ({ homeKey, year }) => {
  const homeType = homeTypes[homeKey];
  let totalCarbonGenerated = 1;

  const numberOfYears = new Date().getFullYear() - parseInt(year, 10);
  // Based on the year multiply the carbon offset
  totalCarbonGenerated = (totalCarbonGenerated * homeType.carbonOffset) * (numberOfYears / 10);

  return totalCarbonGenerated;
};

export default carbonGeneratedCalculator;
