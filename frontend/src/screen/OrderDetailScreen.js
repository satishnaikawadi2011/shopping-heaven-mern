import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Container, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, markOrderAsDelivered } from '../redux/actions/order';
import SideBar from '../components/SideBar';
import dayjs from 'dayjs';

const OrderDetailsScreen = ({ match, history }) => {
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const markDelivered = useSelector((state) => state.markDelivered);
	const { success: mdSuccess, mdLoading, mdError } = markDelivered;

	useEffect(
		() => {
			dispatch(getOrderDetails(orderId));
		},
		[
			dispatch,
			orderId,
			mdSuccess
		]
	);

	const markDeliveredHandler = () => {
		if (window.confirm('Are you sure , you want to mark this order as Delivered ???')) {
			dispatch(markOrderAsDelivered(orderId));
		}
	};

	return (
		<SideBar>
			{
				<Container>
					{loading && <Loader />}
					{error && <Message variant="danger">{error}</Message>}
					{mdLoading && <Loader />}
					{mdError && <Message variant="danger">{mdError}</Message>}
					{!loading &&
					!error && (
						<React.Fragment>
							<h1>Order {order._id}</h1>
							<Row>
								<Col md={10} sm={12}>
									<ListGroup variant="flush">
										<ListGroup.Item>
											<h2>Shipping</h2>
											<p>
												<strong>Username: </strong> {order.user.username}
											</p>
											<p>
												<strong>Email: </strong>{' '}
												<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
											</p>
											<p>
												<strong>Address: </strong>
												{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
												{order.shippingAddress.postalCode}, {order.shippingAddress.country}
											</p>
										</ListGroup.Item>
										<ListGroup.Item>
											<h2>Order Items</h2>
											{
												order.orderItems.length === 0 ? <Message>Order is empty</Message> :
												<ListGroup variant="flush">
													{order.orderItems.map((item, index) => (
														<ListGroup.Item key={index}>
															<Row>
																<Col md={1}>
																	<Image
																		src={`https://eshopadminapp.herokuapp.com${item.image}`}
																		alt={item.title}
																		fluid
																		rounded
																	/>
																</Col>
																<Col>
																	<Link to={`/products/${item.productId}/edit`}>
																		{item.title}
																	</Link>
																</Col>
																<Col md={4}>
																	{item.qty} x ${item.price} = ${item.qty * item.price}
																</Col>
															</Row>
														</ListGroup.Item>
													))}
												</ListGroup>}
										</ListGroup.Item>
										<ListGroup.Item>
											<h2>Other Info</h2>
											<p>
												<strong>Total Amount : </strong> ${order.amount}
											</p>
											<p>
												<strong>Purchased At : </strong>{' '}
												{dayjs(order.createdAt).format('DD/MM/YYYY   hh:mm:ss')}
											</p>
											<p>
												<strong>Status : </strong>{' '}
												{
													order.status ? <Badge variant="success">Delivered</Badge> :
													<Badge variant="secondary">Pending</Badge>}
											</p>
										</ListGroup.Item>
										<ListGroup.Item className="text-right">
											<button
												onClick={markDeliveredHandler}
												disabled={order.status}
												className="btn btn-success"
											>
												Mark As Delivered
											</button>
										</ListGroup.Item>
									</ListGroup>
								</Col>
							</Row>
						</React.Fragment>
					)}
				</Container>
			}
		</SideBar>
	);
};

export default OrderDetailsScreen;
