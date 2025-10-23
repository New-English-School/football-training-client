"use client";

import React, { useEffect, useState, Suspense, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import type { EventClickArg } from "@fullcalendar/core";

import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { eventsService } from "@/services/APIs/eventsService";
import { Event } from "@/types/event";
import { Team } from "@/types/team";
import { Coach } from "@/types/coach";

import EventModal from "./EventModal";
import EventFormModal from "./EventFormModal";

// FullCalendar CSS (imports auto-load their styles)
import "@fullcalendar/daygrid";
import "@fullcalendar/timegrid";
import "@fullcalendar/list";

export interface EventData {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  type: string;
  location: string;
  color: string;
  backgroundColor?: string;
  teams?: Team[];
  coach?: Coach | null;
}

const mapEventToCalendarData = (e: Event): EventData => ({
  id: e.id.toString(),
  title: e.name,
  type: e.type,
  location: e.location,
  start: e.startDate,
  end: e.endDate,
  color: e.type === "match" ? "#ff6b6b" : "#6c63ff",
  backgroundColor: e.type === "match" ? "#ff6b6b" : "#6c63ff",
  teams: e.teams ?? [],
  coach: e.coach ?? null,
});

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<"view" | "create" | null>(
    null
  );
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data: Event[] = await eventsService.findAll();
      setEvents(data.map(mapEventToCalendarData));
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = new Date(arg.date);
    if (
      arg.view.type === "dayGridMonth" ||
      (clickedDate.getHours() === 0 && clickedDate.getMinutes() === 0)
    ) {
      clickedDate.setHours(9, 0, 0, 0);
    }
    setSelectedDate(clickedDate);
    setActiveModal("create");
  };

  const handleEventClick = (arg: EventClickArg) => {
    const e = arg.event;
    setSelectedEvent({
      ...(e.extendedProps as EventData),
      start: e.start ?? new Date(),
      end: e.end ?? new Date(),
      title: e.title,
      id: e.id,
      backgroundColor: e.backgroundColor ?? "#6c63ff",
      color: e.backgroundColor ?? "#6c63ff",
    });
    setActiveModal("view");
  };

  const handleEventUpdate = async (
    arg: Parameters<
      NonNullable<React.ComponentProps<typeof FullCalendar>["eventDrop"]>
    >[0]
  ) => {
    try {
      await eventsService.update(Number(arg.event.id), {
        startDate: arg.event.start?.toISOString() ?? undefined,
        endDate: arg.event.end?.toISOString() ?? undefined,
      });
    } catch (err) {
      console.error("Failed to update event:", err);
      arg.revert?.();
    }
  };

  const closeModal = () => setActiveModal(null);

  // Dynamically adjust header layout for smaller screens
  const headerToolbar = isMobile
    ? {
        left: "title",
        center: "",
        right: "prev,next",
      }
    : isTablet
    ? {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek",
      }
    : {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 3, md: 6 },
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          mb: { xs: 3, md: 4 },
          fontWeight: 600,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Training & Matches Calendar
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : events.length === 0 ? (
        <Typography align="center" sx={{ mt: 8 }}>
          No events found.
        </Typography>
      ) : (
        <Box
          sx={{
            "& .fc": {
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            },
            "& .fc-toolbar-title": {
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
            },
            "& .fc-button": {
              padding: { xs: "4px 8px", sm: "6px 12px" },
              fontSize: { xs: "0.7rem", sm: "0.85rem" },
              borderRadius: "6px",
              textTransform: "capitalize",
            },
          }}
        >
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={headerToolbar}
            initialView={isMobile ? "listWeek" : "dayGridMonth"}
            editable
            selectable
            selectMirror
            dayMaxEvents
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventUpdate}
            weekends
            height={isMobile ? "auto" : 800}
            aspectRatio={isMobile ? 0.75 : 1.35}
          />
        </Box>
      )}

      <Suspense fallback={null}>
        {activeModal === "view" && selectedEvent && (
          <EventModal open={true} event={selectedEvent} onClose={closeModal} />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {activeModal === "create" && (
          <EventFormModal
            open={true}
            defaultDate={selectedDate ?? undefined}
            onClose={closeModal}
            onEventCreated={fetchEvents}
          />
        )}
      </Suspense>
    </Box>
  );
};

export default CalendarPage;
