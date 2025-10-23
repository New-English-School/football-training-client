import React from "react";
import { Paper, Typography, Button, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Team } from "@/types/team";

export interface TeamCardProps {
  team: Team;
  onViewEdit?: (team: Team) => void;
  onDelete?: (teamId: number) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onViewEdit, onDelete }) => {
  return (
    <Paper
      sx={{
        p: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",

        width: { xs: "100%", sm: 250 },
        minHeight: { xs: 180, sm: 165 },
        maxHeight: { xs: "auto", sm: 220 },
      }}
    >
      {/* Delete Button */}
      {onDelete && (
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => onDelete(team.id)}
        >
          <DeleteIcon />
        </IconButton>
      )}

      {/* Team Info */}
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
            whiteSpace: { xs: "normal", sm: "nowrap" },
          }}
        >
          {team.students?.length ?? 0}{" "}
          {team.students?.length === 1 ? "player" : "players"}
        </Typography>
      </Box>

      {/* View/Edit Button */}
      {onViewEdit && (
        <Button
          onClick={() => onViewEdit(team)}
          variant="outlined"
          size="small"
          sx={{
            mt: 1,
            textTransform: "none",
            borderRadius: 1,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          View/Edit
        </Button>
      )}
    </Paper>
  );
};

export default TeamCard;
