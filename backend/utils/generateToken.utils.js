const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
	const token = jwt.sign(
		{
			userId: userId,
		},
		"secret",
		{
			expiresIn: "2d",
		},
	);
	return token;
};