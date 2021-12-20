"use strict";

var Subscriber = require("../models/subscriber");

var handleSubscriber = function handleSubscriber(req, res, next) {
  var email, subscriber, newSubscriber;
  return regeneratorRuntime.async(function handleSubscriber$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;

          if (email) {
            _context.next = 5;
            break;
          }

          res.status(400).json({
            message: "Please provide all fields"
          });
          _context.next = 15;
          break;

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(Subscriber.findOne({
            email: email
          }));

        case 8:
          subscriber = _context.sent;

          if (subscriber) {
            res.status(400).json({
              message: "User already subscribed!"
            });
          } else {
            newSubscriber = new Subscriber({
              email: email
            });
            newSubscriber.save().then(function (subscriber) {
              res.status(201).json({
                error: false,
                data: subscriber,
                message: "Subscriber created"
              });
            })["catch"](function (err) {
              res.status(500).json({
                message: err.message
              });
            });
          }

          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          res.status(500).json({
            message: _context.t0.message
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

module.exports = {
  handleSubscriber: handleSubscriber
};