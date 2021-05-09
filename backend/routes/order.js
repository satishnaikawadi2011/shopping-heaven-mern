const express = require('express');
const {
	addOrder,
	getOrderById,
	getMyOrders,
	getAllOrders,
	markOrderAsDelivered,
	updateOrderToPaid,
	deleteOrder,
	markOrderAsPaidByAdmin
} = require('../controllers/order');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post(
	'/add',
	[
		isAuthenticated
	],
	addOrder
);

router.get(
	'/me',
	[
		isAuthenticated
	],
	getMyOrders
);

router.post(
	'/:id/markAsDelivered',
	[
		isAuthenticated,
		isAdmin
	],
	markOrderAsDelivered
);

router.post(
	'/:id/pay',
	[
		isAuthenticated
	],
	updateOrderToPaid
);

router.post(
	'/:id/pay/admin',
	[
		isAuthenticated,
		isAdmin
	],
	markOrderAsPaidByAdmin
);

router.get(
	'/',
	[
		isAuthenticated,
		isAdmin
	],
	getAllOrders
);

router.get(
	'/:id',
	[
		isAuthenticated,
		isAdmin
	],
	getOrderById
);

router.delete(
	'/:id',
	[
		isAuthenticated
	],
	deleteOrder
);

module.exports = router;
