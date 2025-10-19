"use client";

import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface DataTableProps<T> {
  items: T[];
  columns: { key: keyof T; label: string }[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export default function DataTable<T>({
  items,
  columns,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  if (!items.length) {
    return (
      <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
        No data available
      </Typography>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={String(col.key)}>{col.label}</TableCell>
          ))}
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, idx) => (
          <TableRow key={idx}>
            {columns.map((col) => (
              <TableCell key={String(col.key)}>
                {String(item[col.key] ?? "")}
              </TableCell>
            ))}
            <TableCell align="right">
              <IconButton color="info" onClick={() => onEdit(item)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(item)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
