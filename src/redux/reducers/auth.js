import { Types } from "../constants/login"

const initialState = {
  isAuthenticated:false,
  authUser:{},
  authToken:'',
  successMsg:'',
  errorMsg:'',
  fieldErrorMsg:{
    email:'',
    password:''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
        return {
            ...state,
            isAuthenticated : true,
            authUser : action.payload.user,
            authToken : action.payload.token,
            successMsg: 'welcome Back',
            fieldErrorMsg:{
                email:'',
                password:''
            },
            errorMsg:'',
        }

    case Types.LOGIN_FAILURE_500:
        return {
          ...state,
          errorMsg: action.payload
        }
    
    case Types.LOGIN_FAILURE_400:
        return {
          ...state,
          fieldErrorMsg:{
            ...state.fieldErrorMsg,
            ...action.payload
          }
        }

    case Types.RESET_FIELD_ERROR_MSG:
            return {
              ...state,
              fieldErrorMsg:{
                email:'',
                password:''
              }
            }

    default:
      return state;
  }
}

export default reducer;