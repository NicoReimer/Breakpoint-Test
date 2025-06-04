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
import { useEffect, useState } from "react";

export default function Home() {
  const [popularWikis, setPopularWikis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/articles/popular")
      .then((res) => res.json())
      .then((data) => setPopularWikis(data))
      .catch((err) => console.error("❌ Fehler beim Laden der Wikis:", err));
  }, []);

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
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
          mt: 2,
          mb: 8,
        }}
      >
{popularWikis.length > 0 ? (
  popularWikis.map((wiki, index) => (
    <WikiCard
      key={index}
      id={wiki.id || 0}
      title={wiki.title || "Unbenannt"}
      image={wiki.image || "https://via.placeholder.com/300x200?text=No+Image"}
      views={wiki.views || "0"}
    />
  ))
) : (
  <Typography variant="body1" sx={{ mt: 2 }}>
    Keine Wikis gefunden.
  </Typography>
)}

      </Box>
    </Container>
  );
}
