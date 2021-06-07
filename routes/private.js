const express = require("express");
const router = express.Router();
const {
	userDetails,
	convertUserToAdmin,
	convertUserToAgent,
	getPrivateData,
	updateAgent,
	updateUser,
	removeAgent,
	changePassword,
} = require("../controllers/private");
const { protect } = require("../middlewares/protect");
const { protectAdmin } = require("../middlewares/protectAdmin");

router.route("/").get(protect, getPrivateData);

router.route("/User/details/:id").get(protect, userDetails);
router.route("/Admin/convertUser").get(protectAdmin, convertUserToAdmin);
router.route("/Agent/convertUser/:id").patch(protectAdmin, convertUserToAgent);
router.route("/Agent/remove/:id").delete(protectAdmin, removeAgent);
router.route("/Agent/update/:id").patch(protect, updateAgent);
router.route("/User/update/:id").patch(protect, updateUser);
router.route("/User/changePassword/:id").patch(protect, changePassword);
module.exports = router;
