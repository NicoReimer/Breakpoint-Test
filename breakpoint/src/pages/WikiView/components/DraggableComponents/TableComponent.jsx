import { Table, TableBody, TableCell, TableRow } from "@mui/material";

export default function TableComponent({ item, readOnly }) {
  const rows = item.content || [];

  return (
    <Table sx={{ my: 2 }}>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
