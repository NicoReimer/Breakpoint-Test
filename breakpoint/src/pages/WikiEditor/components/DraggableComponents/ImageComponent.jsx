import { Box, TextField } from "@mui/material";
import { useState } from "react";

export default function ImageComponent({ item, onContentChange }) {
  const [isHovering, setIsHovering] = useState(false);
  const [width, setWidth] = useState("100%");

  // Parse content as JSON to store both URL and width
  const content = item.content
    ? JSON.parse(item.content)
    : { url: "", width: "100%" };

  const handleUrlChange = (newUrl) => {
    onContentChange(item.id, JSON.stringify({ ...content, url: newUrl }));
  };

  const handleWidthChange = (newWidth) => {
    const validWidth = newWidth.endsWith("%") ? newWidth : `${newWidth}%`;
    setWidth(validWidth);
    onContentChange(item.id, JSON.stringify({ ...content, width: validWidth }));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        "&:hover .controls": {
          opacity: 1,
        },
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {(!content.url || isHovering) && (
        <Box
          className="controls"
          sx={{
            position: content.url ? "absolute" : "relative",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            p: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: 1,
            opacity: content.url ? 0 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={content.url || ""}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Bild-URL eingeben..."
            sx={{ mb: 1 }}
          />
          <TextField
            size="small"
            value={content.width || "100%"}
            onChange={(e) => handleWidthChange(e.target.value)}
            placeholder="Breite (z.B. 100%)"
            sx={{
              width: "150px",
            }}
          />
        </Box>
      )}

      {content.url && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={content.url}
            alt="Preview"
            style={{
              width: content.width || "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>
      )}
    </Box>
  );
}
