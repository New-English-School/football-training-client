import { BaseService } from "./baseService";
import { Event } from "@/types/event";

class EventsService extends BaseService<Event> {
  constructor() {
    super("/events");
  }
}

export const eventsService = new EventsService();
