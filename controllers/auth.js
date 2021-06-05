// const { reflect } = require("async");
const User = require("../models/User");
const Admin = require("../models/Admin");
// const Agent = require("../models/Agent");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto");

exports.registerAdmin = async (req, res, next) => {
	const { username, email, password, rank } = req.body;
	try {
		const admin = await Admin.create({
			username,
			email,
			password,
			rank,
		});
		sendAdminToken(admin, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.adminSignIn = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new ErrorResponse("Please enter an email and password", 400));
	}

	try {

		const admin = await Admin.findOne({email}).select("+password");
		if (!admin) {
			return next(new ErrorResponse("Invalid Credentials", 401));
		}
		const isMatch = await admin.matchPasswords(password);

		if (!isMatch) {
			return next(new ErrorResponse("Invalid Password", 401));
		}

		sendAdminToken(admin, 200, res);
	} 
	catch (error) {
		next(error);
	}
};


exports.registerAgent = async (req, res, next) => {
	const { username, email, password, rank } = req.body;
	try {
		const user = await User.create({
			username,
			email,
			password,
			rank,
		});
		sendUserToken(user, 201, res);
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
		sendUserToken(user, 201, res);
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

		sendUserToken(user, 200, res);
	} catch (error) {
		next(error);
	}
};


exports.ConfirmEmail = async (req, res, next) => {
	let confirmToken = req.params.confirmToken;
	const confirmEmailToken = crypto.createHash("sha256").update(confirmToken).digest("hex");

	try{
		const user = await User.findOne({
			confirmEmailToken,
			confirmTokenExpire: { $gt: Date.now() }
		})
		console.log(user.email)
		if (!user) {
			return next(new ErrorResponse("Invalid token Token"), 404);
		}

		console.log(user.isVerified)
		user.isVerified = true;
		user.confirmEmailToken = undefined
		user.confirmTokenExpire = undefined
		
		await user.save()

		return res.status(201).json({
			success: true,
			data: "Email Confirmation Successful"
		})
	}
	catch(error){
		next(error)
	}
	
};



exports.ConfirmationEmialLink = async(req, res, next) => {

	const {email} = req.body;
	try {
		const user = await User.findOne({email})
		console.log(user);
		if(!user) {
			next(new ErrorResponse("Email not found"), 404)
		}
		const confirmToken = user.getConfirmToken();
		await user.save()

		// Link to front End for
		// The front End will contain confirm email Button which will be a route to User/confirmEmail
		confirmUrl = `http://localhost:3000/confirmemail/${confirmToken}`

		const message = `
			<h1>Email confirmation message</h1>
			<p>Click the link below to reset your password</p>
			<p>Link Expires in 30 minutes</p>
			<a href=${confirmUrl} clickTracking=off>Confirmation Link</a>
		`

		try {
			await sendEmail({
				to: user.email,
				subject: "Email Confirmation",
				text: message,

			})
			res.status(200).json({
				success: true,
				data: "Email Confirmation Sent"
			})
		}
		catch{

			user.confrirmEmailToken = undefined;
			user.confirmTokenExpire = undefined;

			next(new ErrorResponse("Couldn't send Email confirmation"), 500)
		}
	} catch (error) {
		next(error)
	}

};

exports.resetPassword = async (req, res, next) => {
	let resetToken = req.params.resetToken;
	const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() }
		})
		if (!user) {
			return next(new ErrorResponse("Invalid Reset Tooken"), 404);
		}

		user.password = req.body.password;
		user.resetPasswordToken= undefined;
		user.resetPasswordExpire= undefined;

		await user.save()

		return res.status(201).json({
			success: true,
			data: "Password Reset Successful"
		})
	} catch (error) {
		next(error)
	}
};

exports.phonePasswordReset = (req, res, next) => {
	res.send("Phone Reset Password Route");
};


// Send Reset Link to Email
exports.resetPasswordLink = async (req, res, next) => {
	const {email} = req.body;
	try {
		const user = await User.findOne({email})
		console.log(user)
		if(!user) {
			return next(new ErrorResponse("Couln't get this email"), 404)
		}
		const resetToken = user.getResetPasswordToken()

		await user.save()

		// Link to front End
		// The front End will contain a password change from which will be a fire to /user/resetPassword
		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

		const message = `
			<h1>You have made a request for a new password</h1>
			<p>Click the link below to reset your password</p>
			<p>Link Expires in 10 minutes</p>
			<a href=${resetUrl} clickTracking=off>Reset Link</a>
		`

		try {
			await sendEmail({
				to:user.email,
				subject: "Password Reset Request",
				text: message
			})
			res.status(200).json({
				success: true,
				data: "Email sent!"
			})
		} catch (error) {
			user.getResetPasswordToken = undefined;
			user.getResetPasswordExpire = undefined;

			return next(new ErrorResponse("Email Could not be sent"), 500)
		}
	} catch (error) {
		next(error)
	}
};

exports.changePassword = (req, res, next) => {
	res.send("Change Password Route");
};

// Send user  and admin tokens
const sendUserToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({
		success: true,
		token,
	});
};

const sendAdminToken = (admin, statusCode, res) => {
	const token = admin.getAdminToken();
	res.status(statusCode).json({
		success: true,
		token,
	});
};
