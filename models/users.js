// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     name:String,
//     email:String,
//     age:Number,

// })


// const userModel = mongoose.model("users", userSchema)

// module.exports = userModel

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const upvoteSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  }
});
