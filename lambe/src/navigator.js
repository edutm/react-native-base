import React from 'react'
import { Text } from 'react-native'
import { 
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'
import Splash from './screens/Splash'


const authRouter = createStackNavigator({
    Login: {screen: Login, navigationOptions: {title: 'Login'}},
    Register: {screen: Register, navigationOptions: {title: 'Register'}},
}, {
    initialRouteName: 'Login',
});

const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter
}, {
    initialRouteName: 'Auth',
});


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
            screen: AddPhoto,
            navigationOptions: {
                title: 'Add Picture',
                tabBarIcon: ({ tintColor }) => <Icon name='camera' size={30} color={tintColor}/>
            }
        },
        Profile: {
            name: 'Profile',
            screen: loginOrProfileRouter,
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

const SplashRouter = createSwitchNavigator({
    Splash: Splash,
    App: TabNavigator
}, {
    initialRouteName: 'Splash',
});

export default createAppContainer(SplashRouter);