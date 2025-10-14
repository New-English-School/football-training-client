"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Autocomplete,
} from "@mui/material";
import theme from "@/theme/theme";
import { teamsService } from "@/services/APIs/teamsService";
import { studentsService } from "@/services/APIs/studentsService";
import { CreateTeamDto, Team } from "@/types/team";

interface Student {
  id: number;
  name: string;
}

interface TeamsFormProps {
  onSubmit?: (team: Team) => void;
  onSuccess?: (team: Team) => void;
  initialTeam?: Team;
}

const TeamsForm: React.FC<TeamsFormProps> = ({
  onSubmit,
  onSuccess,
  initialTeam,
}) => {
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<CreateTeamDto>({
    name: initialTeam?.name ?? "",
    coachId: initialTeam?.coachId,
    studentIds: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const normalizeStudents = (students?: number[] | Student[]): Student[] => {
    if (!students) return [];
    return students.map((s) =>
      typeof s === "number" ? { id: s, name: "" } : s
    );
  };

  useEffect(() => {
    studentsService
      .findAll()
      .then((students) => {
        setAvailableStudents(students);

        const initialSelected = normalizeStudents(initialTeam?.students);
        if (initialSelected.length > 0) {
          const matched = students.filter((s) =>
            initialSelected.some((st) => st.id === s.id)
          );
          setSelectedStudents(matched);
          setFormData((prev) => ({
            ...prev,
            studentIds: matched.map((s) => s.id),
          }));
        }
      })
      .catch(console.error);
  }, [initialTeam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const payload: CreateTeamDto = {
        name: formData.name,
        coachId: formData.coachId,
        studentIds: selectedStudents.map((student) => student.id),
      };

      let savedTeam: Team;
      if (initialTeam) {
        savedTeam = await teamsService.update(initialTeam.id, payload);
        setMessage(`✅ Team "${savedTeam.name}" updated successfully!`);
      } else {
        savedTeam = await teamsService.create(payload);
        setMessage(`✅ Team "${savedTeam.name}" created successfully!`);
      }

      onSubmit?.(savedTeam);
      onSuccess?.(savedTeam);

      if (!initialTeam) {
        setFormData({ name: "", coachId: undefined, studentIds: [] });
        setSelectedStudents([]);
      }
    } catch (error) {
      console.error("Error saving team:", error);
      setMessage("❌ Failed to save team.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        flex: 1,
        borderRadius: theme.spacing(2),
        bgcolor: theme.palette.background.paper,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: theme.spacing(4), flexGrow: 1 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 600,
            letterSpacing: 0.5,
            mb: theme.spacing(3),
          }}
        >
          {initialTeam ? "Edit Team" : "Create New Team"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={theme.spacing(3)}
        >
          <TextField
            fullWidth
            label="Team Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            color="primary"
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: theme.spacing(2) },
            }}
          />

          <Autocomplete
            multiple
            options={availableStudents}
            getOptionLabel={(student) => student.name}
            value={selectedStudents}
            onChange={(_, newValue) => {
              setSelectedStudents(newValue);
              setFormData((prev) => ({
                ...prev,
                studentIds: newValue.map((s) => s.id),
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Students"
                placeholder="Choose students"
              />
            )}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: theme.spacing(2) },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{
              borderRadius: theme.spacing(2),
              py: theme.spacing(1.75),
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { boxShadow: "0 4px 14px rgba(0,0,0,0.1)" },
            }}
          >
            {isSubmitting ? (
              <Box display="flex" alignItems="center" gap={theme.spacing(1)}>
                <CircularProgress size={20} color="inherit" />{" "}
                {initialTeam ? "Updating..." : "Creating..."}
              </Box>
            ) : initialTeam ? (
              "Update Team"
            ) : (
              "Create Team"
            )}
          </Button>

          {message && (
            <Typography
              align="center"
              sx={{
                mt: theme.spacing(1),
                color: message.startsWith("✅")
                  ? theme.palette.success.main
                  : theme.palette.secondary.main,
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamsForm;
