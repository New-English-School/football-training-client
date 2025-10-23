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
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface DataTableProps<T> {
  items: T[];
  columns: {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  fullHeight?: boolean;
}

export default function DataTable<T>({
  items,
  columns,
  onEdit,
  onDelete,
  fullHeight = false,
}: DataTableProps<T>) {
  if (!items.length) {
    return (
      <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
        No data available
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: fullHeight ? "100%" : "auto",
        overflowX: "auto",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
          tableLayout: "auto",
          // wordBreak: "break-word", // wrap long text
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                sx={{
                  whiteSpace: "normal",
                  fontWeight: "bold",
                }}
              >
                {col.label}
              </TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  sx={{
                    whiteSpace: "normal",
                  }}
                >
                  {col.render
                    ? col.render(item)
                    : String(item[col.key as keyof T] ?? "")}
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
    </Box>
  );
}
