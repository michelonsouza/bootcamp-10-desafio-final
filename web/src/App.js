import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

import { store, persistor } from './store';
import history from './services/history';

import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  const [selectedTheme, setSelectedTheme] = useState(
    store.getState().user.theme === 'light' ? light : dark
  );

  function changeTheme(newTheme) {
    setSelectedTheme(newTheme === 'light' ? light : dark);
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={selectedTheme}>
          <Router history={history}>
            <GlobalStyle />
            <Routes changeTheme={changeTheme} />
            <ToastContainer autoClose={3000} />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
