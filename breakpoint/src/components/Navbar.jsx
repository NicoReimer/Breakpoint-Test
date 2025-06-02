import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import CastleIcon from "@mui/icons-material/Castle";

export const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
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
          Breakpoint
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
