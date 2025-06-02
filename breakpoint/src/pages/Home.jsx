import {
  Box,
  Typography,
  Container,
  Paper,
  Stack,
  Divider,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Willkommen auf der Startseite 🎉
        </Typography>
        <Typography variant="body1">Fick dich Dennis.</Typography>
      </Paper>

      <Typography variant="h3" sx={{ mt: 8, mb: 4, textAlign: "center" }}>
        Categories
      </Typography>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: "200px",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">🎮</Typography>
            <Typography variant="h5">Games</Typography>
          </Stack>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: "200px",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">📚</Typography>
            <Typography variant="h5">Books</Typography>
          </Stack>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: "200px",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">🎨</Typography>
            <Typography variant="h5">Art</Typography>
          </Stack>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: "200px",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">🎵</Typography>
            <Typography variant="h5">Music</Typography>
          </Stack>
        </Paper>
      </Stack>
      <Divider sx={{ mt: 8, mb: 6 }} />
      <Typography variant="h3">Beliebte Wikies</Typography>
      <Stack
        direction="row"
        spacing={3}
        sx={{ mt: 2, mb: 8, flexWrap: "wrap" }}
      >
        <Card sx={{ width: 345, borderRadius: 2 }}>
          <CardMedia
            sx={{
              height: 90,
            }}
            image="https://www.kleinmachnow.de/media/custom/999_12711_1_g.JPG?1637243080"
            title="Sample Image"
          />
          <CardContent>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ mb: -1 }}
            >
              <Typography variant="h5" component="div">
                Minecraft
              </Typography>
              <Typography variant="body2" color="text.secondary">
                19k Views
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: 345, borderRadius: 2 }}>
          <CardMedia
            sx={{
              height: 90,
            }}
            image="https://photos99.ru/photo/28/63/286325483/286325483_2048.jpg"
            title="Sample Image"
          />
          <CardContent>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ mb: -1 }}
            >
              <Typography variant="h5" component="div">
                Terraria
              </Typography>
              <Typography variant="body2" color="text.secondary">
                19k Views
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: 345, borderRadius: 2 }}>
          <CardMedia
            sx={{
              height: 90,
            }}
            image="https://storage.de.cloud.ovh.net/v1/AUTH_97856089b0cd40beace6493b15fd316e/teachinomedia/ai_images/quiz-game-geography-sek1-fluesse-rhein-ursprung-und-verlauf.jpeg"
            title="Sample Image"
          />
          <CardContent>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ mb: -1 }}
            >
              <Typography variant="h5" component="div">
                Marvel
              </Typography>
              <Typography variant="body2" color="text.secondary">
                19k Views
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
