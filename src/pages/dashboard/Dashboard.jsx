// src/pages/dashboard/Dashboard.jsx
import React from "react";
import { Typography, Paper } from "@mui/material";

const Dashboard = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography mt={2}>
        Sidebar and Header should now be visible 🎉
      </Typography>
    </Paper>
  );
};

export default Dashboard;
