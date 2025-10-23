"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { teamsService } from "@/services/APIs/teamsService";
import { studentsService } from "@/services/APIs/studentsService";
import { Team, CreateTeamDto } from "@/types/team";
import { Student } from "@/types/student";
import TwoColumnLayout from "@/components/shared/twoColumnLayout";
import DataForm from "@/components/shared/dataForm";
import DynamicModal from "@/components/shared/modals/dynamicModal";
import ConfirmDeleteModal from "@/components/shared/modals/confirmDeleteModal";
import DataGrid from "@/components/shared/dataGrid";
import Pagination from "@/components/shared/pagination";
import TeamCard from "./teamCard";

export default function TeamsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [teams, setTeams] = useState<Team[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>();
  const [currentPage, setCurrentPage] = useState(0);

  const columns = isMobile ? 1 : 3;
  const rowsPerPage = isMobile ? 4 : 3;
  const itemsPerPage = rowsPerPage * columns;

  const [addFormValues, setAddFormValues] = useState<Partial<CreateTeamDto>>({
    name: "",
    coachId: undefined,
    studentIds: [],
  });

  const [modalFormValues, setModalFormValues] = useState<
    Partial<CreateTeamDto>
  >({
    name: "",
    coachId: undefined,
    studentIds: [],
  });

  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTeam, setDeleteTeam] = useState<Team | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // --- Fetch data ---
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [teamData, studentData] = await Promise.all([
          teamsService.findAll(),
          studentsService.findAll(),
        ]);
        setTeams(teamData);
        setStudents(studentData);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const studentOptions = useMemo(
    () => students.map((s) => ({ id: s.id, name: s.name })),
    [students]
  );

  type SelectOption = { id: number; name: string };

  const teamFields: {
    key: keyof CreateTeamDto;
    label: string;
    type?: "text" | "number" | "select" | "multiselect" | "email" | "date";
    options?: SelectOption[];
    required?: boolean;
  }[] = [
    { key: "name", label: "Team Name", type: "text", required: true },
    {
      key: "studentIds",
      label: "Students",
      type: "multiselect",
      options: studentOptions,
    },
  ];

  const handleFormChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<Partial<CreateTeamDto>>>) =>
      (
        key: keyof CreateTeamDto,
        value: string | number | (string | number)[]
      ) => {
        setter((prev) => ({
          ...prev,
          [key]:
            key === "studentIds" && Array.isArray(value)
              ? value.map(Number)
              : value,
        }));
      },
    []
  );

  const handleAddChange = useMemo(
    () => handleFormChange(setAddFormValues),
    [handleFormChange]
  );
  const handleModalChange = useMemo(
    () => handleFormChange(setModalFormValues),
    [handleFormChange]
  );

  const handleAddSubmit = useCallback(async () => {
    try {
      const payload: CreateTeamDto = {
        name: addFormValues.name?.toString() ?? "",
        coachId: addFormValues.coachId,
        studentIds: (addFormValues.studentIds as number[]) ?? [],
      };
      const saved = await teamsService.create(payload);
      setTeams((prev) => [...prev, saved]);
      setAddFormValues({ name: "", coachId: undefined, studentIds: [] });
      setMessage(`✅ Team "${saved.name}" created.`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create team.");
    }
  }, [addFormValues]);

  const handleEdit = useCallback((team: Team) => {
    const studentIds =
      (team.students as (number | { id: number })[] | undefined)?.map((s) =>
        typeof s === "number" ? s : s.id
      ) ?? [];
    setEditingTeam(team);
    setModalFormValues({ name: team.name, coachId: team.coachId, studentIds });
    setModalOpen(true);
  }, []);

  const handleModalSubmit = useCallback(async () => {
    if (!editingTeam) return;
    try {
      const payload: CreateTeamDto = {
        name: modalFormValues.name?.toString() ?? "",
        coachId: modalFormValues.coachId,
        studentIds: (modalFormValues.studentIds as number[]) ?? [],
      };
      const updated = await teamsService.update(editingTeam.id, payload);
      setTeams((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setMessage(`✅ Team "${updated.name}" updated.`);
      setModalOpen(false);
      setEditingTeam(null);
      setModalFormValues({ name: "", coachId: undefined, studentIds: [] });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update team.");
    }
  }, [editingTeam, modalFormValues]);

  const handleDelete = useCallback(
    (id: number) => {
      const t = teams.find((x) => x.id === id) ?? null;
      setDeleteTeam(t);
      setConfirmOpen(true);
    },
    [teams]
  );

  const confirmDelete = useCallback(async () => {
    if (!deleteTeam) return;
    try {
      await teamsService.remove(deleteTeam.id);
      setTeams((prev) => prev.filter((t) => t.id !== deleteTeam.id));
      setMessage(`✅ Team "${deleteTeam.name}" deleted.`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete team.");
    } finally {
      setDeleteTeam(null);
      setConfirmOpen(false);
    }
  }, [deleteTeam]);

  // --- Pagination ---
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(teams.length / itemsPerPage)),
    [teams.length, itemsPerPage]
  );

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, totalPages]);

  const paginatedTeams = useMemo(
    () =>
      teams.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [teams, currentPage, itemsPerPage]
  );

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 } }}>
      <TwoColumnLayout
        form={
          <DataForm<Partial<CreateTeamDto>>
            title="Create Team"
            values={addFormValues}
            onChange={handleAddChange}
            onSubmit={handleAddSubmit}
            fields={teamFields}
            submitLabel="Create Team"
            loading={loading}
            message={message}
          />
        }
        content={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <DataGrid
              data={paginatedTeams}
              keyExtractor={(team) => team.id}
              renderItem={(team) => (
                <TeamCard
                  team={team}
                  onViewEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              columns={columns}
              rowsPerPage={rowsPerPage}
              gap={isMobile ? 2 : 4}
            />
            <Box sx={{ mt: { xs: 2, md: 4 } }}>
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Box>
          </Box>
        }
        loading={loading}
        empty={teams.length === 0}
        emptyMessage="No teams found."
        fixedHeight="auto"
        fixedWidth="100%"
      />

      {/* Edit Modal */}
      <DynamicModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTeam(null);
          setModalFormValues({ name: "", coachId: undefined, studentIds: [] });
        }}
        title="Edit Team"
        maxWidth="600px"
      >
        <DataForm<Partial<CreateTeamDto>>
          values={modalFormValues}
          onChange={handleModalChange}
          onSubmit={handleModalSubmit}
          fields={teamFields}
          submitLabel="Update Team"
          loading={loading}
          message={message}
        />
      </DynamicModal>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        entityName="team"
      />
    </Box>
  );
}
