const User = require("../models/User");
const Agent = require("../models/Agent");

exports.registerAgent = async (req, res, next) => {
	const { username, email, password, rank } = req.body;
	try {
		const agent = await Agent.create({
			username,
			email,
			password,
			rank,
		});
		res.status(201).json({
			success: true,
			agent,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
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
		res.status(201).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.userSignIn = (req, res, next) => {
	res.send("Sign In User Route");
};

exports.userDetails = (req, res, next) => {
	res.send("User Data Route");
};

exports.convertUserToAdmin = (req, res, next) => {
	res.send("Convert User to Admin Route");
};

exports.convertUserToAgent = (req, res, next) => {
	res.send("Convert User to Agent Route");
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
