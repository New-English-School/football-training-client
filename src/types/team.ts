export interface Team {
  id: number;
  name: string;
  coachId?: number;
  students?: number[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTeamDto {
  name: string;
  coachId?: number;
  studentIds?: number[];
}