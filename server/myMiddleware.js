// load and initialize session stuff
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

module.exports = function (app) {
  // install session middleware
  // app.use(
  //   session({
  //     secret: "secret",
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       secure: false,
  //       maxAge: 100 * 60 * 60 * 24,
  //     },
  //   })
  // );
};
