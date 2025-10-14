"use client";

import React from "react";
import { Modal, Box } from "@mui/material";
import TeamForm from "./teamForm";
import { Team } from "@/types/team";

interface TeamModalProps {
  open: boolean;
  team: Team;
  onClose: () => void;
  onSave: (team: Team) => void;
}

const TeamModal: React.FC<TeamModalProps> = ({
  open,
  team,
  onClose,
  onSave,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 600,
          margin: "100px auto",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <TeamForm initialTeam={team} onSuccess={onSave} />
      </Box>
    </Modal>
  );
};

export default TeamModal;
