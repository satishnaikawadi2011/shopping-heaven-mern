import axios from 'axios';
import {
	MARK_DELIVERED_FAIL,
	MARK_DELIVERED_REQUEST,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	MARK_DELIVERED_SUCCESS
} from '../types';
axios.defaults.baseURL = 'https://eshopadminapp.herokuapp.com/api';

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type : ORDER_LIST_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.get('/order', config);

		dispatch({
			type    : ORDER_LIST_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : ORDER_LIST_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({
			type : ORDER_DETAILS_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.get(`/order/${orderId}`, config);

		dispatch({
			type    : ORDER_DETAILS_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : ORDER_DETAILS_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const markOrderAsDelivered = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({
			type : MARK_DELIVERED_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				'Content-Type' : 'application/json',
				Authorization  : `Bearer ${token}`
			}
		};

		const { data } = await axios.post(`/order/${orderId}/markAsDelivered`, {}, config);

		dispatch({
			type    : MARK_DELIVERED_SUCCESS,
			payload : data.message
		});
	} catch (error) {
		dispatch({
			type    : MARK_DELIVERED_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};
