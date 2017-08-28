/**
 * Required modules.
 */
const router         = require("express-promise-router")(); // Unlike the default router, this module contains the try catch mechanism without the need of defining it explicitly in the controller all the time.
const carsController = require("../controllers/cars");
const {
    validateParam,
    validateBody,
    schemas
} = require("../helpers/routeHelpers");


/**
 * Working with multiple cars.
 */
router.route("/")
    .get(carsController.getCars)
    .post(validateBody(schemas.carSchema), carsController.addCar)
;


/**
 * Working with a single user.
 */
router.route("/:carId")
    .get(validateParam(schemas.mongoIdSchema, "carId"), carsController.getCar)

    // Idempotent method used to replace an entire document, all its parameters are required!
    .put([
        validateParam(schemas.mongoIdSchema, "carId"),
        validateBody(schemas.putCarSchema)
    ], carsController.replaceCar)

    // Method used to update one or a mix of parameters belonging to a document.
    .patch([
        validateParam(schemas.mongoIdSchema, "carId"),
        validateBody(schemas.patchCarSchema)
    ], carsController.updateCar)

    .delete(validateParam(schemas.mongoIdSchema, "carId"), carsController.deleteCar)
;

module.exports = router;
