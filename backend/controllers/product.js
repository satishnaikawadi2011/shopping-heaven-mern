const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');

const addCategory = async (req, res) => {
	let { name } = req.body;
	if (name.trim() == '') {
		return res.status(400).json({ message: 'Category name is required !' });
	}
	name = name.charAt(0).toUpperCase() + name.slice(1);
	try {
		const categoryExists = await Category.findOne({ name });
		if (categoryExists) {
			return res.status(400).json({ message: 'Category with this name is already exists !' });
		}
		const category = await Category.create({ name });
		return res.status(201).json(category);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const deleteCategory = async (req, res) => {
	try {
		const othersCategory = await Category.findOne({ name: 'Others' });
		if (othersCategory._id == req.params.id) {
			return res.status(404).json({ message: 'You cannot delete this category,this is mandatory category !' });
		}
		const categoryExists = await Category.findOne({ _id: req.params.id });
		if (!categoryExists) {
			return res.status(404).json({ message: 'Category not found !' });
		}
		await categoryExists.delete();
		const products = await Product.find({ categoryId: req.params.id });
		products.forEach(async (p) => {
			p.categoryId = othersCategory._id;
			await p.save();
		});
		return res.status(200).json({ message: 'Category deleted successfully !' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({});
		return res.status(200).json(categories);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const createProduct = async (req, res) => {
	try {
		const othersCategory = await Category.findOne({ name: 'Others' });
		const product = new Product({
			title       : 'Sample Product',
			image       : '/uploads/sample-product.jpg',
			description : 'This is a sample description.This will be get updated soon.',
			categoryId  : othersCategory._id,
			price       : 0
		});
		const createdProduct = await product.save();
		return res.status(201).json(createdProduct);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const updateProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const { title, description, price, categoryId, image } = req.body;
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ message: 'Product not found !' });
		}
		else {
			product.title = title;
			product.price = price;
			product.description = description;
			product.categoryId = categoryId;
			product.image = image;

			const updatedProduct = await product.save();
			return res.status(200).json(updatedProduct);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		return res.status(200).json(products);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: 'Product not found !' });
		}
		await product.remove();
		return res.status(200).json({ message: 'Product deleted successfully !' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: 'Product not found !' });
		}
		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

const getStats = async (req, res) => {
	try {
		let productCount,
			customerCount,
			categoryCount,
			selledProductCount = 0,
			deliveredOrderCount = 0,
			pendingOrderCount = 0;
		await Product.countDocuments(function(err, count) {
			if (err) {
				console.log(err);
			}
			else {
				productCount = count;
			}
		});

		await Category.countDocuments(function(err, count) {
			if (err) {
				console.log(err);
			}
			else {
				categoryCount = count;
			}
		});

		await User.countDocuments(function(err, count) {
			if (err) {
				console.log(err);
			}
			else {
				customerCount = count;
			}
		});

		const orders = await Order.find({});
		orders.forEach((order) => {
			if (order.status) {
				deliveredOrderCount += 1;
			}
			else {
				pendingOrderCount += 1;
			}
			let count = 0;
			order.orderItems.forEach((item) => {
				count += item.qty;
			});
			selledProductCount += count;
		});
		return res.status(200).json({
			productCount,
			categoryCount,
			selledProductCount,
			deliveredOrderCount,
			pendingOrderCount,
			customerCount
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong !' });
	}
};

module.exports.addCategory = addCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.getAllCategories = getAllCategories;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.deleteProduct = deleteProduct;
module.exports.getProductById = getProductById;
module.exports.getStats = getStats;
