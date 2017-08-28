/**
 * Required modules.
 */
const Cars  = require("../models/cars");
const Users = require("../models/users");


/**
 * Exports the Cars Controller.
 */
module.exports = {
    /**
     * Working with multiple cars.
     */
    getCars: async (req, res, next) => {
        const cars = await Cars.find({}).populate("seller");

        res.status(200).json(cars);
    },

    addCar: async (req, res, next) => {
        // Find the current seller.
        const seller = await Users.findById(req.value.body.seller);

        // Create the new car.
        const newCar = req.value.body;
        delete newCar.seller;

        const car = newCar;
        car.seller = seller;

        const _car = await Cars.create(car);

        // Add the newly created car to the current seller.
        seller.cars.push(_car);
        await seller.save();

        res.status(201).json(_car);
    },

    /**
     * Working with a single car.
     */
    getCar: async (req, res, next) => {
        const { carId } = req.value.params; // Custom value created by the validator.
        const car = await Cars.findById(carId);

        res.status(200).json(car);
    },

    // PUT Request
    replaceCar: async (req, res, next) => {
        // Enforce that the req.value.body must contain all the fields.
        const { carId } = req.value.params; // Custom value created by the validator.
        const newCar = req.value.body;
        const updatedCar = await Cars.findByIdAndUpdate(carId, newCar);

        res.status(200).json({
            sucess: true,
            message: `The car ${carId} was successfully updated!`
        });
    },

    // PATCH Request
    updateCar: async (req, res, next) => {
        // The req.value.body may contain any number of fields.
        const { carId } = req.value.params; // Custom value created by the validator.
        const newCar = req.value.body;
        const updatedCar = await Cars.findByIdAndUpdate(carId, newCar);

        res.status(200).json({
            success: true,
            message: `The car ${carId} was successfully updated!`
        });
    },

    deleteCar: async (req, res, body) => {
        const { carId } = req.value.params; // Custom value created by the validator.

        // Get the car.
        const car = await Cars.findById(carId);

        if (!car) {
            // The return of the response avoids the execution of the code outside the if.
            // It avoids and prevents the following: Error: Can't set headers after they are sent.
            return res.status(404).json({
                success: false,
                message: `The car with id ${carId} doesn't exist!`
            });
        }

        // Get the seller.
        const sellerId = car.seller;
        const seller = await Users.findById(sellerId);

        // Remove the car.
        await car.remove();

        // Remove car from the seller's selling list.
        seller.cars.pull(car);
        await seller.save(); // The changes will be reflected once the seller is saved.

        res.status(200).json({
            success: true,
            message: `The car ${carId} was successfully deleted! It was deleted from the seller's ${sellerId} selling list as well!`
        });
    }
};
