import AppSwitch from 'navigation/switch';
import AppSettings from 'settings/index.jsx';
import { Provider } from 'react-redux';
import store from './store.js';

function App() {
  return (
    <Provider store={store}>
      <AppSettings>
        <AppSwitch />
      </AppSettings>
    </Provider>
  );
}

export default App;
