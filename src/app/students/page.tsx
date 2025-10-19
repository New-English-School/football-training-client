"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  Modal,
  CircularProgress,
  Typography,
} from "@mui/material";
import theme from "@/theme/theme";
import { studentsService } from "@/services/APIs/studentsService";
import { teamsService } from "@/services/APIs/teamsService";
import DataForm from "@/components/shared/dataForm";
import DataTable from "@/components/shared/dataTable";
import { Student } from "@/types/student";
import { Team } from "@/types/team";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [formValues, setFormValues] = useState<Partial<Student>>({});
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState<string>();

  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width:1024px)", {
    noSsr: true,
    defaultMatches: true,
  });
  const dashboardHeight = 800;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [studentData, teamData] = await Promise.all([
          studentsService.findAll(),
          teamsService.findAll(),
        ]);
        setStudents(studentData);
        setTeams(teamData);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    key: keyof Student,
    value: string | number | (string | number)[]
  ) => setFormValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      let savedStudent: Student;
      if (editingStudent) {
        savedStudent = await studentsService.update(
          editingStudent.id,
          formValues
        );
        setStudents((prev) =>
          prev.map((s) => (s.id === savedStudent.id ? savedStudent : s))
        );
      } else {
        savedStudent = await studentsService.create(formValues);
        setStudents((prev) => [...prev, savedStudent]);
      }
      setFormValues({});
      setEditingStudent(null);
      setModalOpen(false);
      setMessage("✅ Student saved successfully!");
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to save student";
      setMessage(`❌ ${errMsg}`);
      console.error(error);
    }
  };

  const handleEdit = (student: Student) => {
    setFormValues(student);
    setEditingStudent(student);
    setModalOpen(true);
  };

  const handleDelete = (student: Student) => {
    setDeleteStudent(student);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteStudent) return;
    try {
      await studentsService.remove(deleteStudent.id);
      setStudents((prev) => prev.filter((s) => s.id !== deleteStudent.id));
      setMessage("✅ Student deleted successfully!");
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to delete student";
      setMessage(`❌ ${errMsg}`);
      console.error(error);
    } finally {
      setConfirmOpen(false);
      setDeleteStudent(null);
    }
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setDeleteStudent(null);
  };

  const tableColumns: { key: keyof Student | "teams"; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "teams", label: "Teams" },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, md: 8 },
        maxWidth: 1400,
        mx: "auto",
        width: "100%",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: theme.spacing(6),
          alignItems: "stretch",
        }}
      >
        {/* Form for creating a new student */}
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: 400 },
            display: "flex",
            flexDirection: "column",
            height: dashboardHeight,
          }}
        >
          <DataForm
            title="Add Student"
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            teams={teams}
            submitLabel="Create Student"
            loading={loading}
            message={message}
            fields={[
              { key: "name", label: "Full Name" },
              { key: "email", label: "Email", type: "email" },
              { key: "phoneNumber", label: "Phone Number" },
              { key: "dateOfBirth", label: "Date of Birth", type: "date" },
              { key: "teams", label: "Teams", type: "multiselect" },
            ]}
          />
        </Box>

        {/* Table */}
        <Box
          sx={{
            flex: 2,
            height: dashboardHeight,
            overflowY: "auto",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            bgcolor: "background.paper",
            p: 2,
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress size={60} />
            </Box>
          ) : students.length === 0 ? (
            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ mt: 4 }}
            >
              No students found.
            </Typography>
          ) : (
            <DataTable
              items={students}
              columns={tableColumns}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </Box>
      </Box>

      {/* Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 500 },
          }}
        >
          {editingStudent && (
            <DataForm
              title="Edit Student"
              values={formValues}
              onChange={handleChange}
              onSubmit={handleSubmit}
              teams={teams}
              submitLabel="Update Student"
              loading={loading}
              message={message}
              fields={[
                { key: "name", label: "Full Name" },
                { key: "email", label: "Email", type: "email" },
                { key: "phoneNumber", label: "Phone Number" },
                { key: "dateOfBirth", label: "Date of Birth", type: "date" },
                { key: "teams", label: "Teams", type: "multiselect" },
              ]}
            />
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={confirmOpen} onClose={cancelDelete}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", md: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Are you sure you want to delete this student?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
            <Box
              component="button"
              onClick={confirmDelete}
              sx={{
                px: 3,
                py: 1,
                bgcolor: "error.main",
                color: "white",
                border: "none",
                borderRadius: 1,
                cursor: "pointer",
              }}
            >
              Yes
            </Box>
            <Box
              component="button"
              onClick={cancelDelete}
              sx={{
                px: 3,
                py: 1,
                bgcolor: "grey.300",
                border: "none",
                borderRadius: 1,
                cursor: "pointer",
              }}
            >
              No
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
