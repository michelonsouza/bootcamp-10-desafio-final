import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from 'react-native-dark-mode';

import './config/ReactotronConfig';

import light from './themes/light';
import dark from './themes/dark';
import Routes from './routes';

export default function Index() {
  const isDarkMode = useDarkMode();

  const theme = useMemo(() => {
    return isDarkMode ? dark : light;
  }, [isDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      <>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.primary}
        />
        <Routes />
      </>
    </ThemeProvider>
  );
}
