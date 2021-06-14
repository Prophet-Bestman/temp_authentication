const express = require("express");
const passport = require('passport')
const router = express.Router();
const {
	registerAgent,
	registerAdmin,
	registerSuperAdmin,
	userSignUp,
	userSignIn,
	ConfirmEmail,
	ConfirmationEmialLink,
	resetPassword,
	phonePasswordReset,
	resetPasswordLink,
} = require("../controllers/auth");


router.get('/google', passport.authenticate('google', {
	scope: ['email', 'profile']
}))
// router.get( '/auth/google/redirect', (req, res) => {
// 	res.send("You have reached the callback route")
// });
router.route("/Agent/register").post(registerAgent); //Done
router.route("/Admin/register").post(registerAdmin); //Done
router.route("/superAdmin/register").post(registerSuperAdmin); //Done
router.route("/Admin/signin").post(userSignIn); //Done
router.route("/User/signup").post(userSignUp); //Done
router.route("/User/signin").post(userSignIn); //DOne
router.route("/User/confirmEmail/:confirmToken").post(ConfirmEmail); //Done
router.route("/User/ConfirmationEmailLink").post(ConfirmationEmialLink); //Done
router.route("/User/resetPassword/:resetToken").patch(resetPassword); //Done
router.route("/User/phonePasswordReset").get(phonePasswordReset);
router.route("/User/resetPasswordLink").post(resetPasswordLink); //Done

module.exports = router;
