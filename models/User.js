const crypto = require('crypto')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Provide a username"],
	},
	email: {
		type: String,
		required: [true, "Provide an Email"],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Provide a valid email",
		],
	},
	password: {
		type: String,
		required: [true, "please add a password"],
		minLength: 6,
		select: false,
	},
	confirmEmailToken: String,
	confirmTokenExpire: Date,
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	
	isVerified: false,
	rank: {
		type: String,
		required: [true, "Provide a rank"],
	},
});

// Encrtypt password before user is saved
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	// To generate encryption salt
	const salt = await bcrypt.genSalt(10);

	// Hash password
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Decrypts hashed password and compares with the password entered by user
UserSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Creates a signed token with the user ID, JWT_SECRET and JWT_EXPIRE
UserSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Hashed token generation for forgot passwords
UserSchema.methods.getResetPasswordToken = function() {
	const resetToken = crypto.randomBytes(20).toString("hex");

	this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

	return resetToken; 
}


// Hashed token generation for eamil confirmation
UserSchema.methods.getConfirmToken = function() {
	const confirmToken = crypto.randomBytes(20).toString("hex");

	this.confirmEmailToken = crypto.createHash("sha256").update(confirmToken).digest("hex");

	this.confirmTokenExpire = Date.now() + 30 * (60 * 1000);

	return confirmToken;
	
}

const User = mongoose.model("user", UserSchema);

module.exports = User;
