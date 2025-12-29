import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Breadcrumbs, Link } from "@mui/material";
import axiosInstance from "../../services/axiosInstance";
import CommonTable from "../../components/common/Table/CommonTable";
import { useTheme, useMediaQuery, Divider } from "@mui/material";

import {
  BodyCell,
  StyledTableRow,
  TableWrapper,
} from "../../components/common/Table/table.styles";

const PRIMARY_BLUE = "#1b2f74";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/admin/customers");
        setClients(res.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const columns = [
    "S.No",
    "Full Name",
    "Email",
    "Phone",
    "Alt Phone",
    "Created At",
  ];

  return (
    <Box p={1}>
      {/* Header with Breadcrumbs and Gradient Title */}
      <Box mb={3}>
        <Breadcrumbs sx={{ mb: 1, fontSize: "0.9rem" }}>
          <Link underline="hover" color="inherit" href="/dashboard">
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "0.9rem" }}>
            Clients
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800, // Slightly heavier weight looks better with gradients
            letterSpacing: "-0.02em",

            // Gradient Logic
            background: "linear-gradient(45deg, #1b2f74 30%, #ff0000 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",

            // Smooth rendering
            display: "inline-block",
            mb: 1,
          }}
        >
          Clients
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and view all registered client details.
        </Typography>
      </Box>

      {/* Table Section */}
      <Paper elevation={0}>
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Box sx={{ minWidth: 900 }}>
            <TableWrapper>
              <CommonTable
                columns={columns}
                rows={clients}
                renderRow={(client, index) => (
                  <StyledTableRow key={client._id || index}>
                    <BodyCell sx={{ fontWeight: 600, color: PRIMARY_BLUE }}>
                      {String(index + 1).padStart(2)}
                    </BodyCell>
                    <BodyCell sx={{ fontWeight: 500 }}>
                      {client.firstName} {client.lastName}
                    </BodyCell>
                    <BodyCell>{client.email}</BodyCell>
                    <BodyCell>{client.phoneNumber || "N/A"}</BodyCell>
                    <BodyCell sx={{ color: "text.secondary" }}>
                      {client.altPhoneNumber || "—"}
                    </BodyCell>
                    <BodyCell>
                      <Box
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "6px",
                          backgroundColor: "#f1f5f9",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {new Date(client.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </Box>
                    </BodyCell>
                  </StyledTableRow>
                )}
              />
            </TableWrapper>
          </Box>
        </Box>

        {!loading && clients.length === 0 && (
          <Box sx={{ py: 10, textAlign: "center" }}>
            <Typography color="text.secondary">No clients found.</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Clients;
