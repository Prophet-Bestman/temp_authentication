const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	console.log(err);

	if (err.code === 11000) {
		const message = "Duplicate Field value Entered";
		error = new ErrorResponse(message, 400);
	}

	if (err.name === "validation error") {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "server Error",
	});
};

module.exports = errorHandler;
