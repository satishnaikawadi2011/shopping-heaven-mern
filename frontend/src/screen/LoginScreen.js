import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { Button, Form } from 'react-bootstrap';
import { login } from '../redux/actions/user';
import Message from '../components/Message';

const LoginScreen = ({ location, history }) => {
	const [
		username,
		setEmail
	] = useState('');
	const [
		password,
		setPassword
	] = useState('');
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	useEffect(
		() => {
			if (userInfo) {
				history.push('/panel');
			}
		},
		[
			dispatch,
			userInfo,
			history
		]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(username, password));
	};
	return (
		<div style={{ marginTop: 60 }}>
			<FormContainer>
				<h2>Admin Sign In</h2>
				{loading && <Loader />}
				{error && <Message variant="danger">{error}</Message>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter username ..."
							value={username}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password ..."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type="submit" variant="primary">
						Sign In
					</Button>
				</Form>
			</FormContainer>
		</div>
	);
};

export default LoginScreen;
