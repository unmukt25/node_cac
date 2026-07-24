const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config();
const db = require("./config/database");

const routes = require("./routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

/* Middlewares */

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


(async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ MySQL Connected");
        connection.release();
    } catch (error) {
        console.error("❌ MySQL Connection Failed");
        console.error(error.message);
    }
})();

/* Routes */
app.use("/api", routes);

/* 404 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Not Found"
    });
});

/* Health Check */
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CAC API Running"
    });
});

// Global Error Handler (must be at the end of the app.js just before exporting module)
app.use(errorHandler);

module.exports = app;