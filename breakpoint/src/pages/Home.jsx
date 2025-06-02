import { Box, Typography, Container, Paper } from '@mui/material';

export default function Home() {
  return (
    <Container sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Willkommen auf der Startseite 🎉
        </Typography>
        <Typography variant="body1">
          Fick dich Nico.
        </Typography>
      </Paper>
    </Container>
  );
}
