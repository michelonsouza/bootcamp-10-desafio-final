import React, { useContext, useMemo, useEffect } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import { useDarkMode } from 'react-native-dark-mode';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Orders,
  OrderDetails,
  ProblemSend,
  ProblemDetails,
  OrderConfirm,
} from '~/screens';

const { Navigator: StackNavigator, Screen } = createStackNavigator();

export default function OrdersStack() {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const isDark = useDarkMode();

  const headerBackground = useMemo(() => {
    return isDark ? 'secondaryBackground' : 'primary';
  }, [isDark]);

  useEffect(() => {
    navigation.addListener('tabPress', e => {
      e.preventDefault();
      navigation.navigate('Orders');
    });
  }, [navigation]);

  function backButton(to) {
    return Platform.OS === 'ios'
      ? {
          haderLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate(to)}>
              <Icon name="chevron-left" size={40} color="#fff" />
            </TouchableOpacity>
          ),
        }
      : {};
  }

  const options = {
    headerBackTitleVisible: false,
    headerTintColor: isDark ? theme.colors.primary : '#fff',
    cardShadowEnabled: true,
    gestureEnabled: true,
    headerTitleAlign: 'center',
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
      marginLeft: theme.spacing.base / 1.3,
    },
  };

  return (
    <StackNavigator initialRouteName="Orders" screenOptions={options}>
      <Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          title: 'Detalhes da encomenda',
          ...backButton('Orders'),
        }}
      />
      <Screen
        name="ProblemSend"
        component={ProblemSend}
        options={{
          title: 'Informar problema',
          ...backButton('OrderDetails'),
        }}
      />
      <Screen
        name="ProblemDetails"
        component={ProblemDetails}
        options={{
          title: 'Visualizar Problemas',
          ...backButton('OrderDetails'),
        }}
      />
      <Screen
        name="OrderConfirm"
        component={OrderConfirm}
        options={{
          title: 'Confirmar entrega',
          ...backButton('OrderDetails'),
        }}
      />
    </StackNavigator>
  );
}
