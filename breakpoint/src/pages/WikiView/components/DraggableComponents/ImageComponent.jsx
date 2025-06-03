import { Box } from "@mui/material";

export default function ImageComponent({ item, readOnly }) {
  return (
    <Box sx={{ my: 2 }}>
      <img
        src={item.content}
        alt="Bild"
        style={{ maxWidth: "100%", borderRadius: "8px" }}
      />
    </Box>
  );
}
