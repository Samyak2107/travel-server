"use strict";

var express = require("express");

var mongoose = require("mongoose");

require("dotenv").config();

var User = require("./models/user");

var cors = require("cors");

var app = express();
app.use(express.json());
app.use(cors());
var port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", function () {
  console.log("Connection established with Mongo DB");
});
app.get("/", function (req, res) {
  res.send("Hello Samyak P");
});

var userRoutes = require("./routes/users");

app.use("/users", userRoutes);
app.post("/test-login", function _callee(req, res, next) {
  var _req$body, email, password, user, isMatch;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            error: "User with that email does not exist"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(user.comparePassword(password));

        case 9:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            error: "Invalid email or password"
          }));

        case 14:
          res.send({
            message: "User logged in successfully",
            user: user
          });

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(400).send("Somethig went wrong"));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
});
app.listen(port, function () {
  console.log("Server started on port ".concat(port));
});