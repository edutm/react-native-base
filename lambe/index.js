import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import Navigator from './src/navigator'
import { name as appName } from './app.json'

import storeConfig from './src/store/storeConfig'

import axios from 'axios'
axios.defaults.baseURL = 'https://laambe-edu-default-rtdb.firebaseio.com/';

const store = storeConfig();

const Redux = () => {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux);
