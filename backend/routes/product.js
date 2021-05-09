const express = require('express');
const {
	createProduct,
	updateProduct,
	getAllProducts,
	deleteProduct,
	getProductById
} = require('../controllers/product');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post(
	'/create',
	[
		isAuthenticated,
		isAdmin
	],
	createProduct
);

router.get(
	'/:id',
	[
		isAuthenticated
	],
	getProductById
);

router.patch(
	'/:id',
	[
		isAuthenticated,
		isAdmin
	],
	updateProduct
);

router.delete(
	'/:id',
	[
		isAuthenticated,
		isAdmin
	],
	deleteProduct
);

router.get(
	'/',
	[
		isAuthenticated
	],
	getAllProducts
);

module.exports = router;
