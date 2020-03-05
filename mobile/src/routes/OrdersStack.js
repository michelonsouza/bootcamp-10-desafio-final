import React, { useContext, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import { useDarkMode } from 'react-native-dark-mode';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Orders, OrderDetails } from '~/screens';

const { Navigator: StackNavigator, Screen } = createStackNavigator();

export default function OrdersStack() {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const isDark = useDarkMode();

  const headerBackground = useMemo(() => {
    return isDark ? 'secondaryBackground' : 'primary';
  }, [isDark]);

  function backButton(to, prop) {
    return (
      <TouchableOpacity
        onPress={() =>
          to
            ? navigation.navigate(to, prop ? { prop } : {})
            : navigation.goBack()
        }>
        <Icon name="chevron-left" size={40} color="#fff" />
      </TouchableOpacity>
    );
  }

  const options = {
    headerBackTitleVisible: false,
    headerTintColor: isDark ? theme.colors.primary : '#fff',
    cardShadowEnabled: false,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    headerStyle: {
      backgroundColor: theme.colors[headerBackground],
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerLeftContainerStyle: {
      marginLeft: theme.spacing.base / 1.5,
    },
  };

  return (
    <StackNavigator
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
          headerLeft: () => backButton('Orders'),
        }}
      />
      <Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          ...options,
          title: 'Detalhes da encomenda',
        }}
      />
    </StackNavigator>
  );
}
