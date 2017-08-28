/**
 * Configuration File
 *
 * Why like this?
 *
 *     - All environmental variables are documented in one place.
 *     - If I use "." notation it's easy to cut/paste into code.
 *     - Unlike JSON, javascript allows comments (which I like).
 */
var config = {};


config.port = process.env.PORT || 3000;

/**
 * Database Configuration
 */
config.mongodb     = {};
config.mongodb.url = process.env.MONGODB_URL || "mongodb://localhost/small-rest-api";


module.exports = config;
