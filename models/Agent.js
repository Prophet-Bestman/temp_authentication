const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const agentSchema = new mongoose.Schema({
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

// Encrtypt password before agent is saved
agentSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	// To generate encryption salt
	const salt = await bcrypt.genSalt(10);

	// Hash password
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const Agent = mongoose.model("agent", agentSchema);

module.exports = Agent;
