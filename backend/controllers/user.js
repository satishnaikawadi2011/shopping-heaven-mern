const jwt = require('jsonwebtoken');
const validateRegister = require('../utils/registerValidator');
const validateLogin = require('../utils/loginValidator');
const User = require('../models/User');

const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const message = await validateRegister(username, email, password);
		if (message) {
			return res.status(400).json({ message });
		}
		const user = new User({ email, password, username });
		await user.save();
		const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		return res.status(201).json({ user, token });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		let message;
		message = validateLogin(username, password);
		if (message) {
			return res.status(400).json({ message });
		}
		const user = await User.findOne({ username });
		if (!user) {
			message = 'No user found with this username!';
			return res.status(400).json({ message });
		}
		if (!await user.matchPassword(password)) {
			message = 'Invalid credentials , try again !';
			return res.status(400).json({ message });
		}
		const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		return res.status(201).json({ user, token });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

const makeUserAdmin = async (req, res) => {
	try {
		const username = req.params.username;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: 'User not found !' });
		}
		user.isAdmin = true;
		await user.save();
		return res.status(200).json({ message: `User with username ${username} has been granted admin permissions!` });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

const removeUserAsAdmin = async (req, res) => {
	try {
		const username = req.params.username;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: 'User not found !' });
		}
		user.isAdmin = false;
		await user.save();
		return res.status(200).json({ message: `User with username ${username} has been removed from admin list!` });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

const deleteuserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found !' });
		}
		await user.remove();
		return res.status(200).json({ message: `User removed successfully !` });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

const adminLogin = async (req, res) => {
	try {
		const { username, password } = req.body;
		let message;
		message = validateLogin(username, password);
		if (message) {
			return res.status(400).json({ message });
		}
		const user = await User.findOne({ username });
		if (!user) {
			message = 'No user found with this username!';
			return res.status(400).json({ message });
		}
		if (!await user.matchPassword(password)) {
			message = 'Invalid credentials , try again !';
			return res.status(400).json({ message });
		}
		if (!user.isAdmin) {
			message = 'This login is for admin users only !';
			return res.status(400).json({ message });
		}
		const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		return res.status(200).json({ user, token });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});
		return res.status(200).json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

module.exports.register = register;
module.exports.login = login;
module.exports.makeUserAdmin = makeUserAdmin;
module.exports.deleteuserById = deleteuserById;
module.exports.removeUserAsAdmin = removeUserAsAdmin;
module.exports.adminLogin = adminLogin;
module.exports.getAllUsers = getAllUsers;
