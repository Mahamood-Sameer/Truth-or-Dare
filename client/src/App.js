import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Mygroups from "./components/Mygroups";
import CreateGroup from "./components/CreateGroup";

//Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// useContext
import { createContext, useEffect, useState } from "react";
import { userDecode } from "./utils/userDecode";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MygroupsRedirect from "./components/MygroupsRedirect";

export const UserContext = createContext();
function App() {
  // User
  const [user, setUser] = useState(null);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  useEffect(() => {
    var userinlocalstorage = localStorage.getItem("UserDetails");
    if (userinlocalstorage !== null) {
      userinlocalstorage = JSON.parse(userinlocalstorage);
      setUser(userDecode(userinlocalstorage?.user));
    }
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, setUser]}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/creategroup" element={<CreateGroup />} />
              <Route path="/mygroups" element={  <MygroupsRedirect /> }  />
              <Route path="/mygroups/:id" element={  <Mygroups /> }  />
            </Routes>
          </div>
        </ThemeProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
