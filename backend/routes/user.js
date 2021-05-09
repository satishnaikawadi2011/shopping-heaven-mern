const express = require('express');
const {
	register,
	login,
	makeUserAdmin,
	deleteuserById,
	removeUserAsAdmin,
	adminLogin,
	getAllUsers
} = require('../controllers/user');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.get(
	'/',
	[
		isAuthenticated,
		isAdmin
	],
	getAllUsers
);

router.post('/register', register);

router.post('/login', login);

router.post('/admin/login', adminLogin);

router.post(
	'/admin/:username',
	[
		isAuthenticated,
		isAdmin
	],
	makeUserAdmin
);

router.delete(
	'/:id',
	[
		isAuthenticated,
		isAdmin
	],
	deleteuserById
);

router.delete(
	'/admin/:username',
	[
		isAuthenticated,
		isAdmin
	],
	removeUserAsAdmin
);

module.exports = router;
