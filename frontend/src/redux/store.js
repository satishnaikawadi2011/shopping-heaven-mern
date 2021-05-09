import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminToggleReducer, userDeleteReducer, userListReducer, userLoginReducer } from './reducers/user';
import {
	getStatsReducer,
	productCreateReducer,
	productDeleteReducer,
	productGetReducer,
	productListReducer,
	productUpdateReducer
} from './reducers/product';
import { categoryCreateReducer, categoryDeleteReducer, categoryListReducer } from './reducers/category';
import { markDeliveredReducer, orderDetailsReducer, orderListReducer } from './reducers/order';

const reducers = combineReducers({
	userLogin      : userLoginReducer,
	userList       : userListReducer,
	userDelete     : userDeleteReducer,
	adminToggle    : adminToggleReducer,
	productList    : productListReducer,
	categoryList   : categoryListReducer,
	productDelete  : productDeleteReducer,
	productCreate  : productCreateReducer,
	productGet     : productGetReducer,
	productUpdate  : productUpdateReducer,
	categoryCreate : categoryCreateReducer,
	categoryDelete : categoryDeleteReducer,
	orderList      : orderListReducer,
	orderDetails   : orderDetailsReducer,
	markDelivered  : markDeliveredReducer,
	getStats       : getStatsReducer
});

const userInfoFromStorage =
	localStorage.getItem('ESFUserInfo') ? JSON.parse(localStorage.getItem('ESFUserInfo')) :
	null;

const initialState = {
	userLogin : { userInfo: userInfoFromStorage }
};

const middleware = [
	thunk
];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
