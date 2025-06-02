import useAuth from '../hooks/useAuth';
import { AppBar, Toolbar, Box, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    navigate('/settings');
  };

  const handleLogout = () => {
    window.location.href = 'http://localhost:3001/auth/logout';
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!user ? (
          <Button color="inherit" href="http://localhost:3001/auth/discord">
            Login mit Discord
          </Button>
        ) : (
          <Box>
            <Avatar
              onClick={handleAvatarClick}
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              sx={{ cursor: 'pointer' }}
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
      </Toolbar>
    </AppBar>
  );
}
