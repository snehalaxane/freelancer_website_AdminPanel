import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Import your Styled Components
import {
  StyledDrawer,
  LogoSection,
  NavButton,
  SubNavButton,
} from "../Sidebar.styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";

const ACCENT_RED = "#ff0000";

const Sidebar = ({ drawerWidth }) => {
  const { pathname } = useLocation();
  const [openMenus, setOpenMenus] = useState(null);

  const handleToggle = (text) => {
    setOpenMenus((prev) => (prev === text ? null : text));
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Users",
      icon: <GroupIcon />,
      subItems: [
        { text: "Clients", path: "/users/clients" },
        { text: "Freelancers", path: "/users/freelancers" },
        { text: "Organizations", path: "/users/organization" },
      ],
    },
    {
      text: "User Requests",
      icon: <AssignmentLateIcon />,
      subItems: [
        { text: "Pending Freelancers", path: "/requests/freelancers" },
        { text: "Rejected Freelancers", path: "/rejected/freelancers" },
        { text: "Blocked Freelancers", path: "/blocked/freelancers" },

        { text: "Pending Organizations", path: "/requests/organisations" },
        { text: "Rejected Organizations", path: "/rejected/organisations" },
        { text: "Blocked Organizations", path: "/blocked/organisations" },
      
      ],
    },

    {
      text: "Project Requests",
      icon: <AssignmentLateIcon />,
      subItems: [
        { text: "Pending", path: "/projects/pending" },
        { text: "Approved", path: "/projects/approved" },
        { text: "Rejected", path: "/projects/rejected" },
        { text: "Closed", path: "/projects/closed" },
      ],
    },

    {
      text: "Skills",
      icon: <AutoFixHighIcon />,
      subItems: [
        { text: "Category", path: "/users/category" },
        { text: "Subcategory", path: "/users/subcategory" },
      ],
    },
    {
      text: "Access Control",
      icon: <AdminPanelSettingsIcon />,
      subItems: [{ text: "Roles", path: "/role/roles" }],
    },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <StyledDrawer variant="permanent" width={drawerWidth}>
      <LogoSection>
        <img src="/logo.png" alt="Logo" />
      </LogoSection>

      <List sx={{ pt: 0 }}>
        {menuItems.map((item) => {
          const hasSub = !!item.subItems;
          const isOpen = openMenus === item.text;
          const isActive =
            pathname === item.path ||
            (hasSub && item.subItems.some((s) => s.path === pathname));

          return (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <NavButton
                  component={hasSub ? "div" : NavLink}
                  to={hasSub ? undefined : item.path}
                  active={isActive ? 1 : 0}
                  accentcolor={ACCENT_RED}
                  onClick={hasSub ? () => handleToggle(item.text) : undefined}
                >
                  <Box className="MuiListItemIcon-root">{item.icon}</Box>
                  <ListItemText primary={item.text} />
                  {hasSub && (
                    <Box sx={{ display: "flex", opacity: 0.5 }}>
                      {isOpen ? (
                        <ExpandLess fontSize="small" />
                      ) : (
                        <ExpandMore fontSize="small" />
                      )}
                    </Box>
                  )}
                </NavButton>
              </ListItem>

              {hasSub && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pb: 1 }}>
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.path;
                      return (
                        <SubNavButton
                          key={sub.text}
                          component={NavLink}
                          to={sub.path}
                          active={isSubActive ? 1 : 0}
                          accentcolor={ACCENT_RED}
                        >
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: 6,
                              mr: 2,
                              color: isSubActive
                                ? ACCENT_RED
                                : "rgba(255,255,255,0.3)",
                            }}
                          />
                          <ListItemText primary={sub.text} />
                        </SubNavButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>

      <Box
        sx={{
          mt: "auto",
          p: 3,
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          © 2025 ADMIN PORTAL
        </Typography>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
