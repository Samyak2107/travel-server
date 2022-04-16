const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");
const cors = require("cors");

const app = express();

// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(express.json());

// const domainsFromEnv = process.env.CORS_DOMAINS || "";

// const whitelist = domainsFromEnv.split(",").map((item) => item.trim());

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
app.use(cors());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connection established with Mongo DB");
});

app.get("/", function (req, res) {
  res.send("Hello Samyak P");
});

const userRoutes = require("./routes/users");
const subsRoutes = require("./routes/subscribers");
const orderRoutes = require("./routes/orders");

app.use("/users", userRoutes);
app.use("/subscribe", subsRoutes);
app.use("/orders", orderRoutes);

app.post("/test-login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ error: "User with that email does not exist" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // res.header('auth-token', token).send(token);
    else {
      res.send({
        message: "User logged in successfully",
        user: user,
      });
    }
  } catch (err) {
    return res.status(400).send("Somethig went wrong");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
