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
} from "@mui/material";
import theme from "@/theme/theme";
import { Team } from "@/types/team";

interface DataFormProps<T> {
  title?: string;
  values: T;
  teams?: Team[];
  onChange: (
    field: keyof T,
    value: string | number | (string | number)[]
  ) => void;
  onSubmit: () => void;
  fields: {
    key: keyof T;
    label: string;
    type?: "text" | "email" | "number" | "date" | "select" | "multiselect";
  }[];
  submitLabel?: string;
  loading?: boolean;
  message?: string;
}

export default function DataForm<T>({
  title,
  values,
  teams,
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
          {fields.map(({ key, label, type }) => {
            // Handle date formatting (dd/mm/yyyy)
            if (type === "date") {
              const value = values[key] as string | undefined;
              const formatted =
                value && !value.includes("-")
                  ? value
                  : value
                  ? new Date(value).toISOString().split("T")[0]
                  : "";

              return (
                <TextField
                  key={String(key)}
                  label={label}
                  type="date"
                  value={formatted}
                  onChange={(e) => onChange(key, e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: theme.spacing(2),
                    },
                  }}
                />
              );
            }

            // Handle select (single)
            if (type === "select" && teams) {
              return (
                <TextField
                  key={String(key)}
                  select
                  label={label}
                  value={(values[key] as string | number | undefined) ?? ""}
                  onChange={(e) => onChange(key, +e.target.value)}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: theme.spacing(2),
                    },
                  }}
                >
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            // Handle multi-select
            if (type === "multiselect" && teams) {
              const selected = (values[key] as number[]) ?? [];
              return (
                <TextField
                  key={String(key)}
                  select
                  SelectProps={{
                    multiple: true,
                    value: selected,
                    onChange: (e) => {
                      const newValue = e.target.value as number[];
                      onChange(key, newValue);
                    },
                  }}
                  label={label}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: theme.spacing(2),
                    },
                  }}
                >
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            // Default field (text, email, number)
            return (
              <TextField
                key={String(key)}
                label={label}
                type={type || "text"}
                value={(values[key] as string | number | undefined) ?? ""}
                onChange={(e) =>
                  onChange(
                    key,
                    type === "number" ? +e.target.value : e.target.value
                  )
                }
                fullWidth
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
