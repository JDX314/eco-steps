const express = require("express");
const { UserController } = require("../../controllers");
const validators = require("../../validators")
const verifyToken = require("../../utils/verifyToken")
const router = express.Router();

router.post("/user/register", validators.register, UserController.register);
router.post("/user/login", validators.login, UserController.login);
router.post("/user/forgot-password", validators.forgotPassword, UserController.forgotPassword);
router.post("/user/reset-password", validators.resetPassword, UserController.resetPassword);

router.get("/user/profile", verifyToken, UserController.profile);
router.patch("/user/profile", verifyToken, validators.updateProfile, UserController.updateProfile);

router.post("/user/eco-challenge", verifyToken, validators.createEcoChallenge, UserController.createEcoChallenge);
router.get("/user/eco-challenge", verifyToken, UserController.getEcoChallenge);

router.post("/user/green-points", verifyToken, validators.createGreenPoints, UserController.createGreenPoints);
router.get("/user/green-points", verifyToken, UserController.getLatestGreenPoints);
router.get("/user/green-points/history", verifyToken, UserController.getGreenPoints);

router.post("/user/carbon-footprint", verifyToken, validators.createCarbonFootprint, UserController.createCarbonFootprint);
router.get("/user/carbon-footprint", verifyToken, UserController.getCarbonFootprint)

router.post("/user/green-events", verifyToken, validators.createGreenEvents, UserController.createGreenEvents)
router.get("/user/green-events", verifyToken, UserController.getGreenEvents)

router.get("/user/leader-board", verifyToken, UserController.getLeaderBoard)
module.exports = router;
