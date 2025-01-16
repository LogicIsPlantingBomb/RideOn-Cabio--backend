const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.captainRegister = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        if (!fullname || !fullname.firstname || !fullname.lastname) {
            return res.status(400).json({ message: "Invalid fullname structure" });
        }

        if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
            return res.status(400).json({ message: "Invalid vehicle structure" });
        }

        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        const hashPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            password: hashPassword,
            email,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain: { id: captain._id, email: captain.email } });
    } catch (err) {
        next(err);
    }
};

module.exports.captainLogin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await captain.comparePasswords(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = captain.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({ token, captain: { id: captain._id, email: captain.email } });
    } catch (err) {
        next(err);
    }
};

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        await blacklistTokenModel.create({ token });
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successfully" });
};

