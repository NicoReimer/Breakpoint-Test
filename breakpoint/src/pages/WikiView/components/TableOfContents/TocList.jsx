import { List, ListItem, ListItemText } from "@mui/material";

export default function TocList({ pages }) {
  const getIndentation = (tocId) => {
    if (!tocId) return 0;
    return (tocId.split(".").length - 1) * 16;
  };

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <List>
      {pages.map((page, index) => (
        <ListItem
          key={index}
          onClick={() => scrollToSection(index)}
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
