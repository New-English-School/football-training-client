"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { eventsService } from "@/services/APIs/eventsService";
import { coachesService } from "@/services/APIs/coachesService";
import { teamsService } from "@/services/APIs/teamsService";

interface EventFormModalProps {
  open: boolean;
  onClose: () => void;
  defaultDate?: Date;
  onEventCreated: () => void;
}

interface Team {
  id: number;
  name: string;
}

interface Coach {
  id: number;
  name: string;
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  open,
  onClose,
  defaultDate,
  onEventCreated,
}) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"training" | "match">("training");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [teams, setTeams] = useState<Team[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch teams and coaches
  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teamsData, coachesData] = await Promise.all([
          teamsService.findAll(),
          coachesService.findAll(),
        ]);
        setTeams(teamsData);
        setCoaches(coachesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [open]);

  // Set default start/end dates from calendar click
  useEffect(() => {
    if (!open || !defaultDate) return;

    const roundedStart = new Date(defaultDate);
    roundedStart.setMinutes(
      Math.ceil(roundedStart.getMinutes() / 15) * 15,
      0,
      0
    );

    const defaultEnd = new Date(roundedStart.getTime() + 60 * 60 * 1000); // +1 hour

    setStartDate(roundedStart);
    setStartTime(roundedStart);
    setEndDate(defaultEnd);
    setEndTime(defaultEnd);
  }, [defaultDate, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (selectedTeams.length === 0) {
      setError("At least one team must be selected.");
      setSubmitting(false);
      return;
    }

    if (!startDate || !startTime || !endDate || !endTime) {
      setError("Please select start and end dates/times.");
      setSubmitting(false);
      return;
    }

    const start = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes()
    );

    const end = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
    );

    try {
      await eventsService.create({
        name: title,
        type,
        location,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        coachId: selectedCoach?.id,
        teamIds: selectedTeams.map((t) => t.id),
      });

      onEventCreated();
      onClose();

      // Reset form
      setTitle("");
      setType("training");
      setLocation("");
      setSelectedTeams([]);
      setSelectedCoach(null);
      setStartDate(null);
      setStartTime(null);
      setEndDate(null);
      setEndTime(null);
    } catch (err: unknown) {
      console.error("Failed to create event", err);
      setError("Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Event</DialogTitle>
      <DialogContent>
        {loading ? (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                {error && (
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                )}

                <TextField
                  label="Title"
                  required
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                  label="Type"
                  select
                  required
                  fullWidth
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "training" | "match")
                  }
                >
                  <MenuItem value="training">Training</MenuItem>
                  <MenuItem value="match">Match</MenuItem>
                </TextField>

                <Autocomplete
                  multiple
                  options={teams}
                  getOptionLabel={(option) => option.name}
                  value={selectedTeams}
                  onChange={(e, newValue) => setSelectedTeams(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Team(s)" />
                  )}
                />

                <Autocomplete
                  options={coaches}
                  getOptionLabel={(option) => option.name}
                  value={selectedCoach}
                  onChange={(e, newValue) => setSelectedCoach(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Coach" required />
                  )}
                />

                <TextField
                  label="Location"
                  required
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={setStartTime}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={setEndTime}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
              </Stack>

              <DialogActions sx={{ mt: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting || loading}
                >
                  {submitting ? "Creating..." : "Create"}
                </Button>
              </DialogActions>
            </form>
          </LocalizationProvider>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventFormModal;
