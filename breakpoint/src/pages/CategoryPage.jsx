import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import WikiCard from "../components/WikiCard";

export default function CategoryPage() {
  const { category } = useParams();
  const [wikis, setWikis] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/articles/category/${category}`)
      .then((res) => res.json())
      .then((data) => setWikis(data))
      .catch((err) => console.error("Fehler beim Laden der Wikis:", err));
  }, [category]);

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" gutterBottom>
        Kategorie: {category}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
          mt: 2,
        }}
      >
        {wikis.map((wiki, index) => (
          <WikiCard
            key={index}
            id={wiki.id}
            title={wiki.title}
            image={wiki.image}
            views={wiki.views}
          />
        ))}
      </Box>
    </Container>
  );
}
