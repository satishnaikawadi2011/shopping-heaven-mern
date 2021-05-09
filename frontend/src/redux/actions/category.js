import axios from 'axios';
import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
	CATEGORY_CREATE_REQUEST,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_CREATE_FAIL,
	CATEGORY_DELETE_REQUEST,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_DELETE_FAIL
} from '../types';
axios.defaults.baseURL = 'https://eshopadminapp.herokuapp.com/api';

export const listCategories = () => async (dispatch, getState) => {
	try {
		dispatch({
			type : CATEGORY_LIST_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.get('/category', config);

		dispatch({
			type    : CATEGORY_LIST_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : CATEGORY_LIST_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const createCategory = (name) => async (dispatch, getState) => {
	try {
		dispatch({
			type : CATEGORY_CREATE_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				'Content-Type' : 'application/json',
				Authorization  : `Bearer ${token}`
			}
		};

		const { data } = await axios.post('/category/add', { name }, config);

		dispatch({
			type    : CATEGORY_CREATE_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : CATEGORY_CREATE_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
	try {
		dispatch({
			type : CATEGORY_DELETE_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.delete(`/category/${categoryId}`, config);

		dispatch({
			type    : CATEGORY_DELETE_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : CATEGORY_DELETE_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};
