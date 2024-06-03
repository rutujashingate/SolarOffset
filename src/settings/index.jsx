import AxiosSettings from 'settings/AxiosSettings.jsx';
import ReactQuerySettings from 'settings/ReactQuerySettings.jsx';
import ReduxSettings from 'settings/ReduxSettings.jsx';
import ReactRouterSettings from 'settings/ReactRouterSettings.jsx';

/**
 * This component is a wrapper for settings
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function AppSettings({ children }) {
  return (
    <AxiosSettings>
      <ReactQuerySettings>
        <ReduxSettings>
          <ReactRouterSettings>
            {children}
          </ReactRouterSettings>
        </ReduxSettings>
      </ReactQuerySettings>
    </AxiosSettings>
  );
}

export default AppSettings;
