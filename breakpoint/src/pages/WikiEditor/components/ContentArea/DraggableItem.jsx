import { Box } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

export default function DraggableItem({
  item,
  index,
  renderEditableComponent,
}) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            width: "100%",
            position: "relative",
            "& .MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                transition: "border-color 0.2s",
                borderWidth: "1px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
                cursor: "grab",
              },
            },
            "&:hover": {
              "& .resize-handle": {
                opacity: 1,
              },
            },
            ...(snapshot.isDragging && {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
                cursor: "grabbing",
              },
            }),
          }}
        >
          <Box sx={{ position: "relative" }}>
            {renderEditableComponent(item)}
            {/* Resize Handle */}
            <Box
              className="resize-handle"
              sx={{
                position: "absolute",
                bottom: -20,
                left: "50%",
                transform: "translateX(-50%)",
                opacity: 0,
                transition: "opacity 0.2s",
                cursor: "row-resize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 20,
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <UnfoldMoreIcon
                sx={{
                  color: "primary.main",
                  fontSize: 20,
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
}
