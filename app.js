const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan"); // used for logging
const exphbs = require("express-handlebars"); // setting up temmplate engines
const passport = require("passport");
const session = require("express-session"); // used in order for passport session to work
const connectDB = require("./config/db");

// load config
dotenv.config({ path: "./config/config.env" });

//Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handleBars middleware
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//Express sessions middle ware
app.use(
  session({
    secret: "annu",
    resave: false,
    saveUninitialized: false, //means dont create sessions untill something is stored
    cookie: { secure: true },
  })
);

// passport middle ware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const port = process.env.PORT || 3000;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
