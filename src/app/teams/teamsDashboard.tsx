"use client";

import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import theme from "@/theme/theme";
import { teamsService } from "@/services/APIs/teamsService";
import { Team } from "@/types/team";
import TeamsGrid from "./teamsGrid";
import TeamsForm from "./teamForm";

const TeamsDashboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    teamsService.findAll().then(setTeams).catch(console.error);
  }, []);

  const handleAddTeam = (newTeam: Team) => {
    setTeams((prev) => [...prev, newTeam]);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, md: 8 },
        maxWidth: 1400,
        mx: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          alignItems: "flex-start",
          gap: theme.spacing(6),
        }}
      >
        {/* Left column: Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            minWidth: { xs: "100%", md: 400 },
          }}
        >
          <TeamsForm onSubmit={handleAddTeam} />
        </Box>

        {/* Right column: Grid */}
        <Box
          sx={{
            flex: 2,
            width: "100%",
            mt: isDesktop ? 0 : 4,
          }}
        >
          <TeamsGrid teams={teams} setTeams={setTeams} />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamsDashboard;
