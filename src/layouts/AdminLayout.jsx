// import { Outlet } from "react-router-dom";
// import { Box, CssBaseline, Toolbar } from "@mui/material";
// import Sidebar from "../components/layout/sidebar/Sidebar";
// import Header from "../components/layout/header/Header";

// const drawerWidth = 240;

// const AdminLayout = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* Sidebar */}
//       <Sidebar drawerWidth={drawerWidth} />

//       {/* Header */}
//       <Header drawerWidth={drawerWidth} />

//       {/* Page Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         {/* Push content below fixed header */}
//         <Toolbar />

//         <Box sx={{ p: 3 }}>
//           <Outlet /> {/* 👈 THIS IS THE KEY */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminLayout;

import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Header from "../components/layout/header/Header";
import { useState } from "react";

const drawerWidth = 240;
const collapsedWidth = 60; // width when sidebar is collapsed

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar
        drawerWidth={drawerWidth}
        isOpen={isSidebarOpen}
        mobileOpen={mobileOpen}
        handleMobileClose={toggleMobileSidebar}
        variant={isMobile ? "temporary" : "permanent"}
        collapsedWidth={collapsedWidth}
      />

      {/* Header */}
      <Header
        drawerWidth={
          isMobile ? 0 : isSidebarOpen ? drawerWidth : collapsedWidth
        }
        toggleSidebar={isMobile ? toggleMobileSidebar : toggleSidebar}
      />

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            sm: `calc(100% - ${
              isSidebarOpen ? drawerWidth : collapsedWidth
            }px)`,
          },
          transition: "width 0.3s",
        }}
      >
        {/* Push content below fixed header */}
        <Toolbar />

        <Box sx={{ p: 3 }}>
          <Outlet /> {/* This will render dashboard pages or other routes */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
