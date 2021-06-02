exports.getPrivateData = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: "Access to page granted",
	});
};

exports.userDetails = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: "Access to page granted",
	});
};

exports.convertUserToAdmin = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: "Access to page granted",
	});
};

exports.convertUserToAgent = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: "Access to page granted",
	});
};
