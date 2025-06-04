import { Card, CardMedia, CardContent, Typography, Stack, CardActionArea } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

export default function WikiCard({ id, title, image, views }) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        maxWidth: 280,
      }}
    >
      <CardActionArea component={Link} to={`/wiki/${id}`}>
        <CardMedia
          sx={{ height: 90 }}
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
      </CardActionArea>
    </Card>
  );
}
