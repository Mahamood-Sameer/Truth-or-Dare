const express = require("express");

const app = express();

// Https server
const http = require("http");
const serverback = http.createServer(app);

//Socket.io
const { Server } = require("socket.io");
const io1 = new Server(serverback);

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
    var prev = data.usersingroup;
    prev.push(data.admin);
    let newgroup = new GroupModel({
      groupname: data.groupname,
      description: data.description,
      admin: data.admin,
      users: prev,
      messages: [],
    });
    newgroup.save();
    // Participents db updation
    data.usersingroup.map(async (user) => {
      const userindp = await SignUpUsermodel.findById(user.docid);
      let prevgroups = userindp.groups ? userindp : [];
      prevgroups.push({
        groupname: newgroup.groupname,
        users: newgroup.users,
        docid: newgroup._id,
      });
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

    // Admin db updation
    const admin = data.admin;
    const userindp = await SignUpUsermodel.findOne({
      username: admin.username,
    });
    let prevgroups = userindp.groups;
    prevgroups.push({
      groupname: newgroup.groupname,
      users: newgroup.users,
      docid: newgroup._id,
      admin: admin,
    });
    await SignUpUsermodel.updateOne(
      {
        username: admin.username,
      },
      {
        $set: {
          groups: prevgroups,
        },
      }
    );
    res.send({
      status: "success",
      group: newgroup,
      message: "Group created succesfully",
    });
  }
});

// Get Groups
app.get("/api/mygroups", async (req, res) => {
  const user = jwt.decode(JSON.parse(req.headers.authorization).user);
  const grps = await SignUpUsermodel.findOne({
    username: user.username,
    email: user.email,
  });
  res.send({ groups: grps.groups });
});

// Get Group
app.get("/api/group", async (req, res) => {
  const docid = req.headers.authorization;
  const group = await GroupModel.findById(docid);
  res.send({ group });
});

//getting messages
app.get("/api/getmessages", async (req, res) => {
  const id = req.headers.authorization;
  const group = await GroupModel.findById(id);
  res.send(group.messages);
});

// Sending a Message
app.post("/api/sendmessage", async (req, res) => {
  const data = req.body.body;
  if (data.message === null || data.message === " ") {
    res.send({
      status: "error",
      message: "not able to send the message",
    });
  } else {
    const group = await GroupModel.findById(data.group._id);
    var prevmsgs = group.messages;
    prevmsgs.push({
      message: data.message,
      timestamp: data.timestamp,
      user: data.user,
    });
    await GroupModel.updateOne(
      {
        _id: group._id,
      },
      {
        $set: {
          messages: prevmsgs,
        },
      }
    );
    res.send({
      status: "success",
      message: "message sent successfully",
    });
  }
});

// Socketio connections
io1.on("connection", (socket) => {
  console.log("The user has joined", socket.id);
  socket.on("joined", (Data) => {
    socket.join(Data.id)
  });
  socket.on("messaged", ({res,id}) => {
    socket.join(id);
    console.log("Messaged from socket server",res, " and the id is : ",id);
    io1.to(id).emit("messaged",{res});
  });
  socket.on("disconnect", () => {
    console.log("The user ", socket.id, " has disconnected");
  });
});

// ---------End of Routes--------

serverback.listen(5000);
