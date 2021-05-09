import {
	GET_STATS_FAIL,
	GET_STATS_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_GET_FAIL,
	PRODUCT_GET_REQUEST,
	PRODUCT_GET_RESET,
	PRODUCT_GET_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_RESET,
	PRODUCT_UPDATE_SUCCESS,
	GET_STATS_REQUEST
} from '../types';

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return {
				...state,
				loading : true
			};
		case PRODUCT_LIST_SUCCESS:
			return { ...state, loading: false, products: action.payload };
		case PRODUCT_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDeleteReducer = (state = { message: '' }, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return {
				...state,
				loading : true
			};
		case PRODUCT_DELETE_SUCCESS:
			return { ...state, loading: false, message: action.payload };
		case PRODUCT_DELETE_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productCreateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return {
				...state,
				loading : true
			};
		case PRODUCT_CREATE_SUCCESS:
			return { ...state, loading: false, success: true, product: action.payload };
		case PRODUCT_CREATE_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		case PRODUCT_CREATE_RESET:
			return { product: {} };
		default:
			return state;
	}
};

export const productGetReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_GET_REQUEST:
			return {
				...state,
				loading : true
			};
		case PRODUCT_GET_SUCCESS:
			return { ...state, loading: false, product: action.payload };
		case PRODUCT_GET_FAIL:
			return { ...state, loading: false, error: action.payload };
		case PRODUCT_GET_RESET:
			return { product: {} };
		default:
			return state;
	}
};

export const productUpdateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return {
				...state,
				loading : true
			};
		case PRODUCT_UPDATE_SUCCESS:
			return { ...state, loading: false, success: true, product: action.payload };
		case PRODUCT_UPDATE_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		case PRODUCT_UPDATE_RESET:
			return { product: {} };
		default:
			return state;
	}
};

export const getStatsReducer = (state = { data: {} }, action) => {
	switch (action.type) {
		case GET_STATS_REQUEST:
			return {
				...state,
				loading : true
			};
		case GET_STATS_SUCCESS:
			return { ...state, loading: false, success: true, data: action.payload };
		case GET_STATS_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};
