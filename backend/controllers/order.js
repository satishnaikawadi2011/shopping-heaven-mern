const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');
const stripeClient = require('stripe')(process.env.STRIPE_SECRET_KEY);

const addOrder = async (req, res) => {
	const {
		orderItems,
		address       : { fullName, phoneNumber, pincode, state, country, road, building, city },
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
		paymentMethod,
		paymentResult
	} = req.body;
	try {
		if (orderItems && orderItems.length == 0) {
			return res.status(400).json({ message: 'No order items !' });
		}
		const shippingAddress = {
			fullName,
			phoneNumber,
			state,
			road,
			building,
			city,
			postalCode  : pincode,
			country
		};
		const order = new Order({
			orderItems,
			shippingAddress,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice,
			user            : req.user._id,
			paymentMethod,
			paymentResult   :
				paymentResult ? paymentResult :
				null
		});
		const createdOrder = await order.save();
		return res.status(201).json(createdOrder);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const getOrderById = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id).populate('user', 'username email');
		if (!order) {
			return res.status(404).json({ message: 'Order not found !' });
		}
		return res.json(order);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
		// next(error);
	}
};

const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id });
		return res.json(orders);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({});
		return res.json(orders);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const markOrderAsDelivered = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) {
			return res.status(404).json({ message: 'Order not found !' });
		}
		order.isDelivered = true;
		order.deliveredAt = Date.now();
		await order.save();
		return res.json({ message: `Order with ID ${order._id} is marked as Delivered !` });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const updateOrderToPaid = async (req, res) => {
	const { token, name, amount } = req.body;
	if (!token || !name || !amount) {
		return res.status(400).json({ message: 'Please provide all info needed for payment!' });
	}
	try {
		const order = await Order.findById(req.params.id);
		if (!order) {
			return res.status(404).json({ message: 'Order not found !' });
		}
		const paymentIntent = await stripeClient.paymentIntents.create({
			amount               : amount * 100,
			currency             : 'inr',
			payment_method_types : [
				'card'
			],
			payment_method_data  : {
				type : 'card',
				card : {
					token
				}
			},
			confirm              : true
		});
		const data = paymentIntent.charges.data[0];
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id       : data.id,
			currency : data.currency,
			created  : data.created,
			amount   : amount,
			receipt_url : data.receipt_url
		};
		const updatedOrder = await order.save();

		return res.json(updatedOrder);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const markOrderAsPaidByAdmin = async (req, res) => {
	const { currency, amount } = req.body;
	if (!currency || !amount) {
		return res.status(400).json({ message: 'Please provide all info needed for payment!' });
	}
	try {
		const order = await Order.findById(req.params.id);
		if (!order) {
			return res.status(404).json({ message: 'Order not found !' });
		}
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id       : uuidv4(),
			currency : currency,
			created  : Date.now(),
			amount   : amount
		};
		const updatedOrder = await order.save();
		return res.json(updatedOrder);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const deleteOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (order.user !== req.user._id) {
			return res.status(403).json({ message: 'You are not allowed to delete this order!' });
		}
		if (!order) {
			return res.status(404).json({ message: 'Order not found !' });
		}
		await order.remove();
		return res.status(200).json({ message: 'Order deleted successfully !' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

module.exports.addOrder = addOrder;
module.exports.getOrderById = getOrderById;
module.exports.getMyOrders = getMyOrders;
module.exports.getAllOrders = getAllOrders;
module.exports.markOrderAsDelivered = markOrderAsDelivered;
module.exports.updateOrderToPaid = updateOrderToPaid;
module.exports.deleteOrder = deleteOrder;
module.exports.markOrderAsPaidByAdmin = markOrderAsPaidByAdmin;
