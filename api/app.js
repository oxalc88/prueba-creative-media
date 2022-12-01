require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const routes = require("./src/routes/index");
const { errorHandler } = require("./src/middlewares/errorHandler");
const { getError } = require("./src/middlewares/getError");

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use("/", routes);
app.use(errorHandler);
app.use(getError);

module.exports = app;
