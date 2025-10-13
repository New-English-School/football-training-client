export interface Team {
  id: number;
  name: string;
  coachId?: number;
  players?: number[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTeamDto {
  name: string;
  coachId?: number;
  studentIds?: number[];
}