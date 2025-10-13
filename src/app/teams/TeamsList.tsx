"use client";

import { Paper, Typography, List, ListItem } from "@mui/material";
import theme from "@/theme/theme";
import { Team } from "@/types/team";

interface TeamsListProps {
  teams: Team[];
}

const TeamsList: React.FC<TeamsListProps> = ({ teams }) => {
  return (
    <Paper
      sx={{
        p: theme.spacing(4),
        borderRadius: theme.spacing(2),
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h5" sx={{ mb: theme.spacing(3), fontWeight: 500 }}>
        Existing Teams
      </Typography>

      {teams.length === 0 ? (
        <Typography sx={{ color: theme.palette.text.secondary }}>
          No teams have been created yet.
        </Typography>
      ) : (
        <List>
          {teams.map((team, index) => (
            <ListItem
              key={team.id}
              sx={{
                py: theme.spacing(1.5),
                borderBottom:
                  index !== teams.length - 1
                    ? `1px solid ${theme.palette.divider}`
                    : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>{team.name}</Typography>
              <Typography
                sx={{ color: theme.palette.text.secondary, fontSize: "0.9rem" }}
              >
                {team.students?.length ?? 0}{" "}
                {team.students?.length === 1 ? "player" : "players"}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default TeamsList;
