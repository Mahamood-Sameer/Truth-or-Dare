const express = require("express");

const app = express();

const cors = require("cors");

// Cors policy
app.use(cors());

// Using Json in Body
app.use(express.json());

// SiginUp user model
const SignUpUsermodel = require("./models/user.models");

// JWT 
const jwt = require('jsonwebtoken')

// Conecting Mongoose
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sameer:sameer@cluster0.xdfvu7j.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {});

// --------Routes-------

app.get("/", (req, res) => {
  res.send("This is Home Page");
});

// signup
app.post("/api/signup", async (req, res) => {
  const userdetails = req.body.body;
  let ispres = await SignUpUsermodel.findOne({ email: userdetails.email });
  if (ispres) {
    res.send({
      status: "error",
      user: null,
      message: "User already exists",
    });
  } else if (userdetails.password !== userdetails.confirmpassword) {
    res.send({
      status: "error",
      user: null,
      message: "Password doesn't match",
    });
  } else {
    let newUser = new SignUpUsermodel({
      username: userdetails.username,
      email: userdetails.email,
      password: userdetails.password,
    });
    newUser.save();
    const token = jwt.sign({newUser});
    res.send({
      status: "success",
      user: token,
      message: "User successfully SignedUp",
    });
  }
});
// Signin
app.post("/api/signin", async (req, res) => {
  const userdetails = req.body.body;
  const userindb = await SignUpUsermodel.findOne({
    email: userdetails.email,
  });
  if (userindb === null) {
    res.send({
      status: "error",
      user: null,
      message: "User not found, Please SignUp first",
    });
  } else if (userindb.password !== userdetails.password) {
    res.send({
      status: "error",
      user: null,
      message: "Incorrect Password",
    });
  } else {
    const token = jwt.sign({user});
    console.log(token);
    res.send({
      status: "success",
      user: token,
      message: "User Signed In successfully",
    });
  }
});
// Logout
app.get("/api/logout", (req, res) => {
  res.send({
    name: "logout",
  });
});

// ---------End of Routes--------

app.listen(5000);
