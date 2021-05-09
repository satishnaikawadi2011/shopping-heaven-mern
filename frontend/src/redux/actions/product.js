import axios from 'axios';
import {
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_GET_FAIL,
	PRODUCT_GET_REQUEST,
	PRODUCT_GET_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	GET_STATS_FAIL,
	GET_STATS_REQUEST,
	GET_STATS_SUCCESS
} from '../types';
axios.defaults.baseURL = 'https://eshopadminapp.herokuapp.com/api';

export const listProducts = () => async (dispatch, getState) => {
	try {
		dispatch({
			type : PRODUCT_LIST_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.get('/product', config);

		dispatch({
			type    : PRODUCT_LIST_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : PRODUCT_LIST_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
	try {
		dispatch({
			type : PRODUCT_DELETE_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.delete(`/product/${productId}`, config);

		dispatch({
			type    : PRODUCT_DELETE_SUCCESS,
			payload : data.message
		});
	} catch (error) {
		dispatch({
			type    : PRODUCT_DELETE_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type : PRODUCT_CREATE_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.post(`/product/create`, {}, config);

		dispatch({
			type    : PRODUCT_CREATE_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : PRODUCT_CREATE_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const getProduct = (productId) => async (dispatch, getState) => {
	try {
		dispatch({
			type : PRODUCT_GET_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.get(`/product/${productId}`, config);

		dispatch({
			type    : PRODUCT_GET_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : PRODUCT_GET_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type : PRODUCT_UPDATE_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				'Content-Type' : 'application/json',
				Authorization  : `Bearer ${token}`
			}
		};

		const { data } = await axios.patch(`/product/${product._id}`, product, config);

		dispatch({
			type    : PRODUCT_UPDATE_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : PRODUCT_UPDATE_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const getStats = () => async (dispatch, getState) => {
	try {
		dispatch({
			type : GET_STATS_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.get(`/stats`, config);

		dispatch({
			type    : GET_STATS_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : GET_STATS_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};
