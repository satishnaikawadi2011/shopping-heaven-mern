const User = require('../models/User');

const isAdmin = async function(req, res, next) {
	let token;
	const user = await User.findOne({ username: req.user.username });
	if (user && user.isAdmin) {
		next();
	}
	else {
		res.status(401);
		const error = new Error('Not authorized as admin user!');
		next(error);
	}
};

module.exports = isAdmin;
