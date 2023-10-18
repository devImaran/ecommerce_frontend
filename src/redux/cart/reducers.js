import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, USER_CART_ITEMS_FAILURE, USER_CART_ITEMS_REQUEST, USER_CART_ITEMS_SUCCESS } from "./actionTypes"

const initialState = {
    loading: false,
    success: false,
    error: null,
    isNewItemAdded: false,
    cartItems: {
        userCartItems: [],
        totalPrice: 0,
        totalItems: 0
    },

}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return { ...state, loading: true, isNewItemAdded: false}

        case ADD_TO_CART_SUCCESS: {
            return { ...state, success: true, loading: false, isNewItemAdded: true }
        }

        case ADD_TO_CART_FAILURE: {
            return { ...state, success: false, loading: false, error: action.payload, isNewItemAdded: false }
        }

        case USER_CART_ITEMS_REQUEST:
        case REMOVE_CART_ITEM_REQUEST:
            return { ...state, loading: true, isNewItemAdded: false }

        case USER_CART_ITEMS_SUCCESS:
            return { ...state, cartItems: action.payload, loading: false }
        
        case USER_CART_ITEMS_FAILURE:
            return { ...state, loading: false,  cartItems: { userCartItems: [], totalPrice: 0, totalItems: 0 }, error: action.payload }
        
        case REMOVE_CART_ITEM_SUCCESS:
            return { ...state, loading: false, isNewItemAdded: true }

        case REMOVE_CART_ITEM_FAILURE:  
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}