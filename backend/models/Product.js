const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		title       : {
			type     : String,
			required : true
		},
		image       : {
			type     : String,
			required : true
		},
		categoryId  : {
			type     : mongoose.Schema.Types.ObjectId,
			required : true,
			ref      : 'Category'
		},
		description : {
			type     : String,
			required : true
		},
		price       : {
			type     : Number,
			required : true,
			default  : 0
		}
	},
	{
		timestamps : true
	}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
