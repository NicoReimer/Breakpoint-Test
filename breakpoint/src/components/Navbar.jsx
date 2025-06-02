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
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CastleIcon from "@mui/icons-material/Castle";

export default function Navbar() {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
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
    window.location.href = "http://localhost:3001/auth/logout";
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          href="/"
        >
          <CastleIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bruchlande
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" href="/">
            CharSheet
          </Button>
          <Button color="inherit" href="/">
            Test
          </Button>
          <Button color="inherit" href="/">
            Quests
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
