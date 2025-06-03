import { useState } from "react";
import { Container, IconButton, Toolbar } from "@mui/material";
import { DragDropContext } from "@hello-pangea/dnd";
import BuildIcon from "@mui/icons-material/Build";
import TocIcon from "@mui/icons-material/Toc";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import TableChartIcon from "@mui/icons-material/TableChart";

import ComponentDrawer from "./components/ComponentDrawer/ComponentDrawer";
import TableOfContents from "./components/TableOfContents/TableOfContents";
import TextComponent from "./components/DraggableComponents/TextComponent";
import ImageComponent from "./components/DraggableComponents/ImageComponent";
import TableComponent from "./components/DraggableComponents/TableComponent";
import ContentArea from "./components/ContentArea/ContentArea";

export default function WikiEditor() {
  const [pages] = useState([
    {
      id: 1,
      wikiId: 1,
      tocId: "0",
      title: "Home",
      content: "Welcome to the Wiki",
    },
    {
      id: 2,
      wikiId: 1,
      tocId: "1",
      title: "Getting Started",
      content: "First steps...",
    },
    {
      id: 3,
      wikiId: 1,
      tocId: "1.1",
      title: "Installation",
      content: "How to install...",
    },
    {
      id: 4,
      wikiId: 1,
      tocId: "1.2",
      title: "Configuration",
      content: "How to configure...",
    },
    {
      id: 5,
      wikiId: 1,
      tocId: "2",
      title: "Advanced Topics",
      content: "Advanced usage...",
    },
    {
      id: 6,
      wikiId: 1,
      tocId: "2.1",
      title: "Security",
      content: "Security settings...",
    },
  ]);
  const [tocDrawerOpen, setTocDrawerOpen] = useState(false);
  const [componentsDrawerOpen, setComponentsDrawerOpen] = useState(false);
  const [pageContent, setPageContent] = useState([]);
  // Add sections state
  const [sections, setSections] = useState([]);

  const components = [
    { id: "text", icon: <TextFieldsIcon />, label: "Textfeld" },
    { id: "image", icon: <ImageIcon />, label: "Bild" },
    { id: "table", icon: <TableChartIcon />, label: "Tabelle" },
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dragging from components list
    if (source.droppableId === "components") {
      const newComponent = {
        id: `${result.draggableId}-${Date.now()}`,
        type: result.draggableId,
        content: "",
        children: [],
      };

      if (destination.droppableId === "content") {
        const newContent = Array.from(pageContent);
        newContent.splice(destination.index, 0, newComponent);
        setPageContent(newContent);
      } else if (destination.droppableId.startsWith("section-")) {
        const sectionId = parseInt(destination.droppableId.split("-")[1]);
        setSections(
          sections.map((section) => {
            if (section.id === sectionId) {
              const newSectionContent = [...section.content];
              newSectionContent.splice(destination.index, 0, newComponent);
              return { ...section, content: newSectionContent };
            }
            return section;
          })
        );
      }
    }
    // If reordering within same container
    else if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "content") {
        const newContent = Array.from(pageContent);
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
    // Check if the item is in the main content
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

    // Check if the item is in a section
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

  return (
    <>
      <Toolbar />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container sx={{ position: "relative" }}>
          {/* Buttons */}
          <IconButton
            onClick={() => setComponentsDrawerOpen(true)}
            sx={{
              position: "fixed",
              left: 20,
              top: 80,
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
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
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            <TocIcon />
          </IconButton>

          {/* Drawers */}
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

          {/* Content Area */}
          <ContentArea
            title={pages[0].title}
            pageContent={pageContent}
            sections={sections}
            onAddSection={handleAddSection}
            onSectionTitleChange={handleSectionTitleChange}
            renderEditableComponent={renderEditableComponent}
          />
        </Container>
      </DragDropContext>
    </>
  );
}
