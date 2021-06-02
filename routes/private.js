const express = require("express");
const router = express.Router();
const {
	userDetails,
	convertUserToAdmin,
	convertUserToAgent,
	getPrivateData,
} = require("../controllers/private");
const { protect } = require("../middlewares/protect");

router.route("/").get(protect, getPrivateData);

router.route("/User/details").get(protect, userDetails);
router.route("/Admin/convertUser").get(protect, convertUserToAdmin);
router.route("/Agent/convertUser").get(protect, convertUserToAgent);

module.exports = router;
