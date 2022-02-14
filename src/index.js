const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const env = require("dotenv");
const { initializeDatabase } = require("./Database");
const morgan = require("morgan");

env.config();

const { PORT, APP_PORT, CORS } = process.env;

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(morgan("short"));
app.use(routes);


app.listen(process.env.PORT || '3333');

initializeDatabase();

module.exports = app;
