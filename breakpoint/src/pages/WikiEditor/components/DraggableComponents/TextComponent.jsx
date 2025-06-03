import { TextField } from "@mui/material";
import { useState, useRef } from "react";

export default function TextComponent({ item, onContentChange }) {
  const [rows, setRows] = useState(3);
  const resizeRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = (e) => {
    if (e.target === resizeRef.current) {
      isResizing.current = true;
      const startY = e.clientY;
      const startRows = rows;

      const handleMouseMove = (moveEvent) => {
        if (isResizing.current) {
          const deltaY = moveEvent.clientY - startY;
          const newRows = Math.max(3, startRows + Math.round(deltaY / 24)); // 24px per row
          setRows(newRows);
        }
      };

      const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  return (
    <>
      <TextField
        multiline
        fullWidth
        rows={rows}
        value={item.content}
        onChange={(e) => onContentChange(item.id, e.target.value)}
        placeholder="Text eingeben..."
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "8px",
            "& fieldset": {
              borderColor: "grey.500",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "grey.400",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: "1px",
            },
          },
        }}
      />
      <div
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          bottom: -8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 40,
          height: 4,
          backgroundColor: "#B12C2C",
          borderRadius: 2,
          cursor: "row-resize",
          opacity: 0,
          transition: "opacity 0.2s",
        }}
      />
    </>
  );
}
