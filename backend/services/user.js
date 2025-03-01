const models = require("../models");
const statusCodes = require("../constants/errorCodes")
const statusMessages = require("../constants/errorMsgs")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("../utils");
const mailer = require("../utils/mailer");

class UserService {
    async registerService(params) {
        try {
            const data = await models.users.create(params);
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async loginService(params) {
        try {
            const { email, password } = params;
            let userData = await models.users.findOne({ 
                where: { email },
                attributes: [...models.users.selectedFields, "password"],
            });
            userData = userData?.get({ plain: true });
            if (!userData || !userData?.status)
                return { code: statusCodes.HTTP_BAD_REQUEST, message: statusMessages.invalidCredentials };
            const isPassowordCorrect = await bcrypt.compare(password, userData.password);
            if (!isPassowordCorrect)
                return { code: statusCodes.HTTP_BAD_REQUEST, message: statusMessages.invalidCredentials };
            const tokenData = {
                id: userData.id,
                email: userData.email,
            };
            const token = jwt.sign({ ...tokenData }, process.env.JWT_SECRET);
            return {
                code: statusCodes.HTTP_OK,
                message: statusMessages.loggedIn,
                data: { token },
            };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async forgotPassword(params) {
        try {
            const { email } = params;
            let userData = await models.users.findOne({ where: { email } });
            if (!userData)
                return { code: statusCodes.HTTP_BAD_REQUEST, message: statusMessages.invalidEmail };
            const otp = utils.generateCode(4);
            await models.users.update({ otp }, { where: { email } });
            await mailer.forgetPassword({emailId: email, otp});
            return { code: statusCodes.HTTP_OK, message: statusMessages.resetLinkSent };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async resetPassword(params) {
        try {
            const { email, otp, password } = params;
            let userData = await models.users.findOne({ where: { email, otp } });
            if (!userData)
                return { code: statusCodes.HTTP_BAD_REQUEST, message: statusMessages.invalidOtp };
            await models.users.update({ password, otp: null }, { where: { email } });
            return { code: statusCodes.HTTP_OK, message: statusMessages.passwordReset };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async updateProfile(params) {
        try {
            const { id, ...rest } = params;
            await models.users.update(rest, { where: { id } });
            return { code: statusCodes.HTTP_OK, message: statusMessages.profileUpdated };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createEcoChallenge(params) {
        try {
            const data = await models.ecochallenges.create(params);
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getEcoChallenge(userId) {
        try {
            const data = await models.ecochallenges.findAll({ where: { user_id: userId } });
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createGreenPoints(params) {
        try {
            const data = await models.greenpoints.create(params);
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getGreenPoints(userId) {
        try {
            const data = await models.ecochallenges.findAll({ 
                where: { user_id: userId }, 
                order: [['created_at', 'DESC']], 
            });
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getLatestGreenPoints(userId) {
        try {
            const data = await models.ecochallenges.findOne({
                where: { user_id: userId },
                order: [['created_at', 'DESC']],
            });
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createCarbonFootprint(params) {
        try {
            const data = await models.carbonfootprint.create(params);
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            console.log(err)
            throw new Error(err.message);
        }
    }
    async getCarbonFootprint(userId) {
        try {
            const data = await models.carbonfootprint.findAll({ 
                where: { user_id: userId },
                order: [[models.sequelize.literal('created_at'), 'DESC']]
            });
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createGreenEvents(params) {
        try {
            const data = await models.greenevents.create(params);
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getGreenEvents(userId) {
        try {
            const data = await models.greenevents.findAll({ where: { user_id: userId } });
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getLeaderBoard() {
        try {
            const data = await models.carbonfootprint.findAll({
                attributes: [
                    'user_id',
                    [
                        models.sequelize.fn(
                            'MIN', 
                            models.sequelize.col('carbon_emission')
                        ), 
                        'min_score'
                    ]
                ],
                include: [
                    {
                        model: models.users,
                        as: 'users',
                        attributes: models.users.selectedFields,
                        required: true
                    }
                ],
                group: [
                    'user_id', 
                    ...models.users.selectedFields.map(field => `users.${field}`)
                ],
                order: [[models.sequelize.literal('min_score'), 'ASC']]
            });
            return { code: statusCodes.HTTP_OK, message: statusMessages.success, data };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = new UserService();
