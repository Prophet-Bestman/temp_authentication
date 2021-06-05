const express = require("express");
const router = express.Router();
const {
	registerAgent,
	registerAdmin,
	userSignUp,
	userSignIn,
	ConfirmEmail,
	ConfirmationEmialLink,
	resetPassword,
	phonePasswordReset,
	resetPasswordLink,
	changePassword,
	updateAgent,
	updateUser,
	removeAdmin,
	removeAgent,
} = require("../controllers/auth");

router.route("/Agent/register").post(registerAgent);
router.route("/Admin/register").post(registerAdmin);
router.route("/Admin/signin").post(userSignIn);
router.route("/User/signup").post(userSignUp);
router.route("/User/signin").post(userSignIn);
router.route("/User/confirmEmail/:confirmToken").post(ConfirmEmail);
router.route("/User/ConfirmationEmailLink").post(ConfirmationEmialLink);
router.route("/User/resetPassword/:resetToken").patch(resetPassword);
router.route("/User/phonePasswordReset").get(phonePasswordReset);
router.route("/User/resetPasswordLink").post(resetPasswordLink);
router.route("/User/changePassword").get(changePassword);

module.exports = router;
