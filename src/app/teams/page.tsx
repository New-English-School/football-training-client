"use client";

import { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  Modal,
  CircularProgress,
  Typography,
} from "@mui/material";
import theme from "@/theme/theme";
import { teamsService } from "@/services/APIs/teamsService";
import { Team } from "@/types/team";
import TeamsGrid from "./teamsGrid";
import TeamsForm from "./teamForm";

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isDesktop = useMediaQuery("(min-width:1024px)", {
    noSsr: true,
    defaultMatches: true,
  });

  useEffect(() => {
    let minLoadingTimeout: NodeJS.Timeout;

    const fetchTeams = async () => {
      setLoading(true);

      // Minimum 3 seconds spinner
      minLoadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 3000);

      try {
        const data = await teamsService.findAll();
        setTeams(data);
        setLoading(false); // stop spinner if data arrives early
      } catch (error) {
        console.error("❌ Failed to fetch teams:", error);
        setTeams([]);
        setLoading(false);
      }
    };

    fetchTeams();

    return () => clearTimeout(minLoadingTimeout);
  }, []);

  const handleAddTeam = (newTeam: Team) =>
    setTeams((prev) => [...prev, newTeam]);

  const handleUpdateTeam = (updatedTeam: Team) =>
    setTeams((prev) =>
      prev.map((t) => (t.id === updatedTeam.id ? updatedTeam : t))
    );

  const handleDeleteTeam = async (deletedId: number) => {
    try {
      await teamsService.remove(deletedId);
      setTeams((prev) => prev.filter((t) => t.id !== deletedId));
    } catch (error) {
      console.error("❌ Failed to delete team:", error);
    }
  };

  const handleViewEdit = (team: Team) => {
    setEditingTeam(team);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTeam(null);
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, md: 8 },
        maxWidth: 1400,
        mx: "auto",
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          alignItems: "stretch",
          gap: theme.spacing(6),
          flexGrow: 1, // fills vertical space
        }}
      >
        {/* Left column: create/edit team form */}
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: 400 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TeamsForm onSuccess={handleAddTeam} />
        </Box>

        {/* Right column: TeamsGrid or loading/empty state */}
        <Box
          sx={{
            flex: 2,
            mt: isDesktop ? 0 : 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {loading ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CircularProgress size={60} />
            </Box>
          ) : teams.length === 0 ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
              >
                No teams found.
              </Typography>
            </Box>
          ) : (
            <TeamsGrid
              teams={teams}
              onViewEdit={handleViewEdit}
              onDelete={handleDeleteTeam}
            />
          )}
        </Box>
      </Box>

      {/* Modal for editing team */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 500 },
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          {editingTeam && (
            <TeamsForm
              initialTeam={editingTeam}
              onSuccess={(updatedTeam) => {
                handleUpdateTeam(updatedTeam);
                handleCloseModal();
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default TeamsPage;
