import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NewWiki() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const categories = [
    { value: "games", label: "🎮 Games" },
    { value: "books", label: "📚 Books" },
    { value: "art", label: "🎨 Art" },
    { value: "music", label: "🎵 Music" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement API call to create new wiki
    console.log("Creating new wiki:", formData);
    // navigate('/'); // Redirect to home after creation
  };

  if (user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Bitte logge dich ein, um ein Wiki zu erstellen.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Neues Wiki erstellen
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              label="Titel"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              required
              label="Beschreibung"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />

            <TextField
              required
              select
              label="Kategorie"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Wiki erstellen
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
