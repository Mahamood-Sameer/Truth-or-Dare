import React, { useState, useContext } from "react";
// Css
import "./Header.css";
import logo from "../Images/Logo.png";
// popup boxes
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
// Date formatter
import now from "../utils/Date";
// Avatar
import Avatar from "@mui/material/Avatar";
import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";
// User
import { UserContext } from "../App";
import { SignUp } from "../api/signup";
import { SignIn } from "../api/signin";

// SnackBar
import { Alert } from "../utils/Alert";
import Snackbar from "@mui/material/Snackbar";

// Tooltip
import Tooltip from "@mui/material/Tooltip";

// Decode user
import { userDecode } from "../utils/userDecode";

// Redirect for react-router-dom
import { useNavigate } from "react-router-dom";

function Header() {
  // Opening the boxes
  const [open, setOpen] = useState(false);
  const handleOpenDialougeBox = () => setOpen(true);
  const handleCloseDialougeBox = () => setOpen(false);
  // Opening the snackbar
  const [opensnackbar, setOpensnackbar] = useState(false);
  const handleOpensnackbar = () => setOpensnackbar(true);
  const handleClosesnackbar = () => setOpensnackbar(false);
  //Sign In or Sign Up
  const [siginorsignup, setsiginorsignup] = useState("");
  // User is present or not
  const user = useContext(UserContext);
  // Avatar Generator
  const avatar = getRandomAvatar(5);
  const inlineAvatar = `data:image/svg+xml;base64,${btoa(avatar)}`;
  // User Inputs SignUp
  const [usersignup, setusersignup] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  // User Inputs SignIn
  const [usersignIn, setusersignin] = useState({
    email: "",
    password: "",
  });
  // User-Status
  const [userstatus, setUserStatus] = useState(null);
  
  // Navigation
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <img src={logo} alt="logo" className="logo_header" />
        <div className="header_right">
          <p>• {now}</p>
          {user[0] ? (
            <>
              <div className="userdetails">
                <p className="userdetailboxes">My Groups</p>
                <p
                  className="userdetailboxes"
                  onClick={() => {
                    console.log("Hello");
                    return navigate("/creategroup");
                  }}
                >
                  Create Groups
                </p>
                <p
                  className="userdetailboxes"
                  onClick={() => {
                    localStorage.clear();
                    user[1](null);
                    setUserStatus({
                      user: null,
                      status: "success",
                      message: "Logged out successfully",
                    });
                    handleOpensnackbar();
                    return navigate('/');
                  }}
                >
                  Logout
                </p>
                <Tooltip title={user[0]?.username}>
                  <Avatar
                    className="profilepic"
                    alt="profile_pic"
                    src={inlineAvatar}
                  />
                </Tooltip>
              </div>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setsiginorsignup("signin");
                  handleOpenDialougeBox();
                }}
                className="btns"
              >
                SignIn
              </Button>
              <Button
                onClick={() => {
                  setsiginorsignup("signup");
                  handleOpenDialougeBox();
                }}
                className="btns"
              >
                SignUp
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ---------------- Dialouge Boxes ----------------- */}
      <Modal
        open={open}
        onClose={handleCloseDialougeBox}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="popup_box">
          {siginorsignup === "signup" ? (
            <form
              className="formforcredentials"
              onSubmit={(event) => {
                handleCloseDialougeBox();
                SignUp(usersignup, event).then((response) => {
                  setUserStatus(response);
                  handleOpensnackbar();
                  user[1](userDecode(response.user));
                });
              }}
            >
              <Typography id="modal-modal-title" variant="h5" component="h1">
                Sign Up
              </Typography>
              <br />
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                className="input_boxes"
                required
                value={usersignup.username}
                onChange={(e) => {
                  setusersignup({ ...usersignup, username: e.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="input_boxes"
                required
                type={"email"}
                value={usersignup.email}
                onChange={(e) => {
                  setusersignup({ ...usersignup, email: e.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="input_boxes"
                required
                type={"password"}
                value={usersignup.password}
                onChange={(e) => {
                  setusersignup({ ...usersignup, password: e.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                className="input_boxes"
                required
                type={"password"}
                value={usersignup.confirmpassword}
                onChange={(e) => {
                  setusersignup({
                    ...usersignup,
                    confirmpassword: e.target.value,
                  });
                }}
              />
              <br />
              <div className="btns_container">
                <Button className="btns" type="submit">
                  SignUp
                </Button>
                <Button className="btns" onClick={handleCloseDialougeBox}>
                  Close
                </Button>
              </div>
            </form>
          ) : (
            <form
              className="formforcredentials"
              onSubmit={(event) => {
                handleCloseDialougeBox();
                SignIn(usersignIn, event).then((response) => {
                  setUserStatus(response);
                  handleOpensnackbar();
                  user[1](userDecode(response.user));
                });
              }}
            >
              <Typography id="modal-modal-title" variant="h5" component="h1">
                Sign In
              </Typography>
              <br />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="input_boxes"
                required
                value={usersignIn.email}
                onChange={(e) => {
                  setusersignin({ ...usersignIn, email: e.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="input_boxes"
                required
                type="password"
                value={usersignIn.password}
                onChange={(e) => {
                  setusersignin({ ...usersignIn, password: e.target.value });
                }}
              />
              <br />
              <div className="btns_container">
                <Button className="btns" type="submit">
                  SignIn
                </Button>
                <Button className="btns" onClick={handleCloseDialougeBox}>
                  Close
                </Button>
              </div>
            </form>
          )}
        </Box>
      </Modal>

      {/* -------------------SnackBar------------------ */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={opensnackbar}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity={userstatus?.status}
          sx={{ width: "100%" }}
        >
          {userstatus?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Header;
