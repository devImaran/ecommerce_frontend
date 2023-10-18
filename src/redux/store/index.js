import { applyMiddleware, combineReducers, legacy_createStore, compose } from "redux";
import thunk from "redux-thunk";
import {authReducer} from "../Auth/Reducers";
import { categoryWiseProductReducer } from "../categories/reducers";
import { productReducer } from "../products/reducers";
import { cartReducer } from "../cart/reducers";
import { addressReducer } from "../address/reducers";
import { orderReducer } from "../order/reducers";
import { reviewsAndRatingReducer } from "../reviewAndRating.js/reducers";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth : authReducer,
    category: categoryWiseProductReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    orders: orderReducer,
    reviewsAndRating : reviewsAndRatingReducer
})

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))