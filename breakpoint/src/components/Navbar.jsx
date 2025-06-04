import useAuth from "../hooks/useAuth";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CastleIcon from "@mui/icons-material/Castle";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSettings = () => {
    handleClose();
    navigate("/settings");
  };

  const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/logout`;
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/articles`,
        {
          params: { search: value },
          withCredentials: true,
        }
      );

      console.log("Suchergebnisse:", res.data); // Hier kannst du auch ein State für Ergebnisse verwenden
    } catch (err) {
      console.error("Fehler bei der Suche:", err);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        border: 2,
        borderRadius: 1,
        borderColor: "primary.main",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            href="/"
          >
            <CastleIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Breakpoint
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">

          <TextField
            size="small"
            placeholder="Suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
            sx={{
              width: "300px",
              backgroundColor: "background.paper",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            color="inherit"
            href="/newWiki"
            sx={{
              border: 1,
              borderColor: "primary.main",
              px: 1.5,
            }}
          >
            + Start a Wiki
          </Button>

          {!user ? (
            <Button color="inherit" href="http://localhost:3001/auth/discord">
              Login mit Discord
            </Button>
          ) : (
            <Box>
              <Avatar
                onClick={handleAvatarClick}
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                sx={{ cursor: "pointer" }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSettings}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
