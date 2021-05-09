const User = require('../models/User');

const validate = async (username, email, password) => {
	if (username.trim() == '') {
		return 'username is required field!';
	}
	else if (email.trim() == '') {
		return 'email is required field!';
	}
	else if (password.trim() == '') {
		return 'password is required field!';
	}
	else if (username.trim().length < 4) {
		return 'username must be at least 4 characters long!';
	}
	else if (password.length < 6 || password.length > 12) {
		return 'password must be between 6 to 12 characters long!';
	}
	else if (!isValidEmail(email)) {
		return 'Please enter a valid email address!';
	}

	const user = await User.findOne({ email });
	if (user) {
		return 'user with this email already exists,login instead!';
	}
	const user2 = await User.findOne({ username });
	if (user2) {
		return 'This username is taken, try another one!';
	}
};

function isValidEmail(email) {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
		return true;
	}
	return false;
}

module.exports = validate;
