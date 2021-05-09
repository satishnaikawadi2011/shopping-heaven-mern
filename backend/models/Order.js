const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		user            : {
			type     : mongoose.Schema.Types.ObjectId,
			required : true,
			ref      : 'User'
		},
		orderItems      : [
			{
				title     : { type: String, required: true },
				qty       : { type: Number, required: true },
				image     : { type: String, required: true },
				price     : { type: Number, required: true },
				productId : {
					type     : mongoose.Schema.Types.ObjectId,
					required : true,
					ref      : 'Product'
				}
			}
		],
		shippingAddress : {
			fullName    : { type: String, default: 'N/A' },
			phoneNumber : { type: String, default: 'N/A' },
			state       : { type: String, default: 'N/A' },
			road        : { type: String, default: 'N/A' },
			building    : { type: String, default: 'N/A' },
			city        : { type: String, default: 'N/A' },
			postalCode  : { type: String, default: 'N/A' },
			country     : { type: String, default: 'N/A' }
		},
		paymentMethod   : {
			type     : String,
			required : true
		},
		paymentResult   : {
			id        : { type: String },
			currency  : { type: String },
			created : { type: Number },
			amount    : { type: Number },
			receipt_url : { type: String }
		},
		itemsPrice      : {
			type     : Number,
			required : true,
			default  : 0.0
		},
		shippingPrice   : {
			type     : Number,
			required : true,
			default  : 0.0
		},
		taxPrice        : {
			type     : Number,
			required : true,
			default  : 0.0
		},
		totalPrice      : {
			type     : Number,
			required : true,
			default  : 0.0
		},
		isDelivered     : {
			type     : Boolean,
			default  : false,
			required : true
		},
		isPaid          : {
			type     : Boolean,
			default  : false,
			required : true
		},
		paidAt          : {
			type : Date
		},
		deliveredAt     : {
			type : Date
		}
	},
	{
		timestamps : true
	}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
