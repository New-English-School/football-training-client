"use client";

import { Box, Paper, Typography, Button } from "@mui/material";
import theme from "@/theme/theme";
import { Team } from "@/types/team";

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Paper
      sx={{
        p: theme.spacing(4),
        maxWidth: 300,
        borderRadius: theme.spacing(2),
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: theme.spacing(1),
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {team.name}
        </Typography>

        <Typography sx={{ color: theme.palette.text.secondary }}>
          {team.students?.length ?? 0}{" "}
          {team.students?.length === 1 ? "player" : "players"}
        </Typography>
      </Box>

      <Button
        variant="outlined"
        size="small"
        sx={{
          mt: theme.spacing(3),
          alignSelf: "flex-start",
          textTransform: "none",
          borderRadius: theme.spacing(1.5),
        }}
      >
        View/Edit
      </Button>
    </Paper>
  );
};

export default TeamCard;
