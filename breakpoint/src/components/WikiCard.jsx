import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function WikiCard({ title, image, views }) {
  return (
    <Card
      sx={{
        width: "100%", // Changed from fixed width to 100%
        borderRadius: 2,
        maxWidth: 280, // Added max-width for consistency
      }}
    >
      <CardMedia
        sx={{
          height: 90,
        }}
        image={image}
        title={title}
      />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: -1 }}
        >
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <VisibilityIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {views}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
