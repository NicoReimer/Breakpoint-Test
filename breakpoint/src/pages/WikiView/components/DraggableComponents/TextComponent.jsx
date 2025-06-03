// /components/DraggableComponents/TextComponent.jsx
import { Typography } from "@mui/material";

export default function TextComponent({ item, readOnly }) {
  return (
    <Typography
      variant="body1"
      sx={{
        whiteSpace: "pre-wrap",
        background: "#2c2c2c",
        p: 2,
        borderRadius: 1,
      }}
    >
      {item.content || "[Leerer Text]"}
    </Typography>
  );
}
