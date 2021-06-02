const { reflect } = require("async");
const User = require("../models/User");
// const Agent = require("../models/Agent");
const ErrorResponse = require("../utils/errorResponse");

exports.registerAgent = async (req, res, next) => {
	const { username, email, password, rank } = req.body;
	try {
		const user = await User.create({
			username,
			email,
			password,
			rank,
		});
		sendToken(user, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.userSignUp = async (req, res, next) => {
	const { username, email, password, rank } = req.body;
	try {
		const user = await User.create({
			username,
			email,
			password,
			rank,
		});
		sendToken(user, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.userSignIn = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new ErrorResponse("Please enter an email and password", 400));
	}

	try {
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return next(new ErrorResponse("Invalid Credentials", 401));
		}
		const isMatch = await user.matchPasswords(password);

		if (!isMatch) {
			return next(new ErrorResponse("Invalid Password", 401));
		}

		sendToken(user, 200, res);
	} catch (error) {
		next(error);
	}
};

exports.ConfirmEmail = (req, res, next) => {
	res.send("Confirm Email Route");
};

exports.ConfirmationEmialLink = (req, res, next) => {
	res.send("Confirmation Email Route");
};

exports.resetPassword = (req, res, next) => {
	res.send("Reset Password Route");
};

exports.phonePasswordReset = (req, res, next) => {
	res.send("Phone Reset Password Route");
};

exports.resetPasswordLink = (req, res, next) => {
	res.send("Reset Password Link Route");
};

exports.changePassword = (req, res, next) => {
	res.send("Change Password Route");
};

exports.updateAgent = (req, res, next) => {
	res.send("Update Agent Route");
};

exports.updateUser = (req, res, next) => {
	res.send("Update User Password Route");
};

exports.removeAdmin = (req, res, next) => {
	res.send("Remove Admin Route");
};

exports.removeAgent = (req, res, next) => {
	res.send("Remove Agent Route");
};

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({
		success: true,
		token,
	});
};
