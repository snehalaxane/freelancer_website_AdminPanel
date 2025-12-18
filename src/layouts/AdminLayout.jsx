import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Header from "../components/layout/header/Header";

const drawerWidth = 240;

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar drawerWidth={drawerWidth} />

      {/* Header */}
      <Header drawerWidth={drawerWidth} />

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Push content below fixed header */}
        <Toolbar />

        <Box sx={{ p: 3 }}>
          <Outlet /> {/* 👈 THIS IS THE KEY */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
