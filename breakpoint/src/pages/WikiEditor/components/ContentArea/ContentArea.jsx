import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import DraggableItem from "./DraggableItem";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function ContentArea({
  title,
  pageContent,
  sections,
  onAddSection,
  onSectionTitleChange,
  renderEditableComponent,
  onDelete,
}) {
  const [editingSection, setEditingSection] = useState(null);

  return (
    <Paper elevation={3} sx={{ p: 4, minHeight: "70vh" }}>
      {/* Main Title */}
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Main Content Area */}
      <Droppable droppableId="content">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              minHeight: 200,
              border: "2px dashed",
              borderColor: "grey.500",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 4,
            }}
          >
            {pageContent.map((item, index) => (
              <DraggableItem
                key={item.id}
                item={item}
                index={index}
                renderEditableComponent={renderEditableComponent}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {/* Sections */}
      {sections.map((section) => (
        <Box key={section.id} sx={{ mt: 4 }}>
          {editingSection === section.id ? (
            <TextField
              variant="standard"
              value={section.title}
              onChange={(e) => onSectionTitleChange(section.id, e.target.value)}
              onBlur={() => setEditingSection(null)}
              onKeyPress={(e) => {
                if (e.key === "Enter") setEditingSection(null);
              }}
              autoFocus
              fullWidth
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography
              variant="h5"
              gutterBottom
              onClick={() => setEditingSection(section.id)}
              sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
            >
              {section.title}
            </Typography>
          )}
          <Divider sx={{ mb: 3 }} />
          <Droppable droppableId={`section-${section.id}`}>
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  minHeight: 100,
                  border: "2px dashed",
                  borderColor: "grey.500",
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {section.content.map((item, index) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    index={index}
                    renderEditableComponent={renderEditableComponent}
                    onDelete={onDelete}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      ))}

      {/* Add Section Button */}
      <Button
        startIcon={<AddIcon />}
        onClick={onAddSection}
        sx={{ mt: 3 }}
        variant="outlined"
      >
        Abschnitt hinzufügen
      </Button>
    </Paper>
  );
}
