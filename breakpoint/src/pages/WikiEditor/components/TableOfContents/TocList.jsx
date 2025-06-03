import { List, ListItem, ListItemText } from "@mui/material";

export default function TocList({ pages }) {
  // Helper function to calculate padding based on TOC level
  const getIndentation = (tocId) => {
    if (!tocId) return 0; // Return base padding if tocId is undefined
    return (tocId.split(".").length - 1) * 16;
  };

  return (
    <List>
      {pages.map((page) => (
        <ListItem
          key={page.id} // Add key prop to fix React warning
          sx={{
            pl: getIndentation(page.tocId),
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <ListItemText primary={page.title} />
        </ListItem>
      ))}
    </List>
  );
}
