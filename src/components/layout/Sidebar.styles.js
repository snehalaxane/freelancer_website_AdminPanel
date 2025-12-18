import {
  styled,
  Drawer,
  Box,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

const PRIMARY_BLUE = "#1b2f74";
const slotProps = {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "accentcolor",
};

export const StyledDrawer = styled(Drawer)(({ width }) => ({
  width: width,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: width,
    boxSizing: "border-box",
    backgroundColor: PRIMARY_BLUE,
    color: "hsla(0, 0%, 100%, 1.00)",
    borderRight: "none",
    overflowY: "auto", // Ensure the paper is the scroll container
    boxShadow: "4px 0px 20px rgba(0,0,0,0.15)",
    "&::-webkit-scrollbar": { width: "4px" },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: "10px",
    },
  },
}));

export const LogoSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "16px 16px",
  position: "sticky",
  justifyContent: "center",
  top: 0,
  zIndex: 10, // Sits above the list items
  backgroundColor: "#1b2f74", // Match sidebar color exactly to hide scrolling text
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)", // Optional: faint line to separate
  "& img": {
    height: "85px",
    width: "auto",
    objectFit: "contain",
  },
});

export const NavButton = styled(
  ListItemButton,
  slotProps
)(({ active, accentcolor }) => ({
  borderRadius: "0 24px 24px 0",
  margin: "4px 16px 4px 0",
  padding: "12px 24px",
  transition: "all 0.25s ease-in-out",
  backgroundColor: active ? "rgba(255, 255, 255, 0.1)" : "transparent",
  borderLeft: `4px solid ${active ? accentcolor : "transparent"}`,

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    "& .MuiListItemIcon-root": {
      transform: "translateX(3px)",
    },
  },

  "& .MuiListItemIcon-root": {
    color: active ? "#ffffff" : "hsla(0, 4%, 95%, 1.00)",
    minWidth: "40px",
    transition: "all 0.2s ease-in-out",
    "& svg": {
      fontSize: "22px",
      color: active ? accentcolor : "inherit",
    },
  },

  "& .MuiListItemText-root .MuiTypography-root": {
    fontWeight: active ? 600 : 600,
    letterSpacing: 0.5,
    fontSize: "0.890rem",
    color: active ? "#ffffff" : "inherit",
  },
}));

export const SubNavButton = styled(
  ListItemButton,
  slotProps
)(({ active, accentcolor }) => ({
  borderRadius: "8px",
  margin: "2px 20px 2px 48px",
  padding: "8px 16px",
  transition: "all 0.2s ease",
  backgroundColor: active ? "rgba(255, 255, 255, 0.03)" : "transparent",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    "& .MuiTypography-root": { color: "#ffffff" },
  },

  "& .MuiTypography-root": {
    fontSize: "0.890rem",
    letterSpacing: 0.5,
    fontWeight: active ? 600 : 600,
    color: active ? accentcolor : "hsla(0, 0%, 100%, 1.00)",
  },
}));
