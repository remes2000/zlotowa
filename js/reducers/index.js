import { combineReducers } from 'redux'

import NavReducer from './navReducer'
import DebtorsReducer from './debtorsReducer'
import CurrentUserReducer from './currentUserReducer'

const AppReducer = combineReducers({
    nav: NavReducer,
    debtors: DebtorsReducer,
    currentUser: CurrentUserReducer
})

export default AppReducer