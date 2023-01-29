import Box from "@mui/material/Box";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";

export const list = (open, setopen, participents) => {
  return (
    <Box
      role="presentation"
      onClick={() => {
        setopen(false);
      }}
      onKeyDown={() => {
        setopen(false);
      }}
    >
      <List>
        <ListItemButton>
          <ListItemText primary="Group Participents" />
        </ListItemButton>
      </List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton>
          <PersonIcon className="personicon" />{" "}
          {
            participents?.length > 0 ?
            <div className="adminblock" >
              <ListItemText primary={participents[participents?.length -1].username} />
              <p> - Admin</p>
            </div>
            :
            <></>
          }
        </ListItemButton>
      </ListItem>
      <List>
        {participents?.map((text, index) => {
          if (index === participents.length - 1) {
            return <></>;
          } else {
            return (
              <ListItem key={text.username} disablePadding>
                <ListItemButton>
                  <PersonIcon className="personicon" />{" "}
                  <ListItemText primary={text.username} />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
    </Box>
  );
};
