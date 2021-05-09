import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Button, Container, Table, Row, Col, Badge } from 'react-bootstrap';
import Message from '../components/Message';
import { listOrders, markOrderAsDelivered } from '../redux/actions/order';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const OrderScreen = ({ history, match }) => {
	const dispatch = useDispatch();
	const { orders, loading, error } = useSelector((state) => state.orderList);

	const markDelivered = useSelector((state) => state.markDelivered);
	const { success: mdSuccess, mdLoading, mdError } = markDelivered;
	useEffect(
		() => {
			dispatch(listOrders());
		},
		[
			dispatch,
			mdSuccess
		]
	);

	const markDeliveredHandler = (id) => {
		if (window.confirm('Are you sure , you want to mark this order as Delivered ???')) {
			dispatch(markOrderAsDelivered(id));
		}
	};
	const orderDetailsHandler = (id) => {
		history.push(`/orders/${id}`);
	};

	return (
		<SideBar>
			<Container className="text-center">
				<h1>Orders List</h1>
				{loading && <Loader />}
				{error && <Message variant="danger">{error}</Message>}
				{mdLoading && <Loader />}
				{mdError && <Message variant="danger">{mdError}</Message>}
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>TOTAL AMOUNT</th>
							<th>CHECKOUT ON</th>
							<th>STATUS</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => {
							return (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>${order.amount}</td>
									<td>{dayjs(order.createdAt).fromNow()}</td>
									<td>
										{
											order.status ? <Badge variant="success">Delivered</Badge> :
											<Badge variant="secondary">Pending</Badge>}
									</td>
									<td>
										<Button
											variant="warning"
											className="btn-sm mr-2"
											onClick={() => orderDetailsHandler(order._id)}
										>
											<i className="fa fa-eye" />
										</Button>
										<Button
											variant="success"
											className="btn-sm"
											disabled={order.status}
											onClick={() => markDeliveredHandler(order._id)}
										>
											<i className="fa fa-check" />
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

export default OrderScreen;
