import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import TocIcon from "@mui/icons-material/Toc";
import EditIcon from "@mui/icons-material/Edit";

import TableOfContents from "./components/TableOfContents/TableOfContents";

export default function WikiView() {
  const { id } = useParams(); // /wiki/:id
  const navigate = useNavigate();
  const [wiki, setWiki] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWiki(data);
      });

    fetch(`http://localhost:3001/api/pages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Lade Wiki...</div>;
  if (!wiki) return <div>Fehler beim Laden des Wikis</div>;

  return (
    <>
      {/* Bearbeiten-Button */}
      <Tooltip title="Wiki bearbeiten">
        <IconButton
          onClick={() => navigate(`/wiki/${id}/edit`)}
          sx={{
            position: "fixed",
            top: 80,
            right: 20,
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": { backgroundColor: "primary.dark" },
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* TOC-Button */}
      <IconButton
        onClick={() => setTocOpen(true)}
        sx={{
          position: "fixed",
          left: 20,
          top: 140,
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      >
        <TocIcon />
      </IconButton>

      <TableOfContents
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        pages={pages}
      />

      <Container sx={{ mt: 6 }}>
        <Typography variant="h3" gutterBottom>
          {wiki.title}
        </Typography>

        {pages.map((page, index) => (
          <Box key={index} sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom id={`section-${index}`}>
              {page.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                backgroundColor: "#424242",
                p: 2,
                borderRadius: 2,
                whiteSpace: "pre-wrap",
              }}
            >
              {page.content || "Diese Seite ist noch leer."}
            </Box>
          </Box>
        ))}
      </Container>
    </>
  );
}
