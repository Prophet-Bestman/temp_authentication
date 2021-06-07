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
} = require("../controllers/auth");

router.route("/Agent/register").post(registerAgent); //Done
router.route("/Admin/register").post(registerAdmin); //Done
router.route("/Admin/signin").post(userSignIn); //Done
router.route("/User/signup").post(userSignUp); //Done
router.route("/User/signin").post(userSignIn); //DOne
router.route("/User/confirmEmail/:confirmToken").post(ConfirmEmail); //Done
router.route("/User/ConfirmationEmailLink").post(ConfirmationEmialLink); //Done
router.route("/User/resetPassword/:resetToken").patch(resetPassword); //Done
router.route("/User/phonePasswordReset").get(phonePasswordReset);
router.route("/User/resetPasswordLink").post(resetPasswordLink); //Done

module.exports = router;
