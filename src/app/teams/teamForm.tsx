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

const CreateTeamForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateTeamDto>({
    name: "",
    coachId: undefined,
    studentIds: [],
  });

  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch available students on mount
  useEffect(() => {
    studentsService.findAll().then(setAvailableStudents).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Map selected students to their IDs
      const payload: CreateTeamDto = {
        name: formData.name,
        coachId: formData.coachId,
        studentIds: selectedStudents.map((student) => student.id),
      };

      // Create the team with students included
      const createdTeam: Team = await teamsService.create(payload);

      setMessage(`✅ Team "${createdTeam.name}" created successfully!`);
      setFormData({ name: "", coachId: undefined, studentIds: [] });
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error creating team:", error);
      setMessage("❌ Failed to create team.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        flex: 1,
        minHeight: 650, // taller card for dashboard layout
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
          Create New Team
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={theme.spacing(3)}
        >
          {/* Team Name */}
          <TextField
            fullWidth
            label="Team Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            size="medium"
            required
            color="primary"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: theme.spacing(2),
              },
            }}
          />

          {/* Students Multi-select */}
          <Autocomplete
            multiple
            options={availableStudents}
            getOptionLabel={(student) => student.name}
            value={selectedStudents}
            onChange={(event, newValue) => setSelectedStudents(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Students"
                placeholder="Choose students"
                variant="outlined"
              />
            )}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: theme.spacing(2),
              },
            }}
          />

          {/* Submit Button */}
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
              "&:hover": {
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              },
            }}
          >
            {isSubmitting ? (
              <Box display="flex" alignItems="center" gap={theme.spacing(1)}>
                <CircularProgress size={20} color="inherit" />
                Creating...
              </Box>
            ) : (
              "Create Team"
            )}
          </Button>

          {/* Message */}
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

export default CreateTeamForm;
