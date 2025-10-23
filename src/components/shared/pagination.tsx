"use client";

import React from "react";
import { Stack, Button, Typography } from "@mui/material";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const total = totalPages > 0 ? totalPages : 1;

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        variant="outlined"
        disabled={page <= 0}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <Typography sx={{ alignSelf: "center" }}>
        Page {page + 1} of {total}
      </Typography>
      <Button
        variant="outlined"
        disabled={page + 1 >= total}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;
