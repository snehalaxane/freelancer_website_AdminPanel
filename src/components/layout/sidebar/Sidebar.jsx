import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Tooltip,
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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";

const ACCENT_RED = "#ff0000";

const Sidebar = ({
  drawerWidth,
  isOpen,
  collapsedWidth,
  mobileOpen,
  handleMobileClose,
  variant,
}) => {
  const width =
    variant === "temporary"
      ? drawerWidth
      : isOpen
      ? drawerWidth
      : collapsedWidth;
  const { pathname } = useLocation();
  const [openMenus, setOpenMenus] = useState(null);

  const handleToggle = (text) => {
    setOpenMenus((prev) => (prev === text ? null : text));
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Active Users",
      icon: <GroupIcon />,
      subItems: [
        { text: "Clients", path: "/users/clients" },
        { text: "Freelancers", path: "/users/freelancers" },
        { text: "Organizations", path: "/users/organization" },
      ],
    },
    {
      text: "User Requests",
      icon: <DescriptionOutlinedIcon />,
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
      text: "Project Request",
      icon: <AssignmentLateIcon />,
      subItems: [
        { text: "Pending", path: "/projects/pending" },
        { text: "Approved", path: "/projects/approved" },
        { text: "Rejected", path: "/projects/rejected" },
        { text: "Closed", path: "/projects/closed" },
      ],
    },

    {
      text: "Access Control",
      icon: <AdminPanelSettingsIcon />,
      subItems: [
        { text: "Roles", path: "/roleManagement/roles" },
        { text: "All Staff", path: "/roleManagement/add-staff" },
      ],
    },

    {
      text: "Support Tickets",
      icon: <AdminPanelSettingsIcon />,
      subItems: [
        { text: "Pending Tickets", path: "/pendingtickets" },
        { text: "Closed Tickets", path: "/closedtickets" },
        { text: "Answered Tickets", path: "/answeredtickets" },
        { text: "All Tickets", path: "/alltickets" },
      ],
    },

    {
      text: "Skills",
      icon: <AutoFixHighIcon />,
      subItems: [
        { text: "Category", path: "/categories" },
        { text: "Subcategory", path: "/subcategories" },
      ],
    },

    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <StyledDrawer
      variant={variant}
      open={variant === "temporary" ? mobileOpen : true}
      onClose={handleMobileClose}
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          transition: "width 0.3s",
        },
      }}
    >
      <LogoSection>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: isOpen ? "100%" : 40, transition: "width 0.3s" }}
        />
      </LogoSection>

      <List sx={{ pt: 0 }}>
        {menuItems.map((item) => {
          const hasSub = !!item.subItems;
          const isOpenMenu = openMenus === item.text;
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
                  accentcolor="#ff0000"
                  onClick={hasSub ? () => handleToggle(item.text) : undefined}
                  sx={{
                    justifyContent: isOpen ? "initial" : "center",
                    px: isOpen ? 1 : 0,
                  }}
                >
                  <Box
                    className="MuiListItemIcon-root"
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 2 : 0,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                  {isOpen && <ListItemText primary={item.text} />}
                  {hasSub && isOpen && (
                    <Box sx={{ display: "flex", opacity: 0.5 }}>
                      {isOpenMenu ? (
                        <ExpandLess fontSize="small" />
                      ) : (
                        <ExpandMore fontSize="small" />
                      )}
                    </Box>
                  )}
                </NavButton>
              </ListItem>

              {hasSub && (
                <Collapse
                  in={isOpenMenu && isOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding sx={{ pb: 1 }}>
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.path;
                      return (
                        <SubNavButton
                          key={sub.text}
                          component={NavLink}
                          to={sub.path}
                          active={isSubActive ? 1 : 0}
                          accentcolor="#ff0000"
                          sx={{
                            justifyContent: isOpen ? "initial" : "center",
                            px: isOpen ? 0 : 0,
                          }}
                        >
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: 6,
                              mr: isOpen ? 2 : 0,
                              color: isSubActive
                                ? "#ff0000"
                                : "rgba(255,255,255,0.3)",
                            }}
                          />
                          {isOpen && <ListItemText primary={sub.text} />}
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
          p: isOpen ? 3 : 1,
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {isOpen && (
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
        )}
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
