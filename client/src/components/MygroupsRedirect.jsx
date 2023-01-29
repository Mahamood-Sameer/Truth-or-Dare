import React, { useEffect } from "react";
import { getgroups } from "../api/getgroups";
import { useNavigate } from "react-router-dom";

function MygroupsRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    getgroups().then((data) => {
      return navigate(`/mygroups/${data[0].docid}`);
    });
  });
  return <div>redirecting ...</div>;
}

export default MygroupsRedirect;
