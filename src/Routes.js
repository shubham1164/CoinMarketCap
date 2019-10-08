
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {screen: HomeScreen},
    DetailsScreen: {screen: DetailsScreen}
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
  }
);

const Routes = createAppContainer(AppNavigator);

export default Routes;
