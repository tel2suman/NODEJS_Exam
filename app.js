
require("dotenv").config();

const express = require("express");

const path = require("path");

const app = express();

const cors = require("cors");

const morgan = require("morgan");

const helmet = require("helmet");

const flash = require("connect-flash");

//database connection
const DatabaseConnection = require("./app/config/dbconn");

DatabaseConnection();

app.use(cors());

app.use(morgan("dev"));

app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  }),
);

//define json
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static(path.join(__dirname, "public")));
app.use("uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("uploads"));

// ejs template engine
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(flash());

//defining routes
app.use(require("./app/routes/index"))

const port = 5500;

app.listen(port, () => {
  console.log("server is running on port", port);
});