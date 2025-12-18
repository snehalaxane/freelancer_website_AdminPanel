import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const PageLoader = ({ message = "Loading data..." }) => {
  return (
    <Box
      sx={{
        position: "fixed", // Stays in place even if you scroll
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Perfect mathematical center
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CircularProgress size={50} sx={{ color: "#1b2f74", mb: 2 }} />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontWeight: 600 }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default PageLoader;
