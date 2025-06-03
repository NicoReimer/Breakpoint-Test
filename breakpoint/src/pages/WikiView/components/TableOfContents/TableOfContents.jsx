import { Drawer, Toolbar, Box, Typography } from "@mui/material";
import TocList from "./TocList";

export default function TableOfContents({ open, onClose, pages }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Toolbar />
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Inhaltsverzeichnis
        </Typography>
        <TocList pages={pages} />
      </Box>
    </Drawer>
  );
}
