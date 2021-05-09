import React from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/user';
import { useHistory } from 'react-router-dom';

const Header = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const logoutHandler = () => {
		dispatch(logout());
		history.push('/');
	};
	return (
		<header>
			<Navbar bg="dark" fixed="top" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>E-Shop Waves Admin</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer className="mr-3" to="/about">
								<Nav.Link>
									<i className="fas fa-building mx-2" />About
								</Nav.Link>
							</LinkContainer>
							{userInfo && (
								<button type="button" className="btn btn-outline-primary" onClick={logoutHandler}>
									Logout
								</button>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
