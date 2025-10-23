"use client";

import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";

interface DataGridProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  columns?: number;
  rowsPerPage?: number;
  gap?: number;
  onPageChange?: (page: number) => void;
}

function DataGrid<T>({
  data,
  renderItem,
  keyExtractor,
  columns = 3,
  rowsPerPage = 3,
  gap = 4,
}: DataGridProps<T>) {
  const [page] = useState(0);

  const itemsPerPage = columns * rowsPerPage;

  const paginatedData = useMemo(() => {
    const start = page * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, page, itemsPerPage]);

  const placeholders = useMemo(() => {
    const remainder = paginatedData.length % columns;
    return remainder === 0 ? [] : Array.from({ length: columns - remainder });
  }, [paginatedData.length, columns]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gap,
          flexGrow: 1,
          minHeight: 0,
        }}
      >
        {paginatedData.map((item) => (
          <Box key={keyExtractor(item)}>{renderItem(item)}</Box>
        ))}
        {placeholders.map((_, idx) => (
          <Box key={`empty-${idx}`} />
        ))}
      </Box>
    </Box>
  );
}

export default DataGrid;
