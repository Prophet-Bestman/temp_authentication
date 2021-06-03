const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const ErrorResponse = require("../utils/errorResponse");

exports.protectAdmin = async (req, res, next) => {
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
		return next(
			new ErrorResponse("Sorry, Not authorised to access this route", 401)
		);
	}

	// Verify token found after string "Bearer"
	try {
		// Decode token with our JWT_SECRET key
		const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

		// Extract ID  from decoded token and save in admin
		const admin = await Admin.findById(decoded.id);

		// Handles no mateched admin to ID
		if (!admin) {
			return next(new ErrorResponse("No user found with this ID", 404));
		}

		// sets req.admin to found admin
		req.admin = admin;

		next();
	} catch (error) {
		return next(new ErrorResponse("Not authorised to access this route", 401));
	}
};
