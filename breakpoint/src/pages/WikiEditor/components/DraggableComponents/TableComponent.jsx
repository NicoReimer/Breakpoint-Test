import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Button,
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
    <Box>
      <TableContainer>
        <Table>
          <TableBody>
            {tableData.cells.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell key={`${rowIndex}-${colIndex}`}>
                    <TextField
                      fullWidth
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={addRow}>Zeile hinzufügen</Button>
      <Button onClick={addColumn}>Spalte hinzufügen</Button>
    </Box>
  );
}
