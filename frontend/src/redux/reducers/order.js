import {
	MARK_DELIVERED_FAIL,
	MARK_DELIVERED_REQUEST,
	MARK_DELIVERED_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS
} from '../types';

export const orderListReducer = (state = { loading: true, orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return {
				...state,
				loading : true
			};
		case ORDER_LIST_SUCCESS:
			return { ...state, loading: false, orders: action.payload };
		case ORDER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderDetailsReducer = (state = { loading: true, order: {} }, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading : true
			};
		case ORDER_DETAILS_SUCCESS:
			return { ...state, loading: false, order: action.payload };
		case ORDER_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const markDeliveredReducer = (state = { loading: true, message: '', success: false }, action) => {
	switch (action.type) {
		case MARK_DELIVERED_REQUEST:
			return {
				...state,
				loading : true
			};
		case MARK_DELIVERED_SUCCESS:
			return { ...state, loading: false, success: true, message: action.payload };
		case MARK_DELIVERED_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};
