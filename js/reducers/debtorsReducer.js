import { GET_DEBTORS } from '../actions'

function debtorsReducer(state = [], action){
    switch(action.type){
        case GET_DEBTORS: 
            console.log('debtors reducer')
            console.log(action.payload)
            return action.payload
        default:
            return state
    }
}

export default debtorsReducer