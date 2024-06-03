import { BrowserRouter } from 'react-router-dom';

/**
 * Router settings
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function ReactRouterSettings({ children }) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}

export default ReactRouterSettings;
