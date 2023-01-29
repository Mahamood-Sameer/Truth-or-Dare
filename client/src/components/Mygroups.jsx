import React, { useEffect, useState } from "react";
import { getgroups } from "../api/getgroups";
import "./Mygroups.css";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button, TextField, Tooltip } from "@mui/material";

// For Participents
import Drawer from "@mui/material/Drawer";
import { list } from "../utils/participentslist";
import MessageBox from "./MessageBox";
import { sendmessage } from "../api/sendmessage";
import { getmessages } from "../api/getmessages";
import { userDecode } from "../utils/userDecode";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getgroup } from "../api/getgroup";
import { connectsocket } from "../api/connectsocket";

function Mygroups() {
  const navigate = useNavigate();
  // For getting user groups and data of eacg group
  const [usergrps, setusergrps] = useState(null);
  const [group, setgroup] = useState(null);

  // Message value
  const [message, setmessage] = useState(null);

  // Messages
  const [messages, setmessages] = useState(null);
  // Drawer status
  const [open, setopen] = useState(false);

  // socket
  const [socket, setsocket] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("UserDetails");
    var user = userDecode(JSON.parse(token).user);
    connectsocket().then((skt) => {
      setsocket(skt);
      skt.emit("joined", { user, id });
    });
    getgroups()
      .then((response) => {
        setusergrps(response);
      })
      .catch((err) => {});
    getgroup(id).then(async (res) => {
      setgroup(res);
      setmessages(res.messages);
    });
  }, [id]);
  
  return (
    <>
      <div className="mygroups">
        {usergrps?.length > 0 ? (
          <div className="groupcontainer">
            <div className="groupcontainer_left">
              <p className="mygroupsheader">My Groups</p>
              {usergrps?.map((grp, key) => {
                return (
                  <a
                    className="grpnamebox"
                    key={key}
                    href={`/mygroups/${grp.docid}`}
                  >
                    {grp.groupname}
                  </a>
                );
              })}
            </div>
            <div className="groupcontainer_right">
              <div className="groupcontainer_right_header">
                <p>{group?.groupname}</p>
                <Tooltip title="Participents">
                  <GroupsIcon
                    className="participents_icon"
                    onClick={() => {
                      setopen(true);
                    }}
                  />
                </Tooltip>
              </div>
              <div className="groupcontainer_right_messages">
                {messages?.map((msg) => {
                  return (
                    <MessageBox
                      user={msg.user.username}
                      message={msg.message}
                      timestamp={msg.timestamp}
                    />
                  );
                })}
              </div>
              <form
                className="msgform"
                onSubmit={(e) => {
                  sendmessage(e, message, group, messages).then((res) => {
                    socket?.emit("messaged",{res,id});
                    socket?.on('messaged',({res})=>{
                      console.log("The socket emit : ",res);
                      setmessages(res);
                    })
                    setmessage("");
                  });
                }}
              >
                <TextField
                  className="msginputbox"
                  label="Enter the message"
                  value={message}
                  onChange={(e) => {
                    setmessage(e.target.value);
                  }}
                />
                <Button>Send</Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="nogroups">
            <h1>You aren't part of any group</h1>
            <br />
            <h3>Create a group with your friends to start the conversation</h3>
          </div>
        )}
      </div>

      {/* ---------------Drawer-------------- */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setopen(false);
        }}
      >
        {list(open, setopen, group?.users)}
      </Drawer>
    </>
  );
}

export default Mygroups;
