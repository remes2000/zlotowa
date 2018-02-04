import React from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';
import { middleware } from './utils/redux';
import thunk from 'redux-thunk'

const store = createStore(
  AppReducer,
  applyMiddleware(middleware, thunk)
)

class Zlotowa extends React.Component {
    constructor(props){
        super(props)
    }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

export default Zlotowa