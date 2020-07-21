/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Colors from './helpers/colors';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardingScreen from './screens/onBoarding/onBoarding';
import RNSplashScreen from 'react-native-splash-screen'
import AuthScreen from './screens/auth/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from './helpers/colors';
import { Provider } from 'mobx-react';
import Store from './Stores/Store';
import DashboardScreen from './screens/Dashboard/Dashboard';
import SetupScreen from './screens/Dashboard/Setup/Setup';
import AppCamera from './components/AppCamera';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.navyBlue,
  },
};

const Stack = createStackNavigator();

class App extends React.Component {

  componentDidMount() {
    RNSplashScreen.hide();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={Colors.navyBlue} />
        <Provider Store={Store}>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: false,
              }}>
              <Stack.Screen name="onBoarding" component={OnBoardingScreen} />
              <Stack.Screen name="auth" component={AuthScreen} />
              <Stack.Screen name="dashboard" component={DashboardScreen} />
              <Stack.Screen name="camera" component={AppCamera} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </>
    );
  }
};

export default App;
