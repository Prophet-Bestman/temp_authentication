const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
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
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	rank: {
		type: String,
		required: [true, "Provide a username"],
	},
});

// Encrtypt password before admin is saved
AdminSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	// To generate encryption salt
	const salt = await bcrypt.genSalt(10);

	// Hash password
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Decrypts hashed password and compares with the password entered by admin
AdminSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Creates a signed token with the admin ID, JWT_SECRET and JWT_EXPIRE
AdminSchema.methods.getAdminToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_ADMIN_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
