// // src/components/header/Header.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Badge, // Added for notification count
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsIcon from "@mui/icons-material/Notifications"; // Added
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// // 💡 Accept the drawerWidth as a prop
// const Header = ({ drawerWidth }) => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [adminEmail, setAdminEmail] = useState(""); // 👈 state to hold email
//   const open = Boolean(anchorEl);

//   useEffect(() => {
//     const email = localStorage.getItem("adminEmail");
//     if (email) setAdminEmail(email);
//   }, []);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     handleMenuClose();

//     // clear auth data
//     localStorage.removeItem("token"); // or clear()

//     console.log("Logging out...");
//     navigate("/login"); // 👈 REDIRECT
//   };

//   const handleProfile = () => {
//     handleMenuClose();
//     // TODO: Implement navigation to profile page
//     console.log("Viewing profile...");
//   };

//   return (
//     <AppBar
//       position="fixed" // Keep it fixed at the top
//       color="default"
//       elevation={1}
//       sx={{
//         // 1. CRITICAL: Calculate width to span AFTER the sidebar
//         width: { sm: `calc(100% - ${drawerWidth}px)` },
//         // 2. CRITICAL: Start the header AFTER the sidebar
//         ml: { sm: `${drawerWidth}px` },

//         // Remove padding from AppBar itself, use Toolbar padding
//         p: 0,
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           // Use Toolbar's default padding for better visual alignment
//         }}
//       >
//         {/* === 1. LEFT SECTION: Search Bar === */}
//         <TextField
//           variant="outlined"
//           size="small"
//           placeholder="Search..."
//           sx={{ width: 300 }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//             // Optional: Make the input look cleaner
//             sx: { bgcolor: "white", borderRadius: 1 },
//           }}
//         />

//         {/* This Box ensures the space between search and user controls */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* === 2. RIGHT SECTION: Notifications, Avatar, Name === */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {/* Notification Icon (Requested Feature) */}
//           <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
//             <Badge badgeContent={3} color="error">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>

//           {/* Avatar + Name + Dropdown (Clickable Area) */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//               p: 1, // Add padding to make the click target larger
//               borderRadius: 1,
//               "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" }, // Subtle hover effect
//             }}
//             onClick={handleMenuOpen}
//           >
//             <Avatar
//               alt="Admin"
//               src="/static/images/avatar/1.jpg"
//               sx={{ mr: 1, width: 32, height: 32 }}
//             />
//             <Typography
//               variant="subtitle1"
//               sx={{ display: { xs: "none", md: "block" } }}
//             >
//               {adminEmail || "Admin Name"} {/* 👈 show email if available */}
//             </Typography>

//             <ArrowDropDownIcon />
//           </Box>
//         </Box>

//         {/* === 3. Dropdown Menu === */}
//         <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleMenuClose}
//           // Positioning the menu relative to the anchor (Avatar box)
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//         >
//           <MenuItem onClick={handleProfile}>Profile</MenuItem>
//           <MenuItem onClick={handleLogout}>Logout</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Divider,
  ListItemIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const PRIMARY_BLUE = "#1b2f74";
const ACCENT_RED = "#ff0000";

const Header = ({ drawerWidth }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const open = Boolean(anchorEl);

  // Add scroll listener for a "glass" effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    const email = localStorage.getItem("adminEmail");
    if (email) setAdminEmail(email);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.8)" : "#ffffff",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease-in-out",
        color: "#1e293b",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
        {/* === LEFT: SEARCH BAR === */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search for anything..."
          sx={{
            width: { xs: 200, md: 350 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#f8fafc",
              transition: "all 0.2s",
              "&:hover": { backgroundColor: "#f1f5f9" },
              "&.Mui-focused": {
                backgroundColor: "#fff",
                boxShadow: "0 0 0 2px rgba(6, 3, 38, 0.1)",
              },
              "& fieldset": { border: "none" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: PRIMARY_BLUE, fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        {/* === RIGHT: ACTIONS === */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Notifications */}
          <IconButton
            sx={{
              color: "#64748b",
              backgroundColor: "#f8fafc",
              mr: 1,
              "&:hover": {
                color: ACCENT_RED,
                backgroundColor: "rgba(255, 0, 0, 0.05)",
              },
            }}
          >
            <Badge
              badgeContent={3}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: ACCENT_RED,
                  color: "white",
                },
              }}
            >
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, height: 24, alignSelf: "center" }}
          />

          {/* User Profile */}
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              p: "6px 12px",
              borderRadius: "12px",
              transition: "0.2s",
              "&:hover": { backgroundColor: "#f1f5f9" },
            }}
          >
            <Box
              sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: PRIMARY_BLUE,
                  lineHeight: 1.2,
                }}
              >
                Admin Account
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                {adminEmail || "admin@portal.com"}
              </Typography>
            </Box>

            <Avatar
              sx={{
                width: 38,
                height: 38,
                fontSize: "1rem",
                fontWeight: 600,
                bgcolor: PRIMARY_BLUE,
                border: `2px solid #fff`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {adminEmail ? adminEmail[0].toUpperCase() : "A"}
            </Avatar>
            <KeyboardArrowDownIcon sx={{ color: "#94a3b8", fontSize: 18 }} />
          </Box>
        </Box>

        {/* === PROFILE MENU === */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 200,
              mt: 1.5,
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              overflow: "visible",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 24,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={handleMenuClose}
            sx={{ py: 1.5, fontSize: "0.875rem" }}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 1.5,
              fontSize: "0.875rem",
              color: ACCENT_RED,
              "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.05)" },
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: ACCENT_RED }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
