import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  Chip,
  Breadcrumbs,
  Link,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Block,
  Visibility,
  PersonAdd,
  PeopleAltOutlined,
} from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

import CommonTable from "../../components/common/Table/CommonTable";
import StatusChip from "../../components/common/StatusChip";

import {
  BodyCell,
  StyledTableRow,
} from "../../components/common/Table/table.styles";

/* ---------------- Dummy Data ---------------- */
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.d@company.com",
    role: "Super Admin",
    status: "Active",
    permissions: {
      Dashboard: ["view"],
      Category: ["view", "add", "edit", "delete"],
      Subcategory: ["view", "add", "edit", "delete"],
      Projects: ["view", "add", "edit", "delete"],
      Users: ["view", "block"],
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.s@company.com",
    role: "Project Editor",
    status: "Active",
    permissions: {
      Dashboard: ["view"],
      Projects: ["view", "edit"],
    },
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex.j@company.com",
    role: "Blocked User",
    status: "Blocked",
    permissions: {
      Dashboard: ["view"],
    },
  },
  {
    id: 4,
    name: "Chris Lee",
    email: "chris.l@company.com",
    role: "Guest Viewer",
    status: "Inactive",
    permissions: {
      Dashboard: ["view"],
    },
  },
];

/* ---------------- Colors ---------------- */
const PRIMARY_CUSTOM_COLOR = "#1b2f74";

/* ---------------- Status Chip ---------------- */

export default function UserListPage() {
  // const navigate = useNavigate();

  const [users] = useState(initialUsers);
  const [openPerm, setOpenPerm] = useState(false);
  const [selectedPerm, setSelectedPerm] = useState(null);

  const handleViewPermissions = (user) => {
    setSelectedPerm(user);
    setOpenPerm(true);
  };

  const tableHeaders = ["S.No", "User", "Role", "Status", "Actions"];

  /* ---------------- Row Renderer ---------------- */
  const renderRow = (user, index) => (
    <StyledTableRow key={user.id}>
      <BodyCell align="center">{index + 1}</BodyCell>

      <BodyCell>
        <Typography fontWeight={600} color={PRIMARY_CUSTOM_COLOR}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </BodyCell>

      <BodyCell align="center">
        <Chip label={user.role} size="small" variant="outlined" />
      </BodyCell>

      <BodyCell align="center">
        <StatusChip status={user.status} />
      </BodyCell>

      <BodyCell align="center">
        <Tooltip title="View Permissions">
          <IconButton onClick={() => handleViewPermissions(user)} color="info">
            <Visibility />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit User">
          <IconButton color="warning">
            <Edit />
          </IconButton>
        </Tooltip>

        <Tooltip title="Block / Unblock">
          <IconButton color="error">
            <Block />
          </IconButton>
        </Tooltip>
      </BodyCell>
    </StyledTableRow>
  );

  return (
    <Container maxWidth="s" sx={{ p: { xs: 5, md: 1 } }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // mb={1}
      >
        <Box display="flex" alignItems="center">
          {/* <PeopleAltOutlined
            sx={{ fontSize: 32, mr: 1, color: PRIMARY_CUSTOM_COLOR }}
          /> */}

          <Box mb={3}>
            <Breadcrumbs sx={{ mb: 1, fontSize: "0.9rem" }}>
              <Link underline="hover" color="inherit" href="/dashboard">
                Dashboard
              </Link>
              <Typography color="text.primary" sx={{ fontSize: "0.9rem" }}>
                User Requests
              </Typography>
            </Breadcrumbs>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "linear-gradient(45deg, #1b2f74 30%, #ff0000 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                mb: 1,
              }}
            >
              System Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Review and manage staff and system access.
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          sx={{ bgcolor: PRIMARY_CUSTOM_COLOR }}
          // onClick={() => navigate("/roleManagement/roles")}
        >
          Add New User
        </Button>
      </Box>

      {/* Common Table */}
      <CommonTable
        columns={tableHeaders}
        rows={users}
        renderRow={renderRow}
        loading={false}
      />

      {/* Permissions Dialog */}
      <Dialog
        open={openPerm}
        onClose={() => setOpenPerm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: PRIMARY_CUSTOM_COLOR, color: "#fff" }}>
          Permissions for: {selectedPerm?.role}
        </DialogTitle>

        <DialogContent dividers>
          {selectedPerm ? (
            <List disablePadding>
              {Object.entries(selectedPerm.permissions).map(
                ([module, actions]) => (
                  <Box
                    key={module}
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                    }}
                  >
                    <Typography fontWeight={700} color={PRIMARY_CUSTOM_COLOR}>
                      {module}
                    </Typography>
                    <Typography variant="body2">
                      Actions: {actions.join(", ")}
                    </Typography>
                  </Box>
                )
              )}
            </List>
          ) : (
            <Typography>No permissions assigned</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
