"use client";

import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { teamsService } from "@/services/APIs/teamsService";
import { Team } from "@/types/team";
import CreateTeamForm from "./teamForm";
import TeamsGrid from "./teamsGrid";
import theme from "@/theme/theme";

const TeamsDashboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    teamsService.findAll().then(setTeams).catch(console.error);
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 4, md: 8 },
        py: { xs: 6, md: 10 },
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: theme.spacing(6),
        }}
      >
        {/* Left column: Form */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <CreateTeamForm />
        </Box>

        {/* Right column: Grid */}
        <Box sx={{ flex: 2 }}>
          <TeamsGrid teams={teams} />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamsDashboard;
