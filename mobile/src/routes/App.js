import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from 'styled-components';

import { Profile, Orders } from '~/screens';

const { Navigator: BottomTabNavigator, Screen } = createBottomTabNavigator();

export default function App() {
  const theme = useContext(ThemeContext);

  return (
    <BottomTabNavigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        keyboardHidesTabBar: true,
        inactiveTintColor: theme.colors.secondaryTextColor,
        style: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.boxShadow,
          height: 90,
          paddingTop: 10,
          elevation: 4,
          shadowColor: theme.colors.boxShadow,
          shadowOffset: {
            height: 3,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
        },
        labelStyle: {
          fontSize: 14,
        },
      }}
      screenOptions={{
        style: {
          background: '#fff',
        },
      }}>
      <Screen
        name="Delivery"
        component={Orders}
        options={{
          title: 'Entregas',
          /* eslint-disable react/prop-types */
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={20} color={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu Perfil',
          /* eslint-disable react/prop-types */
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={20} color={color} />
          ),
        }}
      />
    </BottomTabNavigator>
  );
}
