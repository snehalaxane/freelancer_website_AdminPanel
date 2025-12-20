import { styled, Box, Paper, TextField } from "@mui/material";

const PRIMARY_BLUE = "#1b2f74";

export const BackgroundContainer = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  background: `linear-gradient(155deg, ${PRIMARY_BLUE} 0%, #fff 200%)`,
  overflow: "hidden",
  position: "relative",
});
