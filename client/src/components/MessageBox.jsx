import React from "react";

function MessageBox({user,message,timestamp}) {
  return (
    <div className="msgcontainer">
      <p className="msgername" >{user}</p>
      <p className="msg" >
        {message}
      </p>
      <p className="timestamp">{timestamp}</p>
    </div>
  );
}

export default MessageBox;
