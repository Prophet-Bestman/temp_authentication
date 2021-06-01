const express = require("express");
const router = express.Router();
const {
	registerAgent,
	userSignUp,
	userSignIn,
	userDetails,
	convertUserToAdmin,
	convertUserToAgent,
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
router.route("/User/signup").post(userSignUp);
router.route("/User/signin").post(userSignIn);
router.route("/User/:id").get(userDetails);
router.route("/Admin/convertUser").patch(convertUserToAdmin);
router.route("/Agent/convertUser").patch(convertUserToAgent);
router.route("/User/confirmEmail").post(ConfirmEmail);
router.route("/User/ConfirmationEmailLink").post(ConfirmationEmialLink);
router.route("/User/resetPassword/:resetToken").put(resetPassword);
router.route("/User/phonePasswordReset").get(phonePasswordReset);
router.route("/User/resetPasswordLink").get(resetPasswordLink);
router.route("/User/changePassword").get(changePassword);
router.route("/Agent").patch(updateAgent);
router.route("/User").patch(updateUser);
router.route("/Admin/remove").delete(removeAdmin);
router.route("/Agent/remove").delete(removeAgent);

module.exports = router;