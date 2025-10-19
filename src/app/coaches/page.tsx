"use client";

import React, { useEffect, useState } from "react";
import { coachesService } from "@/services/APIs/coachesService";
import DataLayout from "@/components/shared/dataLayout";
import DataForm from "@/components/shared/dataForm";
import DataTable from "@/components/shared/dataTable";
import type { Coach } from "@/types/coach";

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [formValues, setFormValues] = useState<Partial<Coach>>({
    name: "",
    email: "",
    phoneNumber: "",
    specialization: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchData = async () => {
    const data = await coachesService.findAll();
    setCoaches(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    key: keyof Coach,
    value: string | number | (string | number)[]
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (editingId) {
      await coachesService.update(editingId, formValues);
    } else {
      await coachesService.create(formValues);
    }
    setFormValues({ name: "", email: "", phoneNumber: "", specialization: "" });
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (coach: Coach) => {
    setFormValues(coach);
    setEditingId(coach.id);
  };

  const handleDelete = async (coach: Coach) => {
    await coachesService.remove(coach.id);
    fetchData();
  };

  return (
    <DataLayout
      form={
        <DataForm
          values={formValues}
          onChange={handleChange}
          onSubmit={handleSubmit}
          fields={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phoneNumber", label: "Phone Number" },
            { key: "specialization", label: "Specialization" },
          ]}
        />
      }
      table={
        <DataTable
          items={coaches}
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phoneNumber", label: "Phone" },
            { key: "specialization", label: "Specialization" },
          ]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      }
    />
  );
}
