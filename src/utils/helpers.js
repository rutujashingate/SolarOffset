/**
 * @description Get user token from local storage
 * @returns {string}
 */
const getUserToken = () => localStorage.getItem('token');

export { getUserToken };
