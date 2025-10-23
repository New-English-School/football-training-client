"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { coachesService } from "@/services/APIs/coachesService";
import DataForm from "@/components/shared/dataForm";
import DataTable from "@/components/shared/dataTable";
import TwoColumnLayout from "@/components/shared/twoColumnLayout";
import DynamicModal from "@/components/shared/modals/dynamicModal";
import ConfirmDeleteModal from "@/components/shared/modals/confirmDeleteModal";
import type { Coach } from "@/types/coach";
import theme from "@/theme/theme";

export default function CoachesPage() {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>();
  const [addFormValues, setAddFormValues] = useState<Partial<Coach>>({});
  const [modalFormValues, setModalFormValues] = useState<Partial<Coach>>({});
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteCoach, setDeleteCoach] = useState<Coach | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // --- Fetch coaches ---
  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      try {
        const data = await coachesService.findAll();
        setCoaches(data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load coaches");
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  // --- Field configuration ---
  const coachFields: {
    key: keyof Coach;
    label: string;
    type?: "text" | "email" | "number" | "select" | "multiselect" | "date";
    required?: boolean;
  }[] = [
    { key: "name", label: "Full Name", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phoneNumber", label: "Phone Number", required: true },
  ];

  // --- Generic typed form change handler ---
  const handleFormChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<Partial<Coach>>>) =>
      (key: keyof Coach, value: string | number | (string | number)[]) =>
        setter((prev) => ({ ...prev, [key]: value })),
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

  // --- Add coach ---
  const handleAddSubmit = useCallback(async () => {
    try {
      const saved = await coachesService.create(addFormValues);
      setCoaches((prev) => [...prev, saved]);
      setAddFormValues({});
      setMessage("✅ Coach created successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create coach";
      setMessage(`❌ ${msg}`);
      console.error(err);
    }
  }, [addFormValues]);

  // --- Edit coach ---
  const handleEdit = useCallback((coach: Coach) => {
    setEditingCoach(coach);
    setModalFormValues(coach);
    setModalOpen(true);
  }, []);

  const handleModalSubmit = useCallback(async () => {
    if (!editingCoach) return;
    try {
      const updated = await coachesService.update(
        editingCoach.id,
        modalFormValues
      );
      setCoaches((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      setModalFormValues({});
      setEditingCoach(null);
      setModalOpen(false);
      setMessage("✅ Coach updated successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update coach";
      setMessage(`❌ ${msg}`);
      console.error(err);
    }
  }, [editingCoach, modalFormValues]);

  // --- Delete coach ---
  const handleDelete = useCallback((coach: Coach) => {
    setDeleteCoach(coach);
    setConfirmOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteCoach) return;
    try {
      await coachesService.remove(deleteCoach.id);
      setCoaches((prev) => prev.filter((c) => c.id !== deleteCoach.id));
      setMessage("✅ Coach deleted successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete coach";
      setMessage(`❌ ${msg}`);
      console.error(err);
    } finally {
      setDeleteCoach(null);
      setConfirmOpen(false);
    }
  }, [deleteCoach]);

  // --- Table columns ---
  const tableColumns: { key: keyof Coach; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
  ];

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, py: { xs: 4, md: 6 } }}>
      <TwoColumnLayout
        form={
          <DataForm
            title="Add Coach"
            values={addFormValues}
            onChange={handleAddChange}
            onSubmit={handleAddSubmit}
            submitLabel="Create Coach"
            loading={loading}
            message={message}
            fields={coachFields}
          />
        }
        content={
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              p: 2,
              flexGrow: 1,
              height: isDesktop ? "100%" : "auto",
              overflowY: "auto",
            }}
          >
            <DataTable
              items={coaches}
              columns={tableColumns}
              onEdit={handleEdit}
              onDelete={handleDelete}
              fullHeight
            />
          </Box>
        }
        loading={loading}
        empty={coaches.length === 0}
        emptyMessage="No coaches found."
        fixedHeight={isDesktop ? "80vh" : "auto"}
      />

      {/* Edit Modal */}
      <DynamicModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCoach(null);
          setModalFormValues({});
        }}
        maxWidth="500px"
        title="Edit Coach"
      >
        <DataForm
          values={modalFormValues}
          onChange={handleModalChange}
          onSubmit={handleModalSubmit}
          submitLabel="Update Coach"
          loading={loading}
          message={message}
          fields={coachFields}
        />
      </DynamicModal>

      {/* Delete Confirmation */}
      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        entityName="coach"
      />
    </Box>
  );
}
