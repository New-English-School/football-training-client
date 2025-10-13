import { BaseService } from "./baseService";
import { Coach } from "@/types/coach";

class CoachesService extends BaseService<Coach> {
  constructor() {
    super("/coaches");
  }
}

export const coachesService = new CoachesService();
