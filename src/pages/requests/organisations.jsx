import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import StatusChip from "../../components/common/StatusChip";
import PageLoader from "../../components/common/PageLoader"; // Adjust path as needed
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Import your CommonTable and Styled Components
import CommonTable from "../../components/common/Table/CommonTable"; // Adjust path as needed
import {
  BodyCell,
  StyledTableRow,
} from "../../components/common/Table/table.styles"; // Adjust path as needed

const Organisations = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // 1. Define Table Columns
  const columns = [
    "S.No",
    "Logo",
    "Company Name",
    "Contact Person",
    "Status",
    "Actions",
  ];

  // 2. Fetch Data
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true); // Ensure loading starts as true
        const res = await axiosInstance.get("/api/admin/companies");
        setCompanies(res.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // 3. Define how to render each row
  const renderRow = (company, index) => (
    <StyledTableRow key={company._id}>
      <BodyCell sx={{ width: "60px" }}>{index + 1}</BodyCell>

      <BodyCell>
        <Box display="flex" justifyContent="center">
          <Avatar
            src={company.logoPhoto}
            variant="rounded"
            sx={{ width: 40, height: 40, border: "1px solid #e2e8f0" }}
          />
        </Box>
      </BodyCell>

      <BodyCell>
        <Typography variant="body2" fontWeight={700}>
          {company.businessName || "N/A"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {company.businessEmail}
        </Typography>
      </BodyCell>

      <BodyCell>{`${company.firstName} ${company.lastName}`}</BodyCell>

      <BodyCell>
        <StatusChip status={company.status} />
      </BodyCell>

      <BodyCell>
        <Tooltip title="View Full Details">
          <IconButton
            size="small"
            onClick={() => navigate(`/requests/organisations/${company._id}`)}
            sx={{
              color: "#1b2f74",
              "&:hover": { backgroundColor: "rgba(27, 47, 116, 0.1)" },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </BodyCell>
    </StyledTableRow>
  );

  if (loading) {
    return <PageLoader message="Loading Organisations..." />;
  }

  return (
    <Box p={4} sx={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      <Box mb={3}>
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
          Organization Requests
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and verify registered company profiles
        </Typography>
      </Box>

      {/* 4. Use your CommonTable */}
      <CommonTable columns={columns} rows={companies} renderRow={renderRow} />
    </Box>
  );
};

export default Organisations;
