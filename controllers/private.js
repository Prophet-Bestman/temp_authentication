let User = require('../models/User');
let Admin = require('../models/Admin');
ErrorResponse = require('../utils/errorResponse')

exports.getPrivateData = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: "Access to page granted",
	});
};



// User details
exports.userDetails = async (req, res, next) => {
	try {
		const id = req.params.id;
		User = await User.findById(id)
		res.status(200).json({
			success: true,
			User
		})

	} catch (error) {
		return next(new ErrorResponse("Cannot Fetch  User", 400));
	}
};

// ADMIN ACCESSS ONLY
exports.convertUserToAdmin = (req, res, next) => {
	res.status(204).json({
		success: true,
		data: "Access to page granted",
	});
};


// Convert User to Agent
exports.convertUserToAgent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const   updates = req.body;
		console.log(updates)
		const options = {new: true, useFindAndModify: false};
		const Agent = await User.findByIdAndUpdate(id, updates, options);
		res.status(204).json({
			success: true,
			Agent
		});

	} catch (error) {
		return next(new ErrorResponse("Cannot convert  User", 409));
	}
	
};

// Update User Details
exports.updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const   updates = req.body;
		console.log(updates)
		const options = {new: true, useFindAndModify: false};
		User = await User.findByIdAndUpdate(id, updates, options);
		res.status(204).json({
			success: true,
			User
		});

	} catch (error) {
		return next(new ErrorResponse("Cannot Update User", 409));
	}
	// res.status(200).json({
	// 	success: true,
	// 	data: "User Updated",
	// });
};

// Update Agent Details
exports.updateAgent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const   updates = req.body;
		console.log(updates)
		const options = {new: true, useFindAndModify: false};
		const Agent = await User.findByIdAndUpdate(id, updates, options);
		res.status(204).json({
			success: true,
			Agent
		});

	} catch (error) {
		return next(new ErrorResponse("Cannot convert Agent", 409));
	}
	// res.status(200).json({
	// 	success: true,
	// 	data: "Agent Updated",
	// });
};

// Delete an Agent
exports.removeAgent = async (req, res, next) => {
	try {
		const id = req.params.id;
		// const   updates = req.body;
		// console.log(updates)
		const options = { useFindAndModify: false};
		const RemovedAgent = await User.findByIdAndDelete(id, options);
		res.status(204).json({
			success: true,
			RemovedAgent,
			data: "Agent Removed"
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
		const options = { useFindAndModify: false};
		const RemovedAdmin = await Admin.findByIdAndDelete(id, options);
		res.status(204).json({
			success: true,
			RemovedAdmin,
			data: "Admin Removed"
		});

	} catch (error) {
		return next(new ErrorResponse("Cannot delete Admin", 409));
	}
	// res.status(200).json({
	// 	success: true,
	// 	data: "Agent Updated",
	// });
};
