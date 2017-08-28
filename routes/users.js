/**
 * Required modules.
 */
const express         = require("express");
const router          = require("express-promise-router")(); // Unlike the default router, this module contains the try catch mechanism without the need of defining it explicitly in the controller all the time.
const usersController = require("../controllers/users");
const {
    validateParam,
    validateBody,
    schemas
} = require("../helpers/routeHelpers");


/**
 * Working with multiple users.
 */
router.route("/")
    .get(usersController.getUsers)
    .post(validateBody(schemas.userSchema), usersController.addUsers)
;


/**
 * Working with a single user.
 */
router.route("/:userId")
    .get(validateParam(schemas.mongoIdSchema, "userId"), usersController.getUser)

    // Idempotent method used to replace an entire document, all its parameters are required!
    .put([
        validateParam(schemas.mongoIdSchema, "userId"),
        validateBody(schemas.userSchema)
    ], usersController.replaceUser)

    // Method used to update one or a mix of parameters belonging to a document.
    .patch([
        validateParam(schemas.mongoIdSchema, "userId"),
        validateBody(schemas.userOptionalSchema)
    ], usersController.updateUser)

    .delete(validateParam(schemas.mongoIdSchema, "userId"), usersController.deleteUser)
;

router.route("/:userId/cars")
    .get(validateParam(schemas.mongoIdSchema, "userId"), usersController.getUserCars)

    .post([
        validateParam(schemas.mongoIdSchema, "userId"),
        validateBody(schemas.userCarSchema)
    ], usersController.addUserCar)
;

module.exports = router;
