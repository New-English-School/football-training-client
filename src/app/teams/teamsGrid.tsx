import { Box, Stack, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Team } from "@/types/team";
import TeamCard from "./teamCard";

interface TeamsGridProps {
  teams: Team[];
  onViewEdit?: (team: Team) => void;
  onDelete?: (id: number) => void;
  teamsPerPage?: number;
}

const TeamsGrid: React.FC<TeamsGridProps> = ({
  teams,
  onViewEdit,
  onDelete,
  teamsPerPage = 9,
}) => {
  const [page, setPage] = useState(0);
  const [paginatedTeams, setPaginatedTeams] = useState<Team[]>([]);

  const totalPages = Math.ceil(teams.length / teamsPerPage);

  useEffect(() => {
    const start = page * teamsPerPage;
    const end = start + teamsPerPage;
    setPaginatedTeams(teams.slice(start, end));
  }, [teams, page, teamsPerPage]);

  const placeholders = Array.from({
    length:
      paginatedTeams.length % 3 === 0 ? 0 : 3 - (paginatedTeams.length % 3),
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // full height of parent container
      }}
    >
      {/* Grid area */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 4,
          flexGrow: 1, // fill vertical space
          minHeight: 0, // important for flex layout
        }}
      >
        {paginatedTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onViewEdit={onViewEdit}
            onDelete={onDelete}
          />
        ))}

        {placeholders.map((_, idx) => (
          <Box key={`empty-${idx}`} />
        ))}
      </Box>

      {/* Pagination pinned at bottom */}
      {totalPages > 1 && (
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Typography sx={{ alignSelf: "center" }}>
            Page {page + 1} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default TeamsGrid;
