import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";
import WikiCard from "../components/WikiCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/articles?search=${encodeURIComponent(query)}`
        )
        .then((res) => setResults(res.data))
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" gutterBottom>
        Suchergebnisse für: <em>{query}</em>
      </Typography>

      {results.length === 0 ? (
        <Typography>Keine Artikel gefunden.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
            mt: 2,
          }}
        >
          {results.map((wiki, index) => (
            <WikiCard
              key={index}
              id={wiki.id}
              title={wiki.title}
              image={wiki.image_url}
              views={wiki.views}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
