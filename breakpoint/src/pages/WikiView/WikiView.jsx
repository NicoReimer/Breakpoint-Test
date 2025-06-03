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
  const { id, tocId } = useParams();
  const navigate = useNavigate();
  const [wiki, setWiki] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setWiki(data));

    fetch(`http://localhost:3001/api/pages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const parsedPages = data.map((page) => {
          let parsedContent = { content: [], sections: [] };

          try {
            if (page.content) {
              parsedContent = JSON.parse(page.content);
            }
          } catch (err) {
            console.error(
              `❌ Fehler beim Parsen der Seite "${page.title}"`,
              err
            );
          }

          return {
            ...page,
            parsedContent,
          };
        });

        setPages(parsedPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      });
  }, [id]);

  const renderComponent = (item) => {
    switch (item.type) {
      case "text":
        return (
          <Typography sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
            {item.content}
          </Typography>
        );
      case "image":
        return (
          <Box sx={{ mb: 2 }}>
            <img
              src={typeof item.content === "string" ? item.content : ""}
              alt="Bild"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "";
                e.target.alt = "❌ Ungültige Bild-URL";
              }}
            />
            {typeof item.content !== "string" && (
              <Typography sx={{ color: "red" }}>
                ❌ Ungültige Bild-URL
              </Typography>
            )}
          </Box>
        );

      case "table":
        try {
          const rows = Array.isArray(item.content)
            ? item.content
            : item.content?.rows
            ? item.content.cells
            : JSON.parse(item.content);
          return (
            <Box
              component="table"
              sx={{
                width: "100%",
                mb: 2,
                borderCollapse: "collapse",
                backgroundColor: "#333",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          border: "1px solid #555",
                          padding: "8px",
                          color: "#fff",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Box>
          );
        } catch (e) {
          return <Typography>❌ Fehlerhafte Tabelle</Typography>;
        }
      default:
        return null;
    }
  };

  if (loading) return <div>Lade Wiki...</div>;
  if (!wiki) return <div>Fehler beim Laden des Wikis</div>;

  return (
    <>
      {/* Bearbeiten-Button */}
      <Tooltip title="Wiki bearbeiten">
        <IconButton
          onClick={() => {
            if (pages.length > 0) {
              navigate(`/wiki/${id}/edit/${pages[0].tocID}`);
            } else {
              console.error("❌ Keine Seiten vorhanden");
            }
          }}
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

        {pages.map((page) => (
          <Box key={page.tocID} sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom>
              {page.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {page.parsedContent.content?.map((item) => (
              <div key={item.id}>{renderComponent(item)}</div>
            ))}

            {page.parsedContent.sections?.map((section) => (
              <Box key={section.id} sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  {section.title}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                {section.content.map((item) => (
                  <div key={item.id}>{renderComponent(item)}</div>
                ))}
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    </>
  );
}
