const express = require ("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controller/userController")
router.post("/register",[
	body("email").isEmail().withMessage("Email must be more than 5 letters"),
	body("fullname.firstname".isLength({min:3}).withMessage("Firstname must be more than 5 letters")),
	body("password").islength({min:6}).withMessage("Password must be more than 5 letters")],userController.registerUser)

module.exports = router;
