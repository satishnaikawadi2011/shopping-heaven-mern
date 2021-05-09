const validate = (username, password) => {
	if (username.trim() == '') {
		return 'username is required field!';
	}
	else if (password.trim() == '') {
		return 'password is required field!';
	}
};

module.exports = validate;
