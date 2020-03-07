import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from 'react-native-dark-mode';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import light from './themes/light';
import dark from './themes/dark';
import Routes from './routes';

export default function Index() {
  const isDarkMode = useDarkMode();
  // eslint-disable-next-line no-console
  console.disableYellowBox = true;

  const theme = useMemo(() => {
    return isDarkMode ? dark : light;
  }, [isDarkMode]);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background}
          />
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
