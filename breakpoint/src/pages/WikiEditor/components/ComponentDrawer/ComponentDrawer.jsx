import { Drawer, Toolbar, Box } from "@mui/material";
import ComponentList from "./ComponentList";

export default function ComponentDrawer({ open, onClose, components }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Toolbar />
      <Box sx={{ width: 250 }}>
        <ComponentList components={components} />
      </Box>
    </Drawer>
  );
}
