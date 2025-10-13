import { BaseService } from "./baseService";
import { Student } from "@/types/student";

class StudentsService extends BaseService<Student> {
  constructor() {
    super("/students");
  }
}

export const studentsService = new StudentsService();
