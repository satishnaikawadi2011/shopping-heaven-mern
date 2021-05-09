const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async function(req, res, next) {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded = await jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (err) {
			res.status(401);
			const error = new Error('Invalid token!');
			next(error);
		}
	}
	else {
		res.status(401);
		const error = new Error('Not authenticated or No token provided!');
		next(error);
	}
};

module.exports = auth;
