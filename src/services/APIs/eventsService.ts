import { BaseService } from "./baseService";
import { Event } from "@/types/event";

class EventsService extends BaseService<Event> {
  constructor() {
    super("/events");
  }

  async findAllWithFilters(
    filters?: Record<string, string | number>
  ): Promise<Event[]> {
    return this.findAll(filters);
  }
}

export const eventsService = new EventsService();
