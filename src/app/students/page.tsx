"use client";

import React, { useEffect, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { studentsService } from "@/services/APIs/studentsService";
import { teamsService } from "@/services/APIs/teamsService";
import DataForm from "@/components/shared/dataForm";
import DataTable from "@/components/shared/dataTable";
import { Student } from "@/types/student";
import { Team } from "@/types/team";
import TwoColumnLayout from "@/components/shared/twoColumnLayout";
import DynamicModal from "@/components/shared/modals/dynamicModal";
import ConfirmDeleteModal from "@/components/shared/modals/confirmDeleteModal";

export default function StudentsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [students, setStudents] = useState<Student[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [addFormValues, setAddFormValues] = useState<Partial<Student>>({});
  const [modalFormValues, setModalFormValues] = useState<Partial<Student>>({});
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState<string>();
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  // ----------------- Handlers -----------------
  const handleAddChange = (
    key: keyof Student,
    value: string | number | (string | number)[]
  ) => setAddFormValues((prev) => ({ ...prev, [key]: value }));

  const handleAddSubmit = async () => {
    try {
      const savedStudent = await studentsService.create(addFormValues);
      setStudents((prev) => [...prev, savedStudent]);
      setAddFormValues({});
      setMessage("✅ Student created successfully!");
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to create student";
      setMessage(`❌ ${errMsg}`);
      console.error(error);
    }
  };

  const handleModalChange = (
    key: keyof Student,
    value: string | number | (string | number)[]
  ) => setModalFormValues((prev) => ({ ...prev, [key]: value }));

  const handleModalSubmit = async () => {
    if (!editingStudent) return;
    try {
      const savedStudent = await studentsService.update(
        editingStudent.id,
        modalFormValues
      );
      setStudents((prev) =>
        prev.map((s) => (s.id === savedStudent.id ? savedStudent : s))
      );
      setModalFormValues({});
      setEditingStudent(null);
      setModalOpen(false);
      setMessage("✅ Student updated successfully!");
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to update student";
      setMessage(`❌ ${errMsg}`);
      console.error(error);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setModalFormValues(student);
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

  const tableColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    { key: "dateOfBirth", label: "Date of Birth" },
    {
      key: "teams",
      label: "Teams",
      render: (student: Student) =>
        student.teams?.map((t) => t.name).join(", ") ?? "",
    },
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 } }}>
      <TwoColumnLayout
        form={
          <DataForm
            title="Add Student"
            values={addFormValues}
            onChange={handleAddChange}
            onSubmit={handleAddSubmit}
            submitLabel="Create Student"
            loading={loading}
            message={message}
            fields={[
              { key: "name", label: "Full Name" },
              { key: "email", label: "Email", type: "email" },
              { key: "phoneNumber", label: "Phone Number" },
              { key: "dateOfBirth", label: "Date of Birth", type: "date" },
              {
                key: "teams",
                label: "Teams",
                type: "multiselect",
                options: teams.map((t) => ({ id: t.id, name: t.name })),
              },
            ]}
          />
        }
        content={
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              p: isMobile ? 1 : 2,
              height: isMobile ? "auto" : "calc(80vh - 32px)",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <DataTable
              items={students}
              columns={tableColumns}
              onEdit={handleEdit}
              onDelete={handleDelete}
              fullHeight={!isMobile}
            />
          </Box>
        }
        loading={loading}
        empty={students.length === 0}
        emptyMessage="No students found."
        fixedHeight={isMobile ? "auto" : "80vh"}
        fixedWidth="100%"
      />

      {/* Dynamic Modal for Edit */}
      <DynamicModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingStudent(null);
          setModalFormValues({});
        }}
        maxWidth="500px"
        title="Edit Student"
      >
        <DataForm
          values={modalFormValues}
          onChange={handleModalChange}
          onSubmit={handleModalSubmit}
          submitLabel="Update Student"
          loading={loading}
          message={message}
          fields={[
            { key: "name", label: "Full Name" },
            { key: "email", label: "Email", type: "email" },
            { key: "phoneNumber", label: "Phone Number" },
            { key: "dateOfBirth", label: "Date of Birth", type: "date" },
            {
              key: "teams",
              label: "Teams",
              type: "multiselect",
              options: teams.map((t) => ({ id: t.id, name: t.name })),
            },
          ]}
        />
      </DynamicModal>

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        entityName="student"
      />
    </Box>
  );
}
