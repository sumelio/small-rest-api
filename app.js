/**
 * Required modules.
 */
const express    = require("express"),
      morgan     = require("morgan"),
      mongoose   = require("mongoose"),
      bodyParser = require("body-parser"),
      helmet     = require("helmet"),
      config     = require("./config/config")
;


/**
 * Mongoose.
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url, { useMongoClient: true });

/**
 * Create the express app.
 */
const app = express();
app.use(helmet());


// Routes calling.
const cars  = require("./routes/cars");
const users = require("./routes/users");


// Middleware.
app.use(morgan("dev"));
app.use(bodyParser.json());

// CORS.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes.
app.use("/cars", cars);
app.use("/users", users);

// Catch 404 errors and forward them to the error handler.
app.use((req, res, next) => {
    const err = new Error("Not found.");
    err.status = 404;
    next(err);
});

// Error handler function.
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    // Response to client.
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Response to api.
    console.error(err);
});

/**
 * Start the server.
 *
 * Port to listen on.
 */
app.set("port", config.port);
app.listen(app.get("port"), () => console.log(`Server is listening on port ${app.get("port")}.`));
