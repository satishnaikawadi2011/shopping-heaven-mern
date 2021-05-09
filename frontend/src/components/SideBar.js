import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const SideBar = ({ children }) => {
	return (
		<div className="d-flex" id="wrapper">
			{/* // <!-- Sidebar --> */}
			<div className="bg-light border-right" style={{ position: 'fixed' }} id="sidebar-wrapper">
				<div className="sidebar-heading">EShop Waves Admin</div>
				<div className="list-group list-group-flush">
					<LinkContainer className="list-group-item list-group-item-action" to="/panel">
						<Link to="/panel">
							<i className="fa fa-list mr-2" aria-hidden="true" /> Dashboard
						</Link>
					</LinkContainer>
					<LinkContainer className="list-group-item list-group-item-action" to="/products">
						<Link to="/products">
							<i className="fas fa-shopping-cart mr-2" /> Products
						</Link>
					</LinkContainer>
					<LinkContainer className="list-group-item list-group-item-action" to="/categories">
						<Link to="/categories">
							<i class="fas fa-object-group mr-2" /> Categories
						</Link>
					</LinkContainer>
					<LinkContainer className="list-group-item list-group-item-action" to="/orders">
						<Link to="/orders">
							<i className="fas fa-shopping-cart mr-2" /> Orders
						</Link>
					</LinkContainer>
					<LinkContainer className="list-group-item list-group-item-action" to="/users">
						<Link to="/users">
							<i className="fas fa-users mr-2" /> Customers
						</Link>
					</LinkContainer>
				</div>
			</div>
			{/* // <!-- /#sidebar-wrapper --> */}

			{/* // <!-- Page Content --> */}
			<div id="page-content-wrapper">
				<div className="container-fluid" style={{ marginLeft: '15rem', width: 'calc(100vw - 20rem)' }}>
					{children}
				</div>
			</div>
			{/* // <!-- /#page-content-wrapper --> */}
		</div>
		//   <!-- /#wrapper -->
	);
};

export default SideBar;
