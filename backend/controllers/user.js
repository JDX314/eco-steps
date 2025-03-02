const { userService } = require("../services/index");
const errorCodes = require("../constants/errorCodes.js");
const errorMessages = require("../constants/errorMsgs.js");
const { response } = require("../utils/index");
class UserController {
    async register(req, res) {
        try {
            const result = await userService.registerService(req.body);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async login(req, res) {
        try {
            const result = await userService.loginService(req.body);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async forgotPassword(req, res) {
        try {
            const result = await userService.forgotPassword(req.body);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async resetPassword(req, res) {
        try {
            const result = await userService.resetPassword(req.body);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async profile(req, res) {
        try {
            const { token, ...userData } = req.user;
            response.success(req, res, errorCodes.HTTP_OK, userData, errorMessages.userProfile);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async updateProfile(req, res) {
        try {
            const result = await userService.updateProfile({ id: req.user.id, ...req.body});
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }

    async createEcoChallenge(req, res) {
        try {
            const result = await userService.createEcoChallenge({ user_id: req.user.id, ...req.body });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getEcoChallenge(req, res) {
        try {
            const result = await userService.getEcoChallenge(req.user.id);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async createGreenPoints(req, res) {
        try {
            const result = await userService.createGreenPoints({ user_id: req.user.id, ...req.body });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getLatestGreenPoints(req, res) {
        try {
            const result = await userService.getLatestGreenPoints(req.user.id);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getGreenPoints(req, res) {
        try {
            const result = await userService.getGreenPoints(req.user.id);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }

    async createCarbonFootprint(req, res) {
        try {
            const result = await userService.createCarbonFootprint({ user_id: req.user.id, ...req.body });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getCarbonFootprint(req, res) {
        try {
            const result = await userService.getCarbonFootprint(req.user.id);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }

    async createGreenEvents(req, res) {
        try {
            const result = await userService.createGreenEvents({ user_id: req.user.id, ...req.body });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getGreenEvents(req, res) {
        try {
            const result = await userService.getGreenEvents(req.user.id);
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getLeaderBoard(req, res) {
        try {
            const result = await userService.getLeaderBoard();
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
}
module.exports = new UserController();
