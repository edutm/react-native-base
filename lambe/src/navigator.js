import React from 'react'
import { Text } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'


const TabNavigator = createBottomTabNavigator(
    {
        Feed: {
            name: 'Feed',
            screen: Feed,
            navigationOptions: {
                title: 'Feed',
                tabBarIcon: ({ tintColor }) => <Icon name='home' size={30} color={tintColor}/>
            }
        },
        Add: {
            name: 'Addphoto',
            screen: Feed,
            navigationOptions: {
                title: 'Add Picture',
                tabBarIcon: ({ tintColor }) => <Icon name='camera' size={30} color={tintColor}/>
            }
        },
        Profile: {
            name: 'Profile',
            screen: Feed,
            navigationOptions: {
                title: 'Profile',
                tabBarIcon: ({ tintColor }) => <Icon name='user' size={30} color={tintColor}/>
            }
        },
    },
    {
        initialRouteName: 'Feed',
        tabBarOptions: {
            showLabel: false
        }
    }
);

export default createAppContainer(TabNavigator);