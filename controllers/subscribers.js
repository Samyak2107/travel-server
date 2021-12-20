const Subscriber = require("../models/subscriber");

const handleSubscriber = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    try {
      const subscriber = await Subscriber.findOne({ email: email });
      if (subscriber) {
        res.status(400).json({ message: "User already subscribed!" });
      } else {
        const newSubscriber = new Subscriber({
          email: email,
        });
        newSubscriber
          .save()
          .then((subscriber) => {
            res.status(201).json({
              error: false,
              data: subscriber,
              message: "Subscriber created",
            });
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { handleSubscriber };
