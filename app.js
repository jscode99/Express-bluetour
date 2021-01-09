var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
var logger = require("morgan");
var mongoose = require("mongoose");
var { MONGOURI } = require("./key");
var passport = require("passport");
var hbs = require("express-handlebars");
var fileUpload = require("express-fileupload");

// Router
var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var googleRouter = require("./routes/google");
var adminAuthRouter = require("./routes/admin/auth");
var userAuthRouter = require("./routes/auth");
var homeRouter = require("./routes/home");
var registerRouter = require("./routes/register");
var signupRouter = require("./routes/signup");
var userRouter = require('./routes/user');

var app = express();

//Mongo connection
//======== DATABASE CONNECTION ============
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then(
    () => {
      console.log("====== Connected to database sucessfully======");
    },
    err => {
      /** handle initial connection error */
      console.log(err);
    },
  );
//==========================================

//////////// view engine setup ////////////////////////////
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "/views/layout/"),
    partialsDir: path.join(__dirname, "views/partials/"),
  }),
);
///////////////////////////////////////////////////////////

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  }),
);
///////////////////////////////////////////////////////////
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
//////////////////////////////////////////////////////////

app.use("/", indexRouter);
app.use("/", adminRouter);
app.use("/", registerRouter);
app.use("/", signupRouter);
app.use("/", googleRouter);
app.use("/", adminAuthRouter);
app.use("/", userAuthRouter);
app.use("/", homeRouter);
app.use("/", userRouter);
//////////////////////////////////////////////////////////

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
////////////////////////////////////////

/////////////////////// error handler //////////////////////////////////////
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
////////////////////////////////////////////////////////////////////////////

module.exports = app;
