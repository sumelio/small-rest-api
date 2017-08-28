/**
 * Required modules.
 */
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


/**
 * User schema
 */
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    cars: [{
        type: Schema.Types.ObjectId,
        ref: "car"
    }]
}, {
    timestamps: true // It sets automatically the fields: createdAt and updatedAt for each user document.
});


/**
 * The schema is useless so far, then I create a model to use it.
 * Mongoose will create a collection named users (plural) for the first specified parameter.
 */
const users = mongoose.model("user", userSchema);


/**
 * Making this module available for the Node App.
 */
module.exports = users;
