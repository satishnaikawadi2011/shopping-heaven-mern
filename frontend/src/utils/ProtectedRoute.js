import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute(props) {
	const { userInfo } = useSelector((state) => state.userLogin);
	if (userInfo && userInfo.token) {
		return <Route component={props.component} {...props} />;
	}
	else {
		return <Redirect to="/" />;
	}
}
