import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, IconButton, Toolbar } from "@mui/material";
import { DragDropContext } from "@hello-pangea/dnd";
import BuildIcon from "@mui/icons-material/Build";
import TocIcon from "@mui/icons-material/Toc";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import TableChartIcon from "@mui/icons-material/TableChart";
import SaveIcon from "@mui/icons-material/Save";

import ComponentDrawer from "./components/ComponentDrawer/ComponentDrawer";
import TableOfContents from "./components/TableOfContents/TableOfContents";
import TextComponent from "./components/DraggableComponents/TextComponent";
import ImageComponent from "./components/DraggableComponents/ImageComponent";
import TableComponent from "./components/DraggableComponents/TableComponent";
import ContentArea from "./components/ContentArea/ContentArea";

export default function WikiEditor() {
  const { id, tocId } = useParams();
  const [wikiData, setWikiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [tocDrawerOpen, setTocDrawerOpen] = useState(false);
  const [componentsDrawerOpen, setComponentsDrawerOpen] = useState(false);
  const [pageContent, setPageContent] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWikiData(data);
      });

    fetch(`http://localhost:3001/api/pages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPages(data);

        const currentPage = data.find((p) => String(p.tocID) === String(tocId));

        if (currentPage && currentPage.content) {
          try {
            const parsed = JSON.parse(currentPage.content);
            setPageContent(parsed.content || []);
            setSections(parsed.sections || []);
          } catch (err) {
            console.error("❌ Fehler beim Parsen:", err);
          }
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      });
  }, [id, tocId]);

  if (loading) return <div>Lade Wiki-Daten...</div>;
  if (!wikiData) return <div>Fehler beim Laden</div>;

  const currentPage = pages.find((p) => String(p.tocID) === String(tocId));
  const fullTitle = currentPage
    ? `${wikiData.title} - ${currentPage.title}`
    : wikiData.title;

  const components = [
    { id: "text", icon: <TextFieldsIcon />, label: "Textfeld" },
    { id: "image", icon: <ImageIcon />, label: "Bild" },
    { id: "table", icon: <TableChartIcon />, label: "Tabelle" },
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const newComponent = {
      id: `${result.draggableId}-${Date.now()}`,
      type: result.draggableId,
      content: "",
      children: [],
    };

    if (source.droppableId === "components") {
      if (destination.droppableId === "content") {
        const newContent = [...pageContent];
        newContent.splice(destination.index, 0, newComponent);
        setPageContent(newContent);
      } else if (destination.droppableId.startsWith("section-")) {
        const sectionId = parseInt(destination.droppableId.split("-")[1]);
        setSections(
          sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  content: [
                    ...section.content.slice(0, destination.index),
                    newComponent,
                    ...section.content.slice(destination.index),
                  ],
                }
              : section
          )
        );
      }
    } else if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "content") {
        const newContent = [...pageContent];
        const [removed] = newContent.splice(source.index, 1);
        newContent.splice(destination.index, 0, removed);
        setPageContent(newContent);
      } else if (source.droppableId.startsWith("section-")) {
        const sectionId = parseInt(source.droppableId.split("-")[1]);
        setSections(
          sections.map((section) => {
            if (section.id === sectionId) {
              const newContent = [...section.content];
              const [removed] = newContent.splice(source.index, 1);
              newContent.splice(destination.index, 0, removed);
              return { ...section, content: newContent };
            }
            return section;
          })
        );
      }
    }
  };

  const renderEditableComponent = (item) => {
    switch (item.type) {
      case "text":
        return (
          <TextComponent item={item} onContentChange={handleContentChange} />
        );
      case "image":
        return (
          <ImageComponent item={item} onContentChange={handleContentChange} />
        );
      case "table":
        return (
          <TableComponent item={item} onContentChange={handleContentChange} />
        );
      default:
        return null;
    }
  };

  const handleContentChange = (id, content) => {
    const mainContentIndex = pageContent.findIndex((i) => i.id === id);
    if (mainContentIndex !== -1) {
      const newContent = [...pageContent];
      newContent[mainContentIndex] = {
        ...newContent[mainContentIndex],
        content,
      };
      setPageContent(newContent);
      return;
    }

    setSections(
      sections.map((section) => {
        const sectionItemIndex = section.content.findIndex((i) => i.id === id);
        if (sectionItemIndex !== -1) {
          const newContent = [...section.content];
          newContent[sectionItemIndex] = {
            ...newContent[sectionItemIndex],
            content,
          };
          return { ...section, content: newContent };
        }
        return section;
      })
    );
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        title: "Neuer Abschnitt",
        content: [],
      },
    ]);
  };

  const handleSectionTitleChange = (id, newTitle) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  const handleDelete = (id) => {
    const mainContentIndex = pageContent.findIndex((item) => item.id === id);
    if (mainContentIndex !== -1) {
      const newContent = [...pageContent];
      newContent.splice(mainContentIndex, 1);
      setPageContent(newContent);
      return;
    }

    setSections(
      sections.map((section) => {
        const sectionItemIndex = section.content.findIndex(
          (item) => item.id === id
        );
        if (sectionItemIndex !== -1) {
          const newContent = [...section.content];
          newContent.splice(sectionItemIndex, 1);
          return { ...section, content: newContent };
        }
        return section;
      })
    );
  };

  const saveCurrentPage = () => {
    const payload = {
      content: pageContent,
      sections: sections,
    };

    fetch(`http://localhost:3001/api/pages/${id}/${tocId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("✅ Seite gespeichert");
      })
      .catch((err) => {
        console.error("❌ Fehler beim Speichern:", err);
      });
  };

  return (
    <>
      <Toolbar />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setComponentsDrawerOpen(true)}
            sx={{
              position: "fixed",
              left: 20,
              top: 80,
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            <BuildIcon />
          </IconButton>
          <IconButton
            onClick={() => setTocDrawerOpen(true)}
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

          <IconButton
            onClick={saveCurrentPage}
            sx={{
              position: "fixed",
              top: 200,
              left: 20,
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            <SaveIcon />
          </IconButton>

          <ComponentDrawer
            open={componentsDrawerOpen}
            onClose={() => setComponentsDrawerOpen(false)}
            components={components}
          />
          <TableOfContents
            open={tocDrawerOpen}
            onClose={() => setTocDrawerOpen(false)}
            pages={pages}
          />
          <ContentArea
            title={fullTitle}
            pageContent={pageContent}
            sections={sections}
            onAddSection={handleAddSection}
            onSectionTitleChange={handleSectionTitleChange}
            onDelete={handleDelete}
            renderEditableComponent={renderEditableComponent}
          />
        </Container>
      </DragDropContext>
    </>
  );
}
