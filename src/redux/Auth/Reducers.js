import { CLOSE_AUTH_MODEL, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_AUTH_MODEL } from "./ActionTypes"

const initialState = {
    userDetails: {},
    loading: false,
    fieldError: null,
    error: null,
    token: null,
    authModalState: false
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, loading: true }

        case LOGIN_SUCCESS:
            return { ...state, loading: false, error: null, token: action.payload.token, fieldError: null }

        case LOGIN_FAILURE:
           return  action.payload.errorOn ? { ...state, loading: false, error: null, token: null, userDetails: null, fieldError: { [action.payload.errorOn]: action.payload.message }}:
            { ...state, loading: false, error: action.payload, token: null, userDetails: null }

        case GET_USER_SUCCESS:
            return { ...state, loading:false,  userDetails: action.payload ,error: null }

        case GET_USER_FAILURE:
                return { ...state, userDetails: null, error: action.payload }
        
        case LOGOUT_SUCCESS:
            return {...state, token :null, userDetails: {}}

        case OPEN_AUTH_MODEL:
            return { ...state, authModalState : true}
        
        case CLOSE_AUTH_MODEL:
            return { ...state, authModalState : false}

        default:
            return { ...state }
    }
}   