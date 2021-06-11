const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.adminProtect = (rank) => {
	return async (req, res, next) => {
		const user = req.user;

		if (user.rank !== "admin") {
			return next(new ErrorResponse("You are not an admin"), 401);
		}
		next();
	};
};

exports.superAdminProtect = (rank) => {
	return async (req, res, next) => {
		const user = req.user;

		if (user.rank !== "super admin") {
			return next(
				new ErrorResponse("You are not authorized to this route"),
				401
			);
		}
		next();
	};
};
