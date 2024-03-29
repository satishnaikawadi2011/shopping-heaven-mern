import {
	CATEGORY_CREATE_FAIL,
	CATEGORY_CREATE_REQUEST,
	CATEGORY_CREATE_RESET,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_DELETE_FAIL,
	CATEGORY_DELETE_REQUEST,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_LIST_FAIL,
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS
} from '../types';

export const categoryListReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case CATEGORY_LIST_REQUEST:
			return {
				...state,
				loading : true
			};
		case CATEGORY_LIST_SUCCESS:
			return { ...state, loading: false, categories: action.payload };
		case CATEGORY_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		case CATEGORY_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				categories: [
					action.payload,
					...state.categories
				]
			};
		default:
			return state;
	}
};

export const categoryCreateReducer = (state = { category: {} }, action) => {
	switch (action.type) {
		case CATEGORY_CREATE_REQUEST:
			return {
				...state,
				loading : true
			};
		case CATEGORY_CREATE_SUCCESS:
			return { ...state, loading: false, success: true, category: action.payload };
		case CATEGORY_CREATE_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		case CATEGORY_CREATE_RESET:
			return { category: {} };
		default:
			return state;
	}
};

export const categoryDeleteReducer = (state = { message: '' }, action) => {
	switch (action.type) {
		case CATEGORY_DELETE_REQUEST:
			return {
				...state,
				loading : true
			};
		case CATEGORY_DELETE_SUCCESS:
			return { ...state, loading: false, success: true, message: action.payload };
		case CATEGORY_DELETE_FAIL:
			return { ...state, loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};
