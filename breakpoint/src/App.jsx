import { Routes, Route } from "react-router-dom";
import Home from "./pages//Home";
import Settings from "./pages/Settings";
import SearchResults from "./pages/SearchResults";
import NewWiki from "./pages/NewWiki";
import WikiEditor from "./pages/WikiEditor/WikiEditor";
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Toolbar,
} from "@mui/material";

import Navbar from "./components/Navbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#B12C2CFF",
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
        <Toolbar /> {/* This creates space below the fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/newWiki" element={<NewWiki />} />
          <Route path="/wiki/:id/edit" element={<WikiEditor />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
