const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const ErrorrResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
	let token;

	// check if response headers contain string "Bearer"
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		// split the string after "Bearer" and save in token
		token = req.headers.authorization.split(" ")[1];
	}

	//  Handle case of no token found after string "Bearer"
	if (!token) {
		return next(new ErrorResponse("Not authorised to access this route", 401));
	}

	// Verify token found after string "Bearer"
	try {
		// Decode token with our JWT_SECRET key
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Extract ID  from decoded token and save in user
		const user = await User.findById(decoded.id);

		// Handles no mateched user to ID
		if (!user) {
			return next(new ErrorResponse("No user found with this ID", 404));
		}

		// sets req.user to found user
		req.user = user;

		next();
	} catch (error) {
		return next(new ErrorResponse("Not authorised to access this route", 401));
	}
};
