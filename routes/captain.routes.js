const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware") 

router.post("/register",[
	body('email').isEmail().withMessage("Invalid Email"),
	body('fullname.firstname').isLength({min:3}).withMessage("First name must be more than 2 letters"),
	body("password").isLength({min:6}).withMessage("Password must be more than 5 characters"),
	body("vehicle.color").isLength({min:3}).withMessage("Color must be more than 3 charaters"),
	body("vehicle.plate").isLength({min:3}).withMessage("Plate must be more than 3 charaters"),
	body("vehicle.capacity").isInt({min:1}).withMessage("Capacity must be a number and at least one"),
	body("vehicle.vehicleType").isIn(["car","motercycle","auto"]).withMessage("Invalid Choice")

],captainController.captainRegister);

router.post("/login",[
	body("email").isEmail().withMessage("Invalid Email"),
	body("password").isLength({min:6}).withMessage("password must be more than 5 characters")
],captainController.captainLogin);

router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile);

router.post("/logout",authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router;
