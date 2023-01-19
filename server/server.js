const express = require("express");

const app = express();

const cors = require("cors");

// Cors policy
app.use(cors());

// Using Json in Body
app.use(express.json());

//models
const SignUpUsermodel = require("./models/user.models");
const GroupModel = require("./models/group.models");

// JWT for encoding
const jwt = require("jsonwebtoken");

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
    // Generating the token for username and email
    const token = jwt.sign(
      {
        username: userdetails.username,
        email: userdetails.email,
      },
      "sameer@22"
    );
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
    // Generating the token for username and email
    const token = jwt.sign(
      {
        username: userindb.username,
        email: userindb.email,
      },
      "sameer@22"
    );
    res.send({
      status: "success",
      user: token,
      message: "User Signed In successfully",
    });
  }
});

// Allusers
app.get("/api/allusers", async (req, res) => {
  const data = await SignUpUsermodel.find();
  var usersgroup = [];
  data?.map((user) => {
    usersgroup.push({
      username: user.username,
      email: user.email,
      docid: user._id,
    });
  });
  res.send(usersgroup);
});

// CreateGroup
app.post("/api/creategroup", async (req, res) => {
  const data = req.body.body;
  if (data.groupname === null) {
    res.send({
      status: "error",
      group: null,
      message: "Groupname is required",
    });
  } else if (data.usersingroup.length === 0) {
    res.send({
      status: "error",
      group: null,
      message: "Add atleast a single user",
    });
  } else {
    let newgroup = new GroupModel({
      groupname: data.groupname,
      description: data.description,
      admin: data.admin,
      users: data.usersingroup,
      messages: [],
    });
    newgroup.save();
    data.usersingroup.map(async (user) => {
      const userindp = await SignUpUsermodel.findById(user.docid);
      let prevgroups = userindp.groups;
      prevgroups.push({
        groupname: newgroup.groupname,
        users: newgroup.users,
        docid: newgroup._id,
      });
      console.log("The previous group is : ", prevgroups);
      console.log("The User is : ", userindp);
      await SignUpUsermodel.updateOne(
        {
          username: user.username,
        },
        {
          $set: {
            groups: prevgroups,
          },
        }
      );
    });
    res.send({
      status: "success",
      group: newgroup,
      message: "Group created succesfully",
    });
  }
});

// ---------End of Routes--------

app.listen(5000);
