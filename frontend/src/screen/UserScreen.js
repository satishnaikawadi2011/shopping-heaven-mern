import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Button, Container, Table } from 'react-bootstrap';
import { deleteUser, listUsers, toggleAdmin } from '../redux/actions/user';
import Message from '../components/Message';

const UserScreen = () => {
	const dispatch = useDispatch();
	const { users, loading, error } = useSelector((state) => state.userList);
	const { message, loading: deleteLoading, error: deleteError } = useSelector((state) => state.userDelete);
	const { message: toggleAdminMessage, loading: adminLoading, error: adminError } = useSelector(
		(state) => state.adminToggle
	);
	useEffect(
		() => {
			dispatch(listUsers());
		},
		[
			dispatch,
			message,
			toggleAdminMessage
		]
	);
	const userDeleteHandler = (id) => {
		if (window.confirm('Are you sure ?')) {
			dispatch(deleteUser(id));
		}
	};

	const makeUserAdmin = (username) => {
		if (window.confirm('Are you sure you want to give this user Admin Permissions ?')) {
			dispatch(toggleAdmin(username, true));
		}
	};

	const removeUserAsAdmin = (username) => {
		if (window.confirm('Are you sure you want to remove this user from Admin Permissions ?')) {
			dispatch(toggleAdmin(username, false));
		}
	};

	const toggleAdminHandler = (username, isAdmin) => {
		if (isAdmin) {
			removeUserAsAdmin(username);
		}
		else {
			makeUserAdmin(username);
		}
	};
	return (
		<SideBar>
			<Container className="text-center">
				<h1 className="mb-3">Users List</h1>
				{loading && <Loader />}
				{deleteLoading && <Loader />}
				{adminLoading && <Loader />}
				{error && <Message variant="danger">{error}</Message>}
				{adminError && <Message variant="danger">{adminError}</Message>}
				{deleteError && <Message variant="danger">{deleteError}</Message>}
				{message && <Message>{message}</Message>}
				{toggleAdminMessage && <Message>{toggleAdminMessage}</Message>}
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>USERNAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>
										{
											user.isAdmin ? <i className="fas fa-check text-success" /> :
											<i className="fas fa-times text-danger" />}
									</td>
									<td>
										<Button
											variant="light"
											className="btn-sm"
											onClick={() => toggleAdminHandler(user.username, user.isAdmin)}
										>
											<i className="fas fa-edit" />
										</Button>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => userDeleteHandler(user._id)}
										>
											<i className="fas fa-trash" />
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>
		</SideBar>
	);
};

export default UserScreen;
