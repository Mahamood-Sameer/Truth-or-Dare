import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// useContext
import { createContext, useState } from "react";
export const UserContext = createContext();

function App() {
  // User
  const [user,setUser] = useState(null);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <UserContext.Provider value={[user,setUser]}>
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
