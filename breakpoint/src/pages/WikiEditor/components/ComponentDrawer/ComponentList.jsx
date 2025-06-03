import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function ComponentList({ components }) {
  return (
    <Droppable droppableId="components" isDropDisabled={true}>
      {(provided) => (
        <List {...provided.droppableProps} ref={provided.innerRef}>
          {components.map((component, index) => (
            <Draggable
              key={component.id}
              draggableId={component.id}
              index={index}
            >
              {(provided, snapshot) => (
                <ListItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{
                    backgroundColor: snapshot.isDragging
                      ? "background.paper"
                      : "transparent",
                    cursor: "grab",
                  }}
                >
                  <ListItemIcon>{component.icon}</ListItemIcon>
                  <ListItemText primary={component.label} />
                </ListItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}
