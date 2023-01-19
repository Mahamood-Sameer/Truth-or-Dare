const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String
    },
    groups:{
      type:Array
    }
  }
);

const SignUpUsermodel = mongoose.model("User",User);

module.exports = SignUpUsermodel
