import React from "react";
import { Paper, Typography, Button, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Team } from "@/types/team";

export interface TeamCardProps {
  team: Team;
  onViewEdit?: (team: Team) => void; // open modal
  onDelete?: (teamId: number) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onViewEdit, onDelete }) => {
  return (
    <Paper
      sx={{
        p: 2,
        position: "relative",
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 220,
        maxHeight: 220,
        overflow: "hidden",
      }}
    >
      {onDelete && (
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => onDelete(team.id)}
        >
          <DeleteIcon />
        </IconButton>
      )}

      <Box sx={{ mb: 1, overflow: "hidden" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          title={team.name}
        >
          {team.name}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {team.students?.length ?? 0}{" "}
          {team.students?.length === 1 ? "player" : "players"}
        </Typography>
      </Box>

      {onViewEdit && (
        <Button
          onClick={() => onViewEdit(team)}
          variant="outlined"
          size="small"
          sx={{ mt: 1, textTransform: "none", borderRadius: 1 }}
        >
          View/Edit
        </Button>
      )}
    </Paper>
  );
};

export default TeamCard;
