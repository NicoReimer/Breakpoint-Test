import { List, ListItem, ListItemText } from "@mui/material";

export default function TocList({ pages }) {
  // Helper function to calculate padding based on TOC level
  const getIndentation = (tocId) => {
    return (tocId.split(".").length - 1) * 16;
  };

  return (
    <List>
      {pages.map((page) => (
        <ListItem
          key={page.id}
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
