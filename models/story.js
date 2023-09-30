const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  storyPrompt: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  id:{
    type: String
  },
  name:{
    type:String,
  }
  ,
  upvotes:{
    type:Number
  },
  // message:{
  //  type :String
  // },


});

const userPrompt = mongoose.model("inputs", userSchema)

module.exports = userPrompt;