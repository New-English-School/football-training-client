import { Coach } from "./coach";
import { Team } from "./team";

export interface Event {
  id: number;
  name: string;
  type: string; // "training" | "match"
  startDate: string;
  endDate: string;
  location: string;
  teams: Team[];     // now full objects
  coach: Coach | null; // full object
  createdAt?: string;
  updatedAt?: string;
}
