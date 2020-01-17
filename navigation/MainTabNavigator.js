import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SecurityQuestionsScreen from '../screens/SecurityQuestionsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    SecurityQuestions: {screen: SecurityQuestionsScreen},
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LoginsStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  config
);

LoginsStack.navigationOptions = {
  tabBarLabel: 'Register',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LoginsStack.path = '';

const RegistersStack = createStackNavigator(
  {
    Register: RegisterScreen,
  },
  config
);

const SecurityQuestionsStack = createStackNavigator(
  {
    SecurityQuestions: SecurityQuestionsScreen,
  },
  config
);

RegistersStack.navigationOptions = {
  tabBarLabel: 'Security Q',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

RegistersStack.path = '';

createStackNavigator
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LoginsStack,
  RegistersStack,
});

tabNavigator.path = '';

export default tabNavigator;
