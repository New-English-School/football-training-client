"use client";

import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme";
import { Team } from "@/types/team";
import TeamCard from "./TeamCard";

interface TeamsGridProps {
  teams: Team[];
}

const TeamsGrid: React.FC<TeamsGridProps> = ({ teams }) => {
  if (teams.length === 0) {
    return (
      <Typography sx={{ color: theme.palette.text.secondary }}>
        No teams have been created yet.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
        gap: theme.spacing(4),
      }}
    >
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </Box>
  );
};

export default TeamsGrid;
