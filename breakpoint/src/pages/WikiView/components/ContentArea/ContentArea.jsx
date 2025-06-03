// /src/components/ContentArea.jsx
export default function ContentArea({
  title,
  pageContent,
  readOnly = false,
  sections = [],
  onAddSection,
  onSectionTitleChange,
  renderEditableComponent,
}) {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      {/* Content ohne Drag’n’Drop */}
      {pageContent.map((item, index) => (
        <Box key={index} sx={{ my: 2 }}>
          {renderEditableComponent(item)}
        </Box>
      ))}
    </Box>
  );
}
