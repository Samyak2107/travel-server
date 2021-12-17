"use strict";

var mongoose = require("mongoose");

var User = require("../models/user");

var bcrypt = require("bcrypt");

var JWT = require("jsonwebtoken"); // const handleNewUser = (req, res, next) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     res.status(400).json({ message: "Please provide all fields" });
//   } else {
//     User.findOne({ email: email })
//       .then((user) => {
//         if (user) {
//           res.status(400).json({ message: "User already exists" });
//         } else {
//           bcrypt
//             .hash(password, 10)
//             .then((hash) => {
//               const newUser = new User({
//                 name: name,
//                 email: email,
//                 password: hash,
//                 userType: "customer",
//               });
//               newUser
//                 .save()
//                 .then((user) => {
//                   res.status(201).json({
//                     error: false,
//                     data: user,
//                     message: "User created",
//                   });
//                 })
//                 .catch((err) => {
//                   res.status(500).json({ message: err.message });
//                 });
//             })
//             .catch((err) => {
//               res.status(500).json({ message: err.message });
//             });
//         }
//       })
//       .catch((err) => {
//         res.status(500).json({ message: err.message });
//       });
//   }
// };


var handleNewUser = function handleNewUser(req, res, next) {
  var _req$body, name, email, password, user, hash, newUser, savedUser, acctoken, rfToken;

  return regeneratorRuntime.async(function handleNewUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

          if (!(!name || !email || !password)) {
            _context.next = 5;
            break;
          }

          res.status(400).json({
            message: "Please provide all fields"
          });
          _context.next = 32;
          break;

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 8:
          user = _context.sent;

          if (!user) {
            _context.next = 13;
            break;
          }

          res.status(400).json({
            message: "User already exists"
          });
          _context.next = 27;
          break;

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 15:
          hash = _context.sent;
          newUser = new User({
            name: name,
            email: email,
            password: hash,
            userType: "customer"
          });
          _context.next = 19;
          return regeneratorRuntime.awrap(newUser.save());

        case 19:
          savedUser = _context.sent;
          _context.next = 22;
          return regeneratorRuntime.awrap(JWT.sign({
            _id: savedUser._id,
            email: savedUser.email,
            name: savedUser.name
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30s"
          }));

        case 22:
          acctoken = _context.sent;
          _context.next = 25;
          return regeneratorRuntime.awrap(JWT.sign({
            _id: savedUser._id,
            email: savedUser.email,
            name: savedUser.name
          }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d"
          }));

        case 25:
          rfToken = _context.sent;
          res.status(201).json({
            error: false,
            data: savedUser,
            message: "User created",
            acctoken: acctoken,
            rftoken: rfToken
          });

        case 27:
          _context.next = 32;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](5);
          res.status(500).json({
            message: _context.t0.message
          });

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 29]]);
}; // const handleLogin = (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400).json({ message: "Please provide all fields" });
//   } else {
//     User.findOne({ email: email })
//       .then((user) => {
//         if (!user) {
//           res.status(400).json({ message: "User does not exist" });
//         } else {
//           bcrypt
//             .compare(password, user.password)
//             .then((result) => {
//               if (result) {
//                 res
//                   .json({
//                     error: false,
//                     data: user,
//                     message: "User logged in successfully",
//                   })
//                   .status(200);
//               } else {
//                 res.status(400).json({ message: "Incorrect password" });
//               }
//             })
//             .catch((err) => {
//               res.status(500).json({ message: err.message });
//             });
//         }
//       })
//       .catch((err) => {
//         res.status(500).json({ message: err.message });
//       });
//   }
// };


var handleLogin = function handleLogin(req, res, next) {
  var _req$body2, email, password, user, result, acctoken, rftoken;

  return regeneratorRuntime.async(function handleLogin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 5;
            break;
          }

          res.status(400).json({
            message: "Please provide all fields"
          });
          _context2.next = 26;
          break;

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 12;
            break;
          }

          res.status(400).json({
            message: "User does not exist"
          });
          _context2.next = 26;
          break;

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 14:
          result = _context2.sent;

          if (!result) {
            _context2.next = 25;
            break;
          }

          _context2.next = 18;
          return regeneratorRuntime.awrap(JWT.sign({
            _id: user._id,
            email: user.email,
            name: user.name
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30s"
          }));

        case 18:
          acctoken = _context2.sent;
          _context2.next = 21;
          return regeneratorRuntime.awrap(JWT.sign({
            _id: user._id,
            email: user.email,
            name: user.name
          }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d"
          }));

        case 21:
          rftoken = _context2.sent;
          res.json({
            error: false,
            data: user,
            message: "User logged in successfully",
            acctoken: acctoken,
            rftoken: rftoken
          }).status(200);
          _context2.next = 26;
          break;

        case 25:
          res.status(400).json({
            message: "Incorrect password"
          });

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var handleRefreshToken = function handleRefreshToken(req, res, next) {
  var rftoken, decoded, user, acctoken;
  return regeneratorRuntime.async(function handleRefreshToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          rftoken = req.body.rftoken;

          if (rftoken) {
            _context3.next = 5;
            break;
          }

          res.status(400).json({
            message: "Token not found"
          });
          _context3.next = 25;
          break;

        case 5:
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(JWT.verify(rftoken, process.env.REFRESH_TOKEN_SECRET));

        case 8:
          decoded = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decoded._id
          }));

        case 11:
          user = _context3.sent;

          if (user) {
            _context3.next = 16;
            break;
          }

          res.status(400).json({
            message: "User does not exist"
          });
          _context3.next = 20;
          break;

        case 16:
          _context3.next = 18;
          return regeneratorRuntime.awrap(JWT.sign({
            _id: user._id,
            email: user.email,
            name: user.name
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30s"
          }));

        case 18:
          acctoken = _context3.sent;
          res.json({
            error: false,
            data: user,
            message: "User logged in successfully",
            acctoken: acctoken
          }).status(200);

        case 20:
          _context3.next = 25;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](5);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 22]]);
};

module.exports = {
  handleNewUser: handleNewUser,
  handleLogin: handleLogin,
  handleRefreshToken: handleRefreshToken
};