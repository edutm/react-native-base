import React from 'react'
import { Text } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'


const TabNavigator = createBottomTabNavigator({
    Home: Feed,
    Teste: Feed
});
  
export default createAppContainer(TabNavigator);