"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import {
  SportsSoccer,
  FitnessCenter,
  Person,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";
import { EventInput } from "@fullcalendar/core";

interface EventData extends EventInput {
  teamName?: string;
  coachName?: string;
  type?: string;
  location?: string;
}

interface EventModalProps {
  open: boolean;
  event: EventData | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ open, event, onClose }) => {
  console.log("Event object:", event);
  if (!event) return null;

  const formatDateTime = (date: EventInput["start"] | EventInput["end"]) => {
    if (!date) return "";

    let d: Date;

    if (typeof date === "string" || typeof date === "number") {
      d = new Date(date);
    } else if (Array.isArray(date)) {
      const [year, month, day, hour = 0, minute = 0, second = 0] = date;
      d = new Date(year, month, day, hour, minute, second);
    } else {
      d = date;
    }

    const dayStr = d.getDate().toString().padStart(2, "0");
    const monthStr = (d.getMonth() + 1).toString().padStart(2, "0");
    const yearStr = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    return `${dayStr}/${monthStr}/${yearStr} ${hours}:${minutes}`;
  };

  const typeIcon = (type?: string) => {
    switch (type) {
      case "match":
        return <SportsSoccer color="primary" />;
      case "training":
        return <FitnessCenter color="primary" />;
      default:
        return <SportsSoccer color="primary" />;
    }
  };

  // Extract team names from the array
  const teamNames =
    event.teams
      ?.map((team: { id: number; name: string }) => team.name)
      .join(", ") || "N/A";

  // Extract coach name
  const coachName = event.coach?.name || "N/A";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {event.title || event.name || "Event"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            {typeIcon(event.type)}
            <Typography variant="body1">
              <strong>Type:</strong> {event.type}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <SportsSoccer color="primary" />
            <Typography variant="body1">
              <strong>Team(s):</strong> {teamNames}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Person color="primary" />
            <Typography variant="body1">
              <strong>Coach:</strong> {coachName}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOn color="primary" />
            <Typography variant="body1">
              <strong>Location:</strong> {event.location || "N/A"}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTime color="primary" />
            <Typography variant="body1">
              <strong>Start:</strong>{" "}
              {formatDateTime(event.start || event.startDate)}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTime color="primary" />
            <Typography variant="body1">
              <strong>End:</strong> {formatDateTime(event.end || event.endDate)}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
