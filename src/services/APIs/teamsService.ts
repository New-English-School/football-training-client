import { BaseService } from "./baseService";
import { Team } from "@/types/team";

class TeamsService extends BaseService<Team> {
  constructor() {
    super("/teams");
  }
}

export const teamsService = new TeamsService();
