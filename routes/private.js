const express = require("express");
const router = express.Router();
const {
	userDetails,
	convertUserToAdmin,
	convertUserToAgent,
	getPrivateData,
} = require("../controllers/private");
const { protect } = require("../middlewares/protect");
const { protectAdmin } = require("../middlewares/protectAdmin");

router.route("/").get(protect, getPrivateData);

router.route("/User/details").get(protect, userDetails);
router.route("/Admin/convertUser").get(protectAdmin, convertUserToAdmin);
router.route("/Agent/convertUser").get(protectAdmin, convertUserToAgent);

module.exports = router;
