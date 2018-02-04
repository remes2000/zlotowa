import { combineReducers } from 'redux'

import NavReducer from './navReducer'
import DebtorsReducer from './debtorsReducer'

const AppReducer = combineReducers({
    nav: NavReducer,
    debtors: DebtorsReducer
})

export default AppReducer