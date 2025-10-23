import { Team } from "./team";

export interface Student {
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  teams: Team[];
  createdAt?: string;
  updatedAt?: string;
}
