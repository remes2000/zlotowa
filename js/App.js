import React from 'react'
import { StackNavigator } from 'react-navigation'

import Dashboard from './Screens/Dashnoard'

const rootNavigation = StackNavigator({
    Main: {
        screen: Dashboard,
        navigationOptions: {
            title: 'Złotówa'
        }
    }
})

export default rootNavigation