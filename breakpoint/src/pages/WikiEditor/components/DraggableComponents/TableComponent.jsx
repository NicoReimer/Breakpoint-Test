import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
} from "@mui/material";

export default function TableComponent({ item, onContentChange }) {
  const tableData = item.content || {
    rows: 2,
    cols: 2,
    cells: Array(2).fill(Array(2).fill("")),
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newCells = [...tableData.cells];
    newCells[rowIndex][colIndex] = value;
    onContentChange(item.id, { ...tableData, cells: newCells });
  };

  const addRow = () => {
    const newCells = [...tableData.cells, Array(tableData.cols).fill("")];
    onContentChange(item.id, {
      ...tableData,
      rows: tableData.rows + 1,
      cells: newCells,
    });
  };

  const addColumn = () => {
    const newCells = tableData.cells.map((row) => [...row, ""]);
    onContentChange(item.id, {
      ...tableData,
      cols: tableData.cols + 1,
      cells: newCells,
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          border: "1px solid",
          borderColor: "grey.500",
          "& .MuiTable-root": {
            borderCollapse: "collapse",
          },
          "& .MuiTableCell-root": {
            borderRight: "1px solid",
            borderBottom: "1px solid",
            borderColor: "grey.500",
          },
          "& .MuiTableCell-root:last-child": {
            borderRight: "none",
          },
          "& .MuiTableRow-root:last-child .MuiTableCell-root": {
            borderBottom: "none",
          },
          // Add stronger border for header row
          "& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root": {
            borderBottom: "2px solid",
            borderColor: "grey.500",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {tableData.cells[0]?.map((_, colIndex) => (
                <TableCell
                  key={`header-${colIndex}`}
                  sx={{
                    backgroundColor: "grey.800",
                    fontWeight: "bold",
                  }}
                >
                  <TextField
                    fullWidth
                    value={tableData.cells[0][colIndex]}
                    onChange={(e) =>
                      handleCellChange(0, colIndex, e.target.value)
                    }
                    variant="standard"
                    sx={{
                      "& .MuiInputBase-input": {
                        fontWeight: "bold",
                      },
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.cells.slice(1).map((row, rowIndex) => (
              <TableRow key={rowIndex + 1}>
                {row.map((cell, colIndex) => (
                  <TableCell key={`${rowIndex + 1}-${colIndex}`}>
                    <TextField
                      fullWidth
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex + 1, colIndex, e.target.value)
                      }
                      variant="standard"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button onClick={addRow} variant="outlined" size="small">
          Zeile hinzufügen
        </Button>
        <Button onClick={addColumn} variant="outlined" size="small">
          Spalte hinzufügen
        </Button>
      </Box>
    </Box>
  );
}
