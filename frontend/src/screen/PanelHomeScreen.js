import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import MyCard from '../components/MyCard';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getStats } from '../redux/actions/product';

const PanelHomeScreen = () => {
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector((state) => state.getStats);
	const {
		productCount,
		categoryCount,
		selledProductCount,
		deliveredOrderCount,
		pendingOrderCount,
		customerCount
	} = data;
	useEffect(
		() => {
			dispatch(getStats());
		},
		[
			dispatch
		]
	);
	return (
		<SideBar>
			<Container>
				<h1 className="text-center">Admin Dashboard</h1>
				{loading && <Loader />}
				{error && <Message variant="danger">{error}</Message>}
				{!loading &&
				!error && (
					<React.Fragment>
						<Row>
							<Col md={4} sm={6} xs={10}>
								<MyCard variant="primary" iconClass="fas fa-users" header="Total Customers">
									{customerCount}
								</MyCard>
							</Col>
							<Col md={4} sm={6} xs={10}>
								<MyCard variant="secondary" iconClass="fab fa-product-hunt" header="Total Products">
									{productCount}
								</MyCard>
							</Col>
							<Col md={4} sm={6} xs={10}>
								<MyCard variant="warning" iconClass="fas fa-object-group" header="Total Categories">
									{categoryCount}
								</MyCard>
							</Col>
						</Row>
						<Row>
							<Col md={4} sm={6} xs={10}>
								<MyCard variant="dark" iconClass="fas fa-tags" header="No. Of Products Selled">
									{selledProductCount}
								</MyCard>
							</Col>
							<Col md={4} sm={6} xs={10}>
								<MyCard variant="light" iconClass="fas fa-map-signs" header="Total Pending Orders">
									{pendingOrderCount}
								</MyCard>
							</Col>
							<Col md={4} sm={6} xs={10}>
								<MyCard variant="info" iconClass="fas fa-check-square" header="Total Delivered Orders">
									{deliveredOrderCount}
								</MyCard>
							</Col>
						</Row>
					</React.Fragment>
				)}
			</Container>
		</SideBar>
	);
};

export default PanelHomeScreen;
