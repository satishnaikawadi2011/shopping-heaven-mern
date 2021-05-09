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
import axios from 'axios';
axios.defaults.baseURL = 'https://eshopadminapp.herokuapp.com/api';

export const login = (username, password) => async (dispatch) => {
	try {
		dispatch({
			type : USER_LOGIN_REQUEST
		});

		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		const { data } = await axios.post('/user/admin/login', { username, password }, config);

		dispatch({
			type    : USER_LOGIN_SUCCESS,
			payload : data
		});

		localStorage.setItem('ESFUserInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type    : USER_LOGIN_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('ESFUserInfo');
	dispatch({
		type : USER_LOGOUT
	});
};

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type : USER_LIST_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.get('/user', config);

		dispatch({
			type    : USER_LIST_SUCCESS,
			payload : data
		});
	} catch (error) {
		dispatch({
			type    : USER_LIST_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const deleteUser = (userId) => async (dispatch, getState) => {
	try {
		dispatch({
			type : USER_DELETE_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};

		const { data } = await axios.delete(`/user/${userId}`, config);

		dispatch({
			type    : USER_DELETE_SUCCESS,
			payload : data.message
		});
	} catch (error) {
		dispatch({
			type    : USER_DELETE_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};

export const toggleAdmin = (username, make) => async (dispatch, getState) => {
	try {
		dispatch({
			type : TOGGLE_ADMIN_REQUEST
		});

		const { userLogin } = getState();
		const token = userLogin.userInfo.token;

		const config = {
			headers : {
				Authorization : `Bearer ${token}`
			}
		};
		let data;
		if (make) {
			console.log('Here');
			const res = await axios.post(`/user/admin/${username}`, {}, config);
			data = res.data;
		}
		else {
			const res = await axios.delete(`/user/admin/${username}`, config);
			data = res.data;
		}

		dispatch({
			type    : TOGGLE_ADMIN_SUCCESS,
			payload : data.message
		});
	} catch (error) {
		dispatch({
			type    : TOGGLE_ADMIN_FAIL,
			payload :

					error.response && error.response.data.message ? error.response.data.message :
					error.message
		});
	}
};
