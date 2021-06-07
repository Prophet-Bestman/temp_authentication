let User = require("../models/User");
let Admin = require("../models/Admin");
const ErrorResponse = require("../utils/errorResponse");

exports.getPrivateData = (req, res, next) => {
	return res.status(200).json({
		success: true,
		data: "Access to page granted",
	});
};

// User details
exports.userDetails = async (req, res, next) => {
	try {
		const id = req.params.id;
		User = await User.findById(id);
		if (!User) {
			return next(new ErrorResponse("User not found "), 404);
		}
		return res.status(200).json({
			success: true,
			User,
		});
	} catch (error) {
		next(error);
	}
};

// ADMIN ACCESSS ONLY
exports.convertUserToAdmin = async (req, res, next) => {
	res.status(204).json({
		success: true,
		data: "Access to page granted",
	});
};

// Convert User to Agent
exports.convertUserToAgent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		console.log(updates);
		const options = { new: true, useFindAndModify: false };
		const Agent = await User.findByIdAndUpdate(id, updates, options);
		return res.status(204).json({
			success: true,
			Agent,
		});
	} catch (error) {
		next(error);
	}
};

// Update User Details
exports.updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const options = { new: true, useFindAndModify: false };
		const user = await User.findOneAndUpdate(id, updates, options);
		if (!user) {
			return next(new ErrorResponse("User not found"), 404);
		}
		res.status(201).json({
			success: true,
			user,
		});
	} catch (error) {
		next(error);
	}
};

// Update Agent Details
exports.updateAgent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const options = { new: true, useFindAndModify: false };
		const Agent = await User.findByIdAndUpdate(id, updates, options);
		if (!Agent) {
			return next(new ErrorResponse("User not found"), 404);
		}
		res.status(201).json({
			success: true,
			data: "Agent Updated",
			Agent,
		});
	} catch (error) {
		next(error);
	}
};

// Delete an Agent
exports.removeAgent = async (req, res, next) => {
	try {
		const id = req.params.id;
		// const   updates = req.body;
		// console.log(updates)
		const options = { useFindAndModify: false };
		const RemovedAgent = await User.findByIdAndDelete(id, options);
		res.status(201).json({
			success: true,
			RemovedAgent,
			data: "Agent Removed",
		});
	} catch (error) {
		return next(new ErrorResponse("Cannot delete Agent", 409));
	}
	// res.status(200).json({
	// 	success: true,
	// 	data: "Agent Updated",
	// });
};
// Delete an Admin
exports.removeAdmin = async (req, res, next) => {
	try {
		const id = req.params.id;
		// const   updates = req.body;
		// console.log(updates)
		const options = { useFindAndModify: false };
		const RemovedAdmin = await Admin.findByIdAndDelete(id, options);
		res.status(201).json({
			success: true,
			RemovedAdmin,
			data: "Admin Removed",
		});
	} catch (error) {
		next(error);
	}
	// res.status(200).json({
	// 	success: true,
	// 	data: "Agent Updated",
	// });
};

exports.changePassword = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updates = req.body.password;
		const options = { new: true };
		const user = await User.findById(id);
		if (!user) {
			return next(new ErrorResponse("User Not found in database"), 404);
		}
		user.password = updates;

		await user.save();
		res.status(201).json({
			success: true,
			data: "User Password Changed",
			user,
		});
	} catch (error) {
		next(error);
	}
};
