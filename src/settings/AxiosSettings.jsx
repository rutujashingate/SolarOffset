import axios from 'axios';
import { getHostAPIUrl } from 'utils/appConfig.js';
import { getUserToken } from 'utils/helpers.js';

/**
 * Axios default init method.
 * This initializes the axios with custom settings
 */
const axiosDefaultInit = () => {
  console.log('Axios Default Init called');
  axios.defaults.baseURL = getHostAPIUrl();
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  axios.interceptors.request.use(async (config) => {
    if (getUserToken()) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        'x-auth-token': getUserToken(),
      };
    }
    return config;
  });
};

function AxiosSettings({ children }) {
  axiosDefaultInit();
  return (
    <>
      {children}
    </>
  );
}

export default AxiosSettings;
