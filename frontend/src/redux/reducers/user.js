import {
	TOGGLE_ADMIN_FAIL,
	TOGGLE_ADMIN_REQUEST,
	TOGGLE_ADMIN_SUCCESS,
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT
} from '../types';

const loginInitialState = {};

export const userLoginReducer = (state = loginInitialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				...state,
				loading : true
			};
		case USER_LOGIN_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return {
				...state,
				loading : true
			};
		case USER_LIST_SUCCESS:
			return { ...state, loading: false, users: action.payload };
		case USER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDeleteReducer = (state = { message: '' }, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return {
				...state,
				loading : true
			};
		case USER_DELETE_SUCCESS:
			return { ...state, loading: false, message: action.payload };
		case USER_DELETE_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const adminToggleReducer = (state = { message: '' }, action) => {
	switch (action.type) {
		case TOGGLE_ADMIN_REQUEST:
			return {
				...state,
				loading : true
			};
		case TOGGLE_ADMIN_SUCCESS:
			return { ...state, loading: false, message: action.payload };
		case TOGGLE_ADMIN_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
