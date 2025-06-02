import useAuth from '../hooks/useAuth';
import { Avatar, Box, Typography, Paper } from '@mui/material';

export default function Settings() {
  const { user } = useAuth();

  if (!user) {
    return <Typography sx={{ p: 4 }}>Nicht eingeloggt</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            sx={{ width: 100, height: 100 }}
          />
          <Typography><strong>Username:</strong> {user.username}#{user.discriminator}</Typography>
          <Typography><strong>ID:</strong> {user.id}</Typography>
          <Typography><strong>E-Mail:</strong> {user.email || 'nicht verfügbar'}</Typography>
        </Box>
      </Paper>
    </Box>
  );
}
