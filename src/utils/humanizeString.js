/**
 * This method is used to parse strings and replace underscores with spaces
 * Capitalize the first letter
 * @param string
 * @returns {string}
 */
const humanizeString = (string) => {
  const customString = string.replaceAll('_', ' ');
  return customString.charAt(0).toUpperCase() + customString.slice(1);
};

export default humanizeString;
