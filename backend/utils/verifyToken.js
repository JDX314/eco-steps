const jwt = require("jsonwebtoken");
const errorCodes = require("../constants/errorCodes");
const errorMessages = require("../constants/errorMsgs");
const response = require("./response");
const models = require("../models")
const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["token"];
    if (token) {
        token = token.replace("Bearer ", "");
        return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if (err) {
                response.invalid(
                    req,
                    res,
                    errorCodes.HTTP_UNAUTHORIZED,
                    errorMessages[errorCodes.HTTP_UNAUTHORIZED]
                );
            } else {
                let { id } = payload;
                if (!id) {
                    return response.invalid(
                        req,
                        res,
                        errorCodes.HTTP_UNAUTHORIZED,
                        errorMessages[errorCodes.HTTP_UNAUTHORIZED]
                    );
                }
                const userData = await models.users.findOne({
                    where: { id, status: true },
                    attributes: models.users.selectedFields,
                    raw: true,
                });
                if (!userData)
                    return response.invalid(
                        req,
                        res,
                        errorCodes.HTTP_UNAUTHORIZED,
                        errorMessages[errorCodes.HTTP_UNAUTHORIZED]
                    );
                req.user = {};
                req.user = { ...userData, token };
                next();
            }
        });
    } else {
        response.invalid(
            req,
            res,
            errorCodes.HTTP_UNAUTHORIZED,
            errorMessages[errorCodes.HTTP_UNAUTHORIZED]
        );
    }
};

module.exports = verifyToken;
