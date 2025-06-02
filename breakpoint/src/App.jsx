import { Routes, Route } from "react-router-dom";
import Home from "./pages//Home";
import Settings from "./pages/Settings";
import { Box, ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#EC4040FF",
    },
    secondary: {
      main: "#fbb839",
    },
    background: {
      default: "#303030",
      paper: "#2C2C2CFF",
      paper_light: "#424242",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
