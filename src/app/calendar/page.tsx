"use client";

import React, { useEffect, useState, Suspense } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
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

export interface EventData {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  type: string;
  location: string;
  color: string;
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
  teams: e.teams ?? [],
  coach: e.coach ?? null,
});

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchEvents = async (): Promise<void> => {
    setLoading(true);
    try {
      const data: Event[] = await eventsService.findAll();
      setEvents(data.map(mapEventToCalendarData));
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (arg: DateClickArg): void => {
    const clickedDate = new Date(arg.date);
    if (
      arg.view.type === "dayGridMonth" ||
      (clickedDate.getHours() === 0 && clickedDate.getMinutes() === 0)
    ) {
      clickedDate.setHours(9, 0, 0, 0);
    }
    setSelectedDate(clickedDate);
    setOpenCreateModal(true);
  };

  const handleEventClick = (arg: EventClickArg): void => {
    setSelectedEvent({
      ...(arg.event.extendedProps as EventData),
      start: arg.event.start ?? new Date(),
      end: arg.event.end ?? new Date(),
      title: arg.event.title,
      id: arg.event.id,
      color: arg.event.backgroundColor,
    });
    setOpenViewModal(true);
  };

  const handleEventUpdate = async (
    arg: Parameters<
      NonNullable<React.ComponentProps<typeof FullCalendar>["eventDrop"]>
    >[0]
  ): Promise<void> => {
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

  useEffect(() => {
    if (openViewModal) setOpenCreateModal(false);
  }, [openViewModal]);

  useEffect(() => {
    if (openCreateModal) setOpenViewModal(false);
  }, [openCreateModal]);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 8 },
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
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
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
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
          height="auto"
        />
      )}

      <Suspense fallback={null}>
        {openViewModal && selectedEvent && (
          <EventModal
            open={openViewModal}
            event={selectedEvent}
            onClose={() => setOpenViewModal(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {openCreateModal && (
          <EventFormModal
            open={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            defaultDate={selectedDate ?? undefined}
            onEventCreated={fetchEvents}
          />
        )}
      </Suspense>
    </Box>
  );
};

export default CalendarPage;
