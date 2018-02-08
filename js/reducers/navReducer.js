import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../navigators/AppNavigator'

const firstAction = AppNavigator.router.getActionForPathAndParams('Main')
const initialNavState = AppNavigator.router.getStateForAction(firstAction)

function navReducer(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case 'AddDebtor': 
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'AddDebtor' }),
                state
            )
        break
        case 'Main':
            nextState = AppNavigator.router.getStateForAction(
                AppNavigator.router.getActionForPathAndParams('Main')
            )
        break
        case 'DebtorProfile':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'DebtorProfile' }),
                state
            )
        break
        default:
            nextState = AppNavigator.router.getStateForAction(action, state)
        break
    }
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

export default navReducer
