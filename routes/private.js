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
	removeAdmin,
	changePassword,
} = require("../controllers/private");
const { protect } = require("../middlewares/protect");
const { adminProtect } = require("../middlewares/adminProtect");
const { superAdminProtect } = require("../middlewares/adminProtect");

router.route("/").get(protect, getPrivateData); // DONE

router.route("/User/details/:id").get(protect, userDetails); //DONE
// router.route("/Admin/convertUser").get(protectAdmin, convertUserToAdmin); //DONE
router
	.route("/Admin/convertUser/:id")
	.patch(protect, adminProtect("admin"), convertUserToAdmin); //DONE
// router.route("/Agent/convertUser/:id").patch(protectAdmin, convertUserToAgent); //DONE
router
	.route("/Agent/convertUser/:id")
	.patch(protect, adminProtect("admin"), convertUserToAgent); //DONE
// router.route("/Agent/remove/:id").delete(protectAdmin, removeAgent); //DONE
router
	.route("/Agent/remove/:id")
	.delete(protect, superAdminProtect("super admin"), removeAgent); //DONE
router
	.route("/Admin/remove/:id")
	.delete(protect, superAdminProtect("super admin"), removeAdmin); //DONT
router.route("/Agent/update/:id").patch(protect, updateAgent); // DONE
router.route("/User/update/:id").patch(protect, updateUser); //DONE
router.route("/User/changePassword/:id").patch(protect, changePassword); //DONE
module.exports = router;
