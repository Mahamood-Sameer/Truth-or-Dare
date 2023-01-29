import React, { useEffect, useState } from "react";
import "./CreateGroup.css";

// Form Inputs and Autocomplete
import { Button, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { Root, Label, StyledTag, Listbox, InputWrapper } from "../utils/Styles";
import { GetAllusers } from "../api/getAllusers";
import { creategroup } from "../api/creategroup";
// Redirect for react-router-dom
import { useNavigate } from "react-router-dom";

// SnackBar
import { Alert } from "../utils/Alert";
import Snackbar from "@mui/material/Snackbar";
import { userDecode } from "../utils/userDecode";

function CreateGroup() {
  // Opening the snackbar
  const [opensnackbar, setOpensnackbar] = useState(false);
  const handleOpensnackbar = () => setOpensnackbar(true);
  const handleClosesnackbar = () => setOpensnackbar(false);

  //   group status
  const [groupstatus, setgroupstatus] = useState(null);

  // Groups List
  const [usereslist, setuserslist] = useState([]);
  const [groupname, setgroupname] = useState(null);
  const [groupdescription, setgroupdescription] = useState(null);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: usereslist,
    getOptionLabel: (option) => option?.username,
  });

  //   Get Alluser
  useEffect(() => {
    GetAllusers()
      .then((data) => {
        setuserslist(data);
      })
      .catch((err) => {});
  }, []);

  // Navigation
  const navigate = useNavigate();

  // Admin
  var admin = localStorage.getItem("UserDetails");
  admin = JSON.parse(admin);
  admin = userDecode(admin.user);
  console.log("The user is:", admin);
  return (
    <div className="creategroup">
      <h2>Create Group</h2>
      <div className="groupform">
        <TextField
          onChange={(e) => {
            setgroupname(e.target.value);
          }}
          id="outlined-basic"
          label="Group Name"
          variant="outlined"
          value={groupname}
          required
        />
        {usereslist ? (
          <Root>
            <div {...getRootProps()}>
              <Label {...getInputLabelProps()}>Add Users</Label>
              <InputWrapper
                ref={setAnchorEl}
                className={focused ? "focused" : ""}
              >
                {value.map((option, index) => (
                  <StyledTag
                    label={option.username}
                    {...getTagProps({ index })}
                  />
                ))}

                <input {...getInputProps()} required />
              </InputWrapper>
            </div>
            {groupedOptions?.length > 0 ? (
              <Listbox {...getListboxProps()}>
                {groupedOptions?.map((option, index) => {
                  if (option.username === admin.username) {
                    return <></>;
                  } else {
                    return (
                      <li {...getOptionProps({ option, index })}>
                        <span>{option.username}</span>
                        <CheckIcon fontSize="small" />
                      </li>
                    );
                  }
                })}
              </Listbox>
            ) : null}
          </Root>
        ) : (
          <></>
        )}
        <TextField
          onChange={(e) => {
            setgroupdescription(e.target.value);
          }}
          value={groupdescription}
          id="outlined-basic"
          label="Group Description"
          variant="outlined"
          required
        />
        <Button
          onClick={() => {
            creategroup(groupname, groupdescription, value).then((group) => {
              setgroupstatus(group);
              handleOpensnackbar();
              if (group.status === "success") {
                return navigate("/mygroups");
              }
            });
          }}
        >
          Create Group
        </Button>
      </div>

      {/* -------------------SnackBar------------------ */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={opensnackbar}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity={groupstatus?.status}
          sx={{ width: "100%" }}
        >
          {groupstatus?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateGroup;
