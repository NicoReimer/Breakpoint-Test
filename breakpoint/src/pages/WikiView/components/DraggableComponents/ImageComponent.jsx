import { Box, Typography } from "@mui/material";

export default function ImageComponent({ item }) {
  let imageUrl = "";
  let imageWidth = "100%";

  try {
    const raw = JSON.parse(item.content);
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

    imageUrl = parsed.url || "";
    imageWidth = parsed.width || "100%";
  } catch (e) {
    console.error("❌ Fehler beim Parsen von Bildinhalt:", e);
    return (
      <Typography sx={{ color: "red", mb: 2 }}>
        ❌ Fehler beim Laden des Bildes
      </Typography>
    );
  }

  try {
    new URL(imageUrl); // validiert URL
  } catch (e) {
    return (
      <Typography sx={{ color: "red", mb: 2 }}>
        ❌ Ungültige Bild-URL
      </Typography>
    );
  }

  return (
    <Box sx={{ my: 2 }}>
      <img
        src={imageUrl}
        alt="Bild"
        style={{
          width: imageWidth,
          height: "auto",
          borderRadius: "8px",
          display: "block",
        }}
      />
    </Box>
  );
}
