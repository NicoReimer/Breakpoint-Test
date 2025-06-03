import { Box, TextField } from "@mui/material";

export default function ImageComponent({ item, onContentChange }) {
  return (
    <Box>
      <TextField
        fullWidth
        value={item.content}
        onChange={(e) => onContentChange(item.id, e.target.value)}
        placeholder="Bild-URL eingeben..."
      />
      {item.content && (
        <img
          src={item.content}
          alt="Preview"
          style={{
            maxWidth: "100%",
            marginTop: 8,
          }}
        />
      )}
    </Box>
  );
}
