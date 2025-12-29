// import React, { useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   List,
//   Chip,
//   Tooltip,
// } from "@mui/material";
// import {
//   Edit,
//   Block,
//   Visibility,
//   PersonAdd,
//   PeopleAltOutlined,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// import CommonTable from "../../components/common/Table/CommonTable";
// import {
//   BodyCell,
//   StyledTableRow,
// } from "../../components/common/Table/table.styles";

// /* ---------------- Dummy Data ---------------- */
// const initialUsers = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.d@company.com",
//     role: "Super Admin",
//     status: "Active",
//     permissions: {
//       Dashboard: ["view"],
//       Category: ["view", "add", "edit", "delete"],
//       Subcategory: ["view", "add", "edit", "delete"],
//       Projects: ["view", "add", "edit", "delete"],
//       Users: ["view", "ban"],
//     },
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.s@company.com",
//     role: "Project Editor",
//     status: "Active",
//     permissions: {
//       Dashboard: ["view"],
//       Projects: ["view", "edit"],
//     },
//   },
//   {
//     id: 3,
//     name: "Alex Johnson",
//     email: "alex.j@company.com",
//     role: "Banned User",
//     status: "Banned",
//     permissions: {
//       Dashboard: ["view"],
//     },
//   },
//   {
//     id: 4,
//     name: "Chris Lee",
//     email: "chris.l@company.com",
//     role: "Guest Viewer",
//     status: "Inactive",
//     permissions: {
//       Dashboard: ["view"],
//     },
//   },
// ];

// /* ---------------- Colors ---------------- */
// const PRIMARY_CUSTOM_COLOR = "#1b2f74";

// /* ---------------- Status Chip ---------------- */
// const StatusChip = ({ status }) => {
//   const map = {
//     Active: { color: "success", variant: "outlined" },
//     Banned: { color: "error", variant: "contained" },
//     Inactive: { color: "default", variant: "outlined" },
//   };

//   const cfg = map[status] || map.Inactive;

//   return (
//     <Chip
//       label={status}
//       color={cfg.color}
//       variant={cfg.variant}
//       size="small"
//       sx={{ fontWeight: 600, minWidth: 80 }}
//     />
//   );
// };

// export default function UserListPage() {
//   const navigate = useNavigate();

//   const [users] = useState(initialUsers);
//   const [openPerm, setOpenPerm] = useState(false);
//   const [selectedPerm, setSelectedPerm] = useState(null);

//   const handleViewPermissions = (user) => {
//     setSelectedPerm(user);
//     setOpenPerm(true);
//   };

//   const tableHeaders = ["S.No", "User", "Role", "Status", "Actions"];

//   /* ---------------- Row Renderer ---------------- */
//   const renderRow = (user, index) => (
//     <StyledTableRow key={user.id}>
//       <BodyCell align="center">{index + 1}</BodyCell>

//       <BodyCell>
//         <Typography fontWeight={600} color={PRIMARY_CUSTOM_COLOR}>
//           {user.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {user.email}
//         </Typography>
//       </BodyCell>

//       <BodyCell align="center">
//         <Chip label={user.role} size="small" variant="outlined" />
//       </BodyCell>

//       <BodyCell align="center">
//         <StatusChip status={user.status} />
//       </BodyCell>

//       <BodyCell align="center">
//         <Tooltip title="View Permissions">
//           <IconButton onClick={() => handleViewPermissions(user)} color="info">
//             <Visibility />
//           </IconButton>
//         </Tooltip>

//         <Tooltip title="Edit User">
//           <IconButton color="warning">
//             <Edit />
//           </IconButton>
//         </Tooltip>

//         <Tooltip title="Ban / Unban">
//           <IconButton color="error">
//             <Block />
//           </IconButton>
//         </Tooltip>
//       </BodyCell>
//     </StyledTableRow>
//   );

//   return (
//     <Container maxWidth="xl" sx={{ p: { xs: 2, md: 5 } }}>
//       {/* Header */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//       >
//         <Box display="flex" alignItems="center">
//           <PeopleAltOutlined
//             sx={{ fontSize: 32, mr: 1.5, color: PRIMARY_CUSTOM_COLOR }}
//           />
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 800,
//               //   letterSpacing: 1.5,
//               textTransform: "uppercase",
//               color: PRIMARY_CUSTOM_COLOR,
//             }}
//           >
//             System Users
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={<PersonAdd />}
//           sx={{ bgcolor: PRIMARY_CUSTOM_COLOR }}
//           onClick={() => navigate("/roleManagement/add-staff")}
//         >
//           Add New User
//         </Button>
//       </Box>

//       {/* Common Table */}
//       <CommonTable
//         columns={tableHeaders}
//         rows={users}
//         renderRow={renderRow}
//         loading={false}
//       />

//       {/* Permissions Dialog */}
//       <Dialog
//         open={openPerm}
//         onClose={() => setOpenPerm(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle sx={{ bgcolor: PRIMARY_CUSTOM_COLOR, color: "#fff" }}>
//           Permissions for: {selectedPerm?.role}
//         </DialogTitle>

//         <DialogContent dividers>
//           {selectedPerm ? (
//             <List disablePadding>
//               {Object.entries(selectedPerm.permissions).map(
//                 ([module, actions]) => (
//                   <Box
//                     key={module}
//                     sx={{
//                       p: 1.5,
//                       mb: 1.5,
//                       border: "1px solid #e0e0e0",
//                       borderRadius: 2,
//                     }}
//                   >
//                     <Typography fontWeight={700} color={PRIMARY_CUSTOM_COLOR}>
//                       {module}
//                     </Typography>
//                     <Typography variant="body2">
//                       Actions: {actions.join(", ")}
//                     </Typography>
//                   </Box>
//                 )
//               )}
//             </List>
//           ) : (
//             <Typography>No permissions assigned</Typography>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Container>
//   );
// }

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Divider,
  CircularProgress,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

// Colors
const PRIMARY_CUSTOM_COLOR = "#1b2f74";
const ACCENT_CUSTOM_COLOR = "#ff0000";
const FIXED_HEADER_COLOR = "#1b2f74";
const VIEW_ICON_COLOR = "#ff0000";

// Permissions list (unchanged)
const PERMISSIONS = [
  { module: "Dashboard", actions: ["view"] },

  {
    module: "Admin",
    actions: [
      "Dashboard",
      "Chart Deposit Withdraw",
      "Chart Transaction",
      "Notifications",
      "Notifications Read",
      "Notifications Read All",
      "Notifications Delete All",
      "Notifications Delete Single",
      "Request Report",
      "Report Submit",
      "Download Attachment",
      "Chat Store",
    ],
  },

  {
    module: "Staff",
    actions: ["Staff Index", " Staff Save", " Staff Status", " Staff Login"],
  },

  {
    module: "Roles",
    actions: ["Roles Index", " Roles Add", "Roles Edit", "Roles Save"],
  },

  {
    module: "Category",
    actions: ["Category Index", "Category Store", "Category Status"],
  },
  {
    module: "Subcategory",
    actions: ["Subcategory Index", "Subcategory Store", "Subcategory Status"],
  },

  {
    module: "Manage Users",
    actions: [
      "Users All",
      "Users Active",
      " Users Banned",
      "Users Email Verified",
      "Notifications Read",
      "Users Email Unverified",
      "Users Mobile Unverified",
      "Users Kyc Unverified",
      "Users Kyc Pending",
      " Users Mobile Verified",
      "Users With Balance",
      "Users Detail",
      "Users Kyc Details",
      " Users Kyc Approve",
      "Users Kyc Reject",
      "Users Update",
      " Users Add Sub Balance",
      "Users Notification Single",
      "Users Notification Single",
      "Users Login",
      "Users Status",
      " Users Notification All",
      "Users Notification All Send",
      "Users List",
      "Users Segment Count",
      "Users Notification Log",
    ],
  },

  {
    module: "Subscriber",
    actions: [
      "Subscriber Index",
      "Subscriber Send Email",
      " Subscriber Remove",
      "Subscriber Send Email",
    ],
  },

  { module: "Projects", actions: ["view", "add", "edit", "delete"] },
  {
    module: "Feature",
    actions: ["Feature Index", " Feature Store", " Feature Status"],
  },

  {
    module: "Advertisement",
    actions: [
      "Advertisement Index",
      "Advertisement Store ",
      " Advertisement Remove",
    ],
  },

  { module: "Level", actions: [" Level Index", "Level Store", "Level Status"] },

  {
    module: "Coupon",
    actions: [" Coupon Index", "Coupon Store", "Coupon Status"],
  },

  {
    module: "ManageService",
    actions: [
      " Service All",
      "Service Pending",
      "Service Approved",
      "Service Canceled",
      "Service Closed",
      "Service Status Change",
      "Service Featured Status Change",
      "Service Details",
      "Service Win Seller",
      "Service Win Buyer",
      "Booking Service Pending",
      "Booking Service All",
      "Booking Service Completed",
      " Booking Service Delivered",
      "Booking Service Inprogress",
      "Booking Service Disputed",
      "Booking Service Refunded",
      "Booking Service Expired",
      "Booking Service Details",
    ],
  },

  {
    module: "ManageJob",
    actions: [
      "Job Pending",
      " Job Approved",
      "Job Canceled",
      "Job Closed",
      "Job All",
      "Job Status Change",
      "Job Details",
      " Job Bidding List",
      "Job Win Bidder",
      "Job Win Buyer",
      "Job Featured",
      "Hiring Job All",
      "Hiring Job Pending",
      "Hiring Job Completed",
      "Hiring Job Delivered",
      "Hiring Job Inprogress",
      "Hiring Job Disputed",
      "Hiring Job Canceled",
      "Hiring Job Expired",
      "Hiring Job Details",
    ],
  },

  {
    module: "ManageSoftware",
    actions: [
      "Software Pending",
      "Software Approved",
      "Software Canceled",
      " Software Closed",
      "Software All",
      "Software Status Change",
      "Software Details",
      "Software Featured",
      "Sales Software Log",
    ],
  },

  {
    module: "AutomaticGateway",
    actions: [
      "Gateway Automatic Index",
      "Gateway Automatic Edit",
      "Gateway Automatic Update",
      "Gateway Automatic Remove",
      "Gateway Automatic Status",
    ],
  },

  {
    module: "ManualGateway",
    actions: [
      "Gateway Manual  Index",
      " Gateway Manual Create",
      "Gateway Manual Store",
      "Gateway Manual Edit",
      "Gateway Manual Update",
      "Gateway Manual Status",
    ],
  },

  {
    module: "Deposit",
    actions: [
      "Deposit List",
      " Deposit Pending",
      "Deposit Rejected",
      "Deposit Approved",
      " Deposit Successful",
      "Deposit Initiated",
      "Deposit Details",
      "Deposit Reject",
      "Deposit Approve",
    ],
  },

  {
    module: "Withdrawal",
    actions: [
      "Withdraw Data Pending",
      "Withdraw Data Approved",
      "Withdraw Data Rejected",
      "Withdraw Data All",
      "Withdraw Data Details",
      "Withdraw Data Approve",
      "Withdraw Data Reject",
    ],
  },

  {
    module: "WithdrawMethod",
    actions: [
      "Withdraw Method Index",
      "Withdraw Method Create",
      " Withdraw Method Store",
      "Withdraw Method Edit",
      "Withdraw Method Update",
      "Withdraw Method Status",
    ],
  },

  {
    module: "Report",
    actions: [
      " Report Transaction",
      "Report Login History",
      "Report Login IpHistory",
      " Report Notification History",
      "Report Email Details",
    ],
  },

  { module: "Clients", actions: ["view", "add", "edit", "delete"] },
  { module: "Freelancers", actions: ["view", "add", "edit", "delete"] },
  { module: "Organizations", actions: ["view", "add", "edit", "delete"] },
  { module: "Payments", actions: ["view", "ban"] },

  {
    module: "Support Tickets",
    actions: [
      "Ticket Index",
      "Ticket Pending",
      "Ticket Closed",
      "Ticket Answered",
      " Ticket View",
      "Ticket Reply",
      "Ticket Close",
      "Ticket Download",
      "Ticket Delete",
    ],
  },

  {
    module: "Language",
    actions: [
      "Language Manage",
      "Language Manage Store",
      "Language Manage Delete",
      "Language Manage Update",
      "Language Key",
      "Language Import Lang",
      "Language Store Key",
      "Language Delete Key",
      "Language Update Key",
      "Language Get Key",
    ],
  },

  { module: "CMS Settings", actions: ["view", "add", "edit", "delete"] },

  {
    module: "GeneralSetting",
    actions: [
      "Setting System",
      "Setting General",
      "Setting General Update",
      "Setting Socialite Credentials",
      "Setting Socialite Credentials Update",
      "Setting Socialite Credentials Status Upd",
      "Setting System Configuration",
      "Setting System Configuration Update",
      "Setting Logo Icon",
      " Setting Custom Css",
      "Setting Custom Css Submit",
      " Setting Sitemap",
      "Setting Sitemap Update",
      "Setting Robot",
      "Setting Robot Update",
      "Setting Cookie",
      "Setting Cookie Update",
      " Maintenance Mode",
      " Maintenance Mode Update",
    ],
  },

  { module: "KYC", actions: ["Kyc Setting", "Kyc Setting Update"] },

  {
    module: "Notification",
    actions: [
      "Setting Notification Global Email",
      "Setting Notification Global Email Update",
      "Setting Notification Global Sms",
      "Setting Notification Global Sms Update",
      "Setting Notification Global Push",
      "Setting Notification Global Push Update",
      "Setting Notification Templates",
      "Setting Notification Template Edit",
      " Setting Notification Template Update",
      " Setting Notification Email",
      "Setting Notification Email Update",
      "Setting Notification Email Test",
      " Setting Notification Sms",
      "Setting Notification Sms Update",
      "Setting Notification Sms Update",
      " Setting Notification Push",
      "Setting Notification Push Update",
    ],
  },

  {
    module: "System",
    actions: [
      "System Info",
      "System Server Info",
      "System Optimize",
      "System Optimize Clear",
      "System Update",
      "System Update Process",
      "System Update Log",
    ],
  },
];

export default function AddRolePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const gradientStyle = {
    fontWeight: 800,
    background: `linear-gradient(45deg, ${FIXED_HEADER_COLOR} 30%, ${VIEW_ICON_COLOR} 90%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: isMobile ? 1 : 1.5,
    textTransform: "uppercase",
  };

  const isModuleSelected = (module) => {
    const moduleData = PERMISSIONS.find((p) => p.module === module);
    if (!moduleData) return false;
    return (permissions[module] || []).length === moduleData.actions.length;
  };

  const handleSelectAllChange = (module, actions) => {
    setPermissions((prev) =>
      isModuleSelected(module)
        ? Object.fromEntries(Object.entries(prev).filter(([k]) => k !== module))
        : { ...prev, [module]: actions }
    );
  };

  const handlePermissionChange = (module, action) => {
    setPermissions((prev) => {
      const list = prev[module] || [];
      if (list.includes(action)) {
        const updated = list.filter((a) => a !== action);
        if (!updated.length) {
          const { [module]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [module]: updated };
      }
      return { ...prev, [module]: [...list, action] };
    });
  };

  const handleSubmit = () => {
    if (!roleName) return alert("Role name required");
    setSubmitting(true);

    setTimeout(() => {
      console.log({ roleName, permissions });
      setSubmitting(false);
      navigate("/access/roles");
    }, 1500);
  };

  return (
    <Container maxWidth="lg" sx={{ p: { xs: 2, md: 5 } }}>
      <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <AddModeratorIcon
            sx={{ fontSize: 36, mr: 1, color: PRIMARY_CUSTOM_COLOR }}
          />
          <Typography variant="h5" sx={gradientStyle}>
            Create New Access Role
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <TextField
          fullWidth
          label="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Box display="flex" flexDirection="column" gap={3}>
          {PERMISSIONS.map((perm) => (
            <Paper
              key={perm.module}
              sx={{
                p: 3,
                borderLeft: `5px solid ${PRIMARY_CUSTOM_COLOR}`,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Typography
                    fontWeight={700}
                    mb={2}
                    color={PRIMARY_CUSTOM_COLOR}
                  >
                    {perm.module}
                  </Typography>
                  <Button
                    size="small"
                    variant={
                      isModuleSelected(perm.module) ? "contained" : "outlined"
                    }
                    sx={{
                      ...(isModuleSelected(perm.module)
                        ? { bgcolor: ACCENT_CUSTOM_COLOR }
                        : {
                            color: ACCENT_CUSTOM_COLOR,
                            borderColor: ACCENT_CUSTOM_COLOR,
                          }),
                    }}
                    onClick={() =>
                      handleSelectAllChange(perm.module, perm.actions)
                    }
                  >
                    {isModuleSelected(perm.module)
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Box display="flex" flexWrap="wrap">
                    {perm.actions.map((action) => (
                      <FormControlLabel
                        key={action}
                        control={
                          <Checkbox
                            checked={(permissions[perm.module] || []).includes(
                              action
                            )}
                            onChange={() =>
                              handlePermissionChange(perm.module, action)
                            }
                          />
                        }
                        label={action}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box display="flex" justifyContent="flex-end">
          <Button onClick={() => navigate("/access/roles")} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: PRIMARY_CUSTOM_COLOR }}
            disabled={submitting || !roleName}
            onClick={handleSubmit}
            startIcon={
              submitting && <CircularProgress size={20} color="inherit" />
            }
          >
            {submitting ? "Saving..." : "Add Role"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
