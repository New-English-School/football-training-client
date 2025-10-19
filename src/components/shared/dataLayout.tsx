"use client";

import React from "react";
import { Box, Card } from "@mui/material";

interface DataLayoutProps {
  form: React.ReactNode;
  table: React.ReactNode;
}

export default function DataLayout({ form, table }: DataLayoutProps) {
  return (
    <Box
      className="flex flex-col md:flex-row gap-6 w-full"
      sx={{ alignItems: "flex-start" }}
    >
      <Card
        className="w-full md:w-1/3 p-4"
        sx={{ minHeight: 300, display: "flex", flexDirection: "column" }}
      >
        {form}
      </Card>

      <Card
        className="w-full md:w-2/3 p-4 overflow-auto"
        sx={{ minHeight: 300 }}
      >
        {table}
      </Card>
    </Box>
  );
}
