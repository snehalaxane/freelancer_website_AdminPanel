import React from "react";
import { Chip } from "@mui/material";

const colorMap = {
  inactive: { bg: "#f1f5f9", text: "#64748b", label: "Inactive" },
  approved: { bg: "#ecfdf5", text: "#059669", label: "Approved" },
  rejected: { bg: "#fef2f2", text: "#dc2626", label: "Rejected" },
  blocked: { bg: "#fff7ed", text: "#ea580c", label: "Blocked" },
  pending: { bg: "#fefce8", text: "#ca8a04", label: "Pending" },
};

const StatusChip = ({ status, sx = {} }) => {
  const config = colorMap[status?.toLowerCase()] || colorMap.inactive;

  return (
    <Chip
      label={config.label}
      sx={{
        backgroundColor: config.bg,
        color: config.text,
        fontWeight: 700,
        borderRadius: "6px",
        textTransform: "uppercase",
        fontSize: "0.75rem",
        ...sx, // Allows you to override styles if needed
      }}
    />
  );
};

export default StatusChip;
