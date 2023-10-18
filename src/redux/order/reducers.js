import { FETCH_MY_ORDER_FAILURE, FETCH_MY_ORDER_SUCCESS, PLACE_ORDER_FAILURE, PLACE_ORDER_SUCCESS } from "./actionTypes"

const initialState = {
    loading: false,
    error: null,
    myOrders:[]
}

export const orderReducer = (state=initialState, action)=>{
    switch(action.type){
        case FETCH_MY_ORDER_FAILURE:
        case PLACE_ORDER_FAILURE:
            return { ...state, loading: true }
            
        case FETCH_MY_ORDER_SUCCESS:
            return { ...state, loading :false, error: null, myOrders: action.payload }
        case FETCH_MY_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload, myOrders: []}


        case PLACE_ORDER_SUCCESS:
            return { ...state, loading: false, error: null}
        
        case PLACE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload}

        default:
            return state
    }
}