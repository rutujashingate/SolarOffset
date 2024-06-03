import { Provider } from 'react-redux';
import store from 'store.js';

/**
 * Redux settings
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function ReduxSettings({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default ReduxSettings;
