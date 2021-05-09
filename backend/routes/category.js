const express = require('express');
const { addCategory, deleteCategory, getAllCategories } = require('../controllers/product');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post(
	'/add',
	[
		isAuthenticated,
		isAdmin
	],
	addCategory
);

router.delete(
	'/:id',
	[
		isAuthenticated,
		isAdmin
	],
	deleteCategory
);

router.get(
	'/',
	[
		isAuthenticated
	],
	getAllCategories
);

module.exports = router;
