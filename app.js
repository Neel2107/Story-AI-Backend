// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require("cors");
// const userModel = require("./models/users");

// const app = express();
// app.use(cors());
// app.use(express.json());


// mongoose.connect("mongodb://127.0.0.1:27017/test");

// app.get("/getUsers", (req, res) => {
//   userModel
//     .find()
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.listen(3001, () => {
//   console.log("mongo connected");
// });

// app.post("/createUser", (req, res) => {
//   userModel.create(req.body)
//   .then(users => res.json(users))
//   .catch(err => res.json(err))
// });
