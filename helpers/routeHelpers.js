/**
 * Required modules.
 */
const Joi = require("joi");


module.exports = {
    // Generic method to validate a single param.
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({ param: req["params"][name] }, schema);

            if (result.error) {
                return res.status(400).json(result.error); // Response to the controller with the error found.
            } else {
                if (!req.value) {
                    req.value = {};
                }

                if (!req.value["params"]) {
                    req.value["params"] = {};
                }

                req.value["params"][name] = result.value.param;

                next(); // Allows the controller goes on after the field validation.
            }
        };
    },

    // Generic method to validate the params coming within the req.body.
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value) {
                    req.value = {};
                }

                if (!req.value["body"]) {
                    req.value["body"] = {};
                }

                req.value["body"] = result.value;

                next(); // Allows the controller goes on after the field validation.
            }
        };
    },

    // List of schemas in order to perform the validation for each request.
    schemas: {
        mongoIdSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        // May be used for POST and PUT methods.
        userSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required()
        }),

        // May be used for the PATCH method.
        userOptionalSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email()
        }),

        userCarSchema: Joi.object().keys({
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required()
        }),

        carSchema: Joi.object().keys({
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required(),
            seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        putCarSchema: Joi.object().keys({
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required()
        }),

        patchCarSchema: Joi.object().keys({
            make: Joi.string(),
            model: Joi.string(),
            year: Joi.number()
        })
    }
};
