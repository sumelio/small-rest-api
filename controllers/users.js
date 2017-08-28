/**
 * Required modules.
 */
const Users = require("../models/users");
const Cars  = require("../models/cars");


/**
 * Exports the Users Controller.
 */
module.exports = {
    /**
     * Working with multiple users.
     */
    getUsers: async (req, res, next) => {
        const users = await Users.find({}).populate("cars");

        res.status(200).json(users);
    },

    addUsers: async (req, res, next) => {
        const users = await Users.create(req.value.body);

        res.status(201).json(users);
    },

    /**
     * Working with a single user.
     */
    getUser: async (req, res, next) => {
        const { userId } = req.value.params; // Custom value created by the validator.
        const user = await Users.findById(userId);

        res.status(200).json(user);
    },

    // PUT Request
    replaceUser: async (req, res, next) => {
        // Enforce that the req.value.body must contain all the fields.
        const { userId } = req.value.params; // Custom value created by the validator.
        const newUser = req.value.body;
        const updatedUser = await Users.findByIdAndUpdate(userId, newUser);

        res.status(200).json({
            sucess: true,
            message: `The user ${userId} was successfully updated!`
        });
    },

    // PATCH Request
    updateUser: async (req, res, next) => {
        // The req.value.body may contain any number of fields.
        const { userId } = req.value.params; // Custom value created by the validator.
        const newUser = req.value.body;
        const updatedUser = await Users.findByIdAndUpdate(userId, newUser);

        res.status(200).json({
            success: true,
            message: `The user ${userId} was successfully updated!`
        });
    },

    deleteUser: async (req, res, body) => {
        const { userId } = req.value.params; // Custom value created by the validator.
        const user = await Users.findByIdAndRemove(userId);

        res.status(200).json({
            success: true,
            message: `The user ${userId} was successfully deleted!`
        });
    },

    getUserCars: async (req, res, next) => {
        const { userId } = req.value.params; // Custom value created by the validator.
        const user = await Users.findById(userId).populate("cars"); // Populate method passes the entire document for each carId.

        res.status(200).json(user.cars);
    },

    addUserCar: async (req, res, next) => {
        // Custom value created by the validator.
        const { userId } = req.value.params;

        // Create the car(s).
        const car = req.value.body;

        // Get the User.
        const user = await Users.findById(userId);

        // Assing the User as Cars Seller.
        car.seller = user;

        // Save the cars.
        const _car = await Cars.create(car);

        // Add cars to the user's selling array of cars.
        user.cars.push(_car);

        // Save the user.
        await user.save();

        res.status(201).json(_car);
    }
};
