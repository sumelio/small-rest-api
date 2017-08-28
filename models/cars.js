/**
 * Required modules.
 */
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


/**
 * Car schema
 */
const carSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true // It sets automatically the fields: createdAt and updatedAt for each user document.
});


/**
 * The schema is useless so far, then I create a model to use it.
 * Mongoose will create a collection named cars (plural) for the first specified parameter.
 */
const cars = mongoose.model("car", carSchema);


/**
 * Making this module available for the Node App.
 */
module.exports = cars;
