const BaseJoi = require("joi");
const response = require("../utils/response");
const schemas = {
    register: BaseJoi.object({
        first_name: BaseJoi.string().required(),
        last_name: BaseJoi.string().required(),
        email: BaseJoi.string().required(),
        password: BaseJoi.string().required(),
        city: BaseJoi.string().required(),
    }),
    login: BaseJoi.object({
        email: BaseJoi.string().required(),
        password: BaseJoi.string().required(),
    }),
    forgotPassword: BaseJoi.object({
        email: BaseJoi.string().required(),
    }),
    resetPassword: BaseJoi.object({
        email: BaseJoi.string().required(),
        otp: BaseJoi.string().required(),
        password: BaseJoi.string().required(),
    }),
    updateProfile: BaseJoi.object({
        first_name: BaseJoi.string().required(),
        last_name: BaseJoi.string().required(),
        city: BaseJoi.string().required(),
    }),
    createEcoChallenge: BaseJoi.object({
        transportation: BaseJoi.boolean().required(),
        energy_consuption: BaseJoi.boolean().required(),
        diet: BaseJoi.boolean().required(),
        household_size: BaseJoi.boolean().required(),
        waste_generated: BaseJoi.boolean().required(),
    }),
    createGreenPoints: BaseJoi.object({
        reward_points: BaseJoi.number().required(),
    }),
    createCarbonFootprint: BaseJoi.object({
        transportation: BaseJoi.number().required(),
        energy_consuption: BaseJoi.number().required(),
        diet: BaseJoi.string().required(),
        household_size: BaseJoi.number().required(),
        waste_generated: BaseJoi.number().required(),
        carbon_emission: BaseJoi.number().required(),
        carbon_footprint_score: BaseJoi.string().required(),
        category: BaseJoi.string().valid('transport', 'electricity', 'food').required(),
        comments: BaseJoi.string().optional(null)
    }),
    createGreenEvents: BaseJoi.object({
        city: BaseJoi.string().required(),
        event_name: BaseJoi.string().required(),
        event_details: BaseJoi.string().required(),
    }),
};
const register = async (req, res, next) => {
    const { register } = schemas;
    const { basic } = options;
    try {
        await register.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const login = async (req, res, next) => {
    const { login } = schemas;
    const { basic } = options;
    try {
        await login.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const forgotPassword = async (req, res, next) => {
    const { forgotPassword } = schemas;
    const { basic } = options;
    try {
        await forgotPassword.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const resetPassword = async (req, res, next) => {
    const { resetPassword } = schemas;
    const { basic } = options;
    try {
        await resetPassword.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const updateProfile = async (req, res, next) => {
    const { updateProfile } = schemas;
    const { basic } = options;
    try {
        await updateProfile.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const createEcoChallenge = async (req, res, next) => {
    const { createEcoChallenge } = schemas;
    const { basic } = options;
    try {
        await createEcoChallenge.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const createGreenPoints = async (req, res, next) => {
    const { createGreenPoints } = schemas;
    const { basic } = options;
    try {
        await createGreenPoints.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const createCarbonFootprint = async (req, res, next) => {
    const { createCarbonFootprint } = schemas;
    const { basic } = options;
    try {
        console.log(req.body)
        await createCarbonFootprint.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const createGreenEvents = async (req, res, next) => {
    const { createGreenEvents } = schemas;
    const { basic } = options;
    try {
        console.log(req.body)
        await createGreenEvents.validateAsync({ ...req.body }, basic);
        next();
    } catch (err) {
        throwError(req, res, err);
    }
};
const throwError = (req, res, err) => {
    return response.joierrors(req, res, err);
};
const options = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true,
        },
    },
};
module.exports = { 
    register, 
    login,
    forgotPassword,
    resetPassword, 
    updateProfile,
    createEcoChallenge,
    createGreenPoints,
    createCarbonFootprint,
    createGreenEvents
}