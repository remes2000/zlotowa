import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { BackHandler } from 'react-native'

import Dashboard from '../screens/Dashboard'
import AddDebtor from '../screens/AddDebtor'
import DebtorProfile from '../screens/DebtorProfile'
import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator({
    Main: {
        screen: Dashboard,
        navigationOptions: {
            title: 'Złotówa'
        }
    },
    AddDebtor: {
        screen: AddDebtor,
        navigationOptions: {
            title: "Dodaj dłużnika"
        }
    },
    DebtorProfile: {
        screen: DebtorProfile,
        navigationOptions: {
            title: "Dłużnik"
        }
    }
})

class AppWithNavigationState extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props
        if (nav.index === 0) {
          return false
        }
        dispatch(NavigationActions.back())
        return true
    }    

    render() {
      const { dispatch, nav } = this.props
      return (
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch,
            state: nav,
            addListener,
          })}
        />
      );
    }
  }
  
  const mapStateToProps = state => ({
    nav: state.nav
  });
  
  export default connect(mapStateToProps)(AppWithNavigationState);
