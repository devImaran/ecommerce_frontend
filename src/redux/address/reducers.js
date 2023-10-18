import { USER_ADDRESS_FAILURE, USER_ADDRESS_REQUEST, USER_ADDRESS_SUCCESS } from "./actionTypes"

const initalState = {
    loading : false,
    error: null,
    addresses: []
}

export const addressReducer = (state = initalState, action )=>{
 switch(action.type){
    case USER_ADDRESS_REQUEST:
        return  { ...state, loading : true}

    case USER_ADDRESS_FAILURE:
        return {...state, loading: false, error : action.payload}

    case USER_ADDRESS_SUCCESS:
        return {...state, loading: false, error : null, addresses: action.payload}
    
    default:
        return state
 }
}