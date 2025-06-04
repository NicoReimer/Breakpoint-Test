import {
  Box,
  Typography,
  Container,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import WikiCard from "../components/WikiCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const popularWikis = [
    {
      title: "Minecraft",
      image:
        "https://www.kleinmachnow.de/media/custom/999_12711_1_g.JPG?1637243080",
      views: "19k",
    },
    {
      title: "Terraria",
      image: "https://photos99.ru/photo/28/63/286325483/286325483_2048.jpg",
      views: "19k",
    },
    {
      title: "Marvel",
      image:
        "https://storage.de.cloud.ovh.net/v1/AUTH_97856089b0cd40beace6493b15fd316e/teachinomedia/ai_images/quiz-game-geography-sek1-fluesse-rhein-ursprung-und-verlauf.jpeg",
      views: "19k",
    },
    {
      title: "Marvel",
      image:
        "https://storage.de.cloud.ovh.net/v1/AUTH_97856089b0cd40beace6493b15fd316e/teachinomedia/ai_images/quiz-game-geography-sek1-fluesse-rhein-ursprung-und-verlauf.jpeg",
      views: "19k",
    },
    {
      title: "Marvel",
      image:
        "https://storage.de.cloud.ovh.net/v1/AUTH_97856089b0cd40beace6493b15fd316e/teachinomedia/ai_images/quiz-game-geography-sek1-fluesse-rhein-ursprung-und-verlauf.jpeg",
      views: "19k",
    },
    {
      title: "Marvel",
      image:
        "https://storage.de.cloud.ovh.net/v1/AUTH_97856089b0cd40beace6493b15fd316e/teachinomedia/ai_images/quiz-game-geography-sek1-fluesse-rhein-ursprung-und-verlauf.jpeg",
      views: "19k",
    },
  ];
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Willkommen auf der Startseite 🎉
        </Typography>
        <Typography variant="body1">Hier könnte ihre Werbung stehen!</Typography>
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
          onClick={() => {
            navigate("/category/Games");
          }}
          sx={{
            cursor: "pointer",
            p: 2,
            width: "200px",
            textAlign: "center",
            borderRadius: 2,
            border: "2px solid transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">🎮</Typography>
            <Typography variant="h5">Games</Typography>
          </Stack>
        </Paper>
        <Paper
          elevation={3}
          onClick={() => {
            navigate("/category/Movies");
          }}
          sx={{
            cursor: "pointer",
            p: 2,
            width: "200px",
            textAlign: "center",
            borderRadius: 2,
            border: "2px solid transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">🎥</Typography>
            <Typography variant="h5">Movies</Typography>
          </Stack>
        </Paper>
        <Paper
          elevation={3}
          onClick={() => {
            navigate("/category/Books");
          }}
          sx={{
            cursor: "pointer",
            p: 2,
            width: "200px",
            textAlign: "center",
            borderRadius: 2,
            border: "2px solid transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">📚</Typography>
            <Typography variant="h5">Books</Typography>
          </Stack>
        </Paper>
        <Paper
          elevation={3}
          onClick={() => {
            navigate("/category/Music");
          }}
          sx={{
            cursor: "pointer",
            p: 2,
            width: "200px",
            textAlign: "center",
            borderRadius: 2,
            border: "2px solid transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">🎵</Typography>
            <Typography variant="h5">Music</Typography>
          </Stack>
        </Paper>
      </Stack>
      <Divider sx={{ mt: 8, mb: 6 }} />
      <Typography variant="h3">Beliebte Wikis</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // Creates 4 equal columns
          gap: 3,
          mt: 2,
          mb: 8,
        }}
      >
        {popularWikis.map((wiki, index) => (
          <WikiCard
            key={index}
            title={wiki.title}
            image={wiki.image}
            views={wiki.views}
          />
        ))}
      </Box>
    </Container>
  );
}
