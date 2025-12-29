import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import StatusChip from "../../components/common/StatusChip";
import CommonTable from "../../components/common/Table/CommonTable";
import PageLoader from "../../components/common/PageLoader";
import {
  BodyCell,
  StyledTableRow,
  TableWrapper,
} from "../../components/common/Table/table.styles";

const PRIMARY_BLUE = "#1b2f74";
const ACCENT_RED = "#ff0000";

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/admin/freelancers");
        setFreelancers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching freelancers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  const columns = [
    "S.No",
    "Name",
    "Email",
    "Phone",
    "Created At",
    "Status",
    "Actions",
  ];

  if (loading) {
    return <PageLoader message="Loading Freelancers..." />;
  }
  if (!freelancers)
    return <Typography sx={{ p: 4 }}>Freelancer not found.</Typography>;

  
  return (
    <Box p={1}>
      {/* Header with Breadcrumbs and Gradient Title */}
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
          Freelancer Requests
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review and manage freelancer profiles and system access.
        </Typography>
      </Box>

      {/* Table Container */}
      <Paper elevation={0}>
  <Box
    sx={{
      width: "100%",
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
    }}
  >
    {/* Force table width so scroll appears on mobile */}
    <Box sx={{ minWidth: 1000 }}>
      <TableWrapper>
        <CommonTable
          columns={columns}
          rows={freelancers}
          renderRow={(f, index) => (
            <StyledTableRow key={f._id || index}>
              <BodyCell sx={{ fontWeight: 700, color: PRIMARY_BLUE }}>
                {String(index + 1).padStart(2)}
              </BodyCell>

              <BodyCell sx={{ fontWeight: 500, color: "#1e293b" }}>
                {f.firstName} {f.lastName}
              </BodyCell>

              <BodyCell>{f.email}</BodyCell>

              <BodyCell>{f.phoneNumber || "N/A"}</BodyCell>

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
                  {new Date(f.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Box>
              </BodyCell>

              <BodyCell>
                <StatusChip status={f.status} />
              </BodyCell>

              <BodyCell>
                <IconButton
                  size="small"
                  sx={{
                    color: PRIMARY_BLUE,
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.08)",
                      color: ACCENT_RED,
                    },
                  }}
                  onClick={() =>
                    navigate(`/requests/freelancers/${f._id}`)
                  }
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </BodyCell>
            </StyledTableRow>
          )}
        />
      </TableWrapper>
    </Box>
  </Box>
</Paper>


      {/* DETAILS MODAL */}
      {selectedFreelancer && (
        <FreelancerDetailsModal
          open={!!selectedFreelancer}
          onClose={() => setSelectedFreelancer(null)}
          freelancer={selectedFreelancer}
        />
      )}
    </Box>
  );
};

export default Freelancers;
