"use client";

import React from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import theme from "@/theme/theme";

export interface SelectOption {
  id: number;
  name: string;
}

interface DataFormProps<T> {
  title?: string;
  values: T;
  onChange: (
    field: keyof T,
    value: string | number | (string | number)[]
  ) => void;
  onSubmit: () => void;
  fields: {
    key: keyof T;
    label: string;
    type?: "text" | "email" | "number" | "date" | "select" | "multiselect";
    options?: SelectOption[];
    required?: boolean;
  }[];
  submitLabel?: string;
  loading?: boolean;
  message?: string;
}

export default function DataForm<T>({
  title,
  values,
  onChange,
  onSubmit,
  fields,
  submitLabel = "Save",
  loading = false,
  message,
}: DataFormProps<T>) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: theme.spacing(2),
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent sx={{ p: theme.spacing(4) }}>
        {title && (
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: theme.spacing(3) }}
          >
            {title}
          </Typography>
        )}

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={theme.spacing(3)}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {fields.map(({ key, label, type, options, required }) => {
            const value = values[key];

            // --- Date field ---
            if (type === "date") {
              const formatted =
                typeof value === "string" && value.includes("-")
                  ? value
                  : value
                  ? new Date(value as string).toISOString().split("T")[0]
                  : "";

              return (
                <TextField
                  key={String(key)}
                  label={label}
                  type="date"
                  value={formatted}
                  onChange={(e) => onChange(key, e.target.value)}
                  fullWidth
                  required={required}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: theme.spacing(2),
                    },
                  }}
                />
              );
            }

            // --- Single select ---
            if (type === "select" && options) {
              return (
                <TextField
                  key={String(key)}
                  select
                  label={label}
                  value={(value as string | number | undefined) ?? ""}
                  onChange={(e) => onChange(key, +e.target.value)}
                  fullWidth
                  required={required}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: theme.spacing(2),
                    },
                  }}
                >
                  {options.map((opt) => (
                    <MenuItem key={opt.id} value={opt.id}>
                      {opt.name}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            // --- Multi select (Autocomplete) ---
            if (type === "multiselect" && options) {
              const selectedIds = (value as number[]) ?? [];
              const selectedItems = options.filter((opt) =>
                selectedIds.includes(opt.id)
              );

              return (
                <Autocomplete
                  key={String(key)}
                  multiple
                  options={options}
                  getOptionLabel={(opt) => opt.name}
                  value={selectedItems}
                  onChange={(_, newValue) =>
                    onChange(
                      key,
                      newValue.map((opt) => opt.id)
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={label}
                      placeholder="Select..."
                      required={required}
                    />
                  )}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: theme.spacing(2),
                    },
                  }}
                />
              );
            }

            // --- Default text/number/email field ---
            return (
              <TextField
                key={String(key)}
                label={label}
                type={type || "text"}
                value={(value as string | number | undefined) ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (type === "number") {
                    // Only allow numeric characters
                    const regex = /^-?\d*\.?\d*$/;
                    if (regex.test(val)) {
                      onChange(key, val === "" ? "" : Number(val));
                    }
                  } else {
                    onChange(key, val);
                  }
                }}
                fullWidth
                required={required}
                inputProps={
                  type === "number"
                    ? { inputMode: "numeric", pattern: "[0-9]*" }
                    : undefined
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.spacing(2),
                  },
                }}
              />
            );
          })}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              borderRadius: theme.spacing(2),
              py: theme.spacing(1.75),
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { boxShadow: "0 4px 14px rgba(0,0,0,0.1)" },
              mt: theme.spacing(1),
            }}
          >
            {loading ? (
              <Box display="flex" alignItems="center" gap={theme.spacing(1)}>
                <CircularProgress size={20} color="inherit" /> {submitLabel}...
              </Box>
            ) : (
              submitLabel
            )}
          </Button>

          {message && (
            <Typography
              align="center"
              sx={{
                mt: theme.spacing(1),
                color: message.startsWith("✅")
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
