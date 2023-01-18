import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// useContext
import { createContext, useEffect, useState } from "react";
import { userDecode } from "./utils/userDecode";
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
    <UserContext.Provider value={[user, setUser]}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          <Header />
          <Body />
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
