import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import PageLoader from "../../components/common/PageLoader";
// 1. IMPORT YOUR SHARED COMPONENT
import StatusChip from "../../components/common/StatusChip";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Avatar,
  Divider,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";

/* ---------- Internal DocImage Component ---------- */
const DocImage = ({ src, label, onPreview }) => {
  if (!src) return null;
  return (
    <Card
      variant="outlined"
      onClick={() => onPreview(src, label)}
      sx={{
        borderRadius: 3,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
          borderColor: "primary.main",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="120"
          image={src}
          alt={label}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            bgcolor: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            p: 0.5,
          }}
        >
          <OpenInNewIcon sx={{ fontSize: 14, color: "#1b2f74" }} />
        </Box>
      </Box>
      <CardContent sx={{ p: 1, textAlign: "center", bgcolor: "#f8fafc" }}>
        <Typography variant="caption" fontWeight={700}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [preview, setPreview] = useState({ open: false, url: "", title: "" });

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/admin/company/${id}`);
      setCompany(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleOpenPreview = (url, title) =>
    setPreview({ open: true, url, title });
  const handleClosePreview = () => setPreview({ ...preview, open: false });

  const updateStatus = async (status) => {
    try {
      setStatusLoading(true);
      await axiosInstance.put(`/api/admin/company/${id}/status`, { status });
      fetchDetails();
    } catch (error) {
      console.error("Status update error:", error);
    } finally {
      setStatusLoading(false);
    }
  };

  // Centered Loader call
  if (loading) {
    return <PageLoader message="Loading Organisation Details..." />;
  }

  if (!company)
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>
        Organisation not found.
      </Typography>
    );

  return (
    <Box
      p={{ xs: 2, md: 4 }}
      sx={{
        backgroundColor: "#f4f7fe",
        minHeight: "100vh",
        width: "100%", // Ensures content doesn't cause horizontal overflow
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ bgcolor: "white", boxShadow: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={800} color="#1b2f74">
          Company Profile
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* LEFT COLUMN: Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, textAlign: "center" }}>
            <Avatar
              src={company.logoPhoto}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                border: "4px solid white",
                boxShadow: 3,
              }}
              variant="rounded"
            />
            <Typography variant="h6" fontWeight={700}>
              {company.firstName} {company.lastName}
            </Typography>

            {/* 2. REUSABLE STATUS CHIP USED HERE */}
            <Box mt={1} mb={1}>
              <StatusChip status={company.status} />
            </Box>

            <Typography color="text.secondary" variant="body2" gutterBottom>
              {company.businessEmail}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack textAlign="left" spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  GST Number
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {company.gstNumber || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Business Phone
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {company.businessPhone || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Website
                </Typography>
                <Typography
                  variant="body2"
                  component="a"
                  href={company.businessWebsite}
                  target="_blank"
                  color="primary"
                  sx={{ textDecoration: "none" }}
                >
                  {company.businessWebsite || "N/A"}
                </Typography>
              </Box>
            </Stack>

            <Box mt={4}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                mb={2}
                textAlign="left"
              >
                Review Action
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ mb: 1, borderRadius: 2 }}
                disabled={statusLoading}
                onClick={() => updateStatus("approved")}
              >
                Approve
              </Button>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  sx={{ borderRadius: 2 }}
                  onClick={() => updateStatus("rejected")}
                >
                  Reject
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="warning"
                  sx={{ borderRadius: 2 }}
                  onClick={() => updateStatus("blocked")}
                >
                  Block
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: Documents */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
              display="flex"
              alignItems="center"
            >
              <VerifiedIcon color="primary" sx={{ mr: 1 }} /> Legal & Identity
              Documents
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <DocImage
                  src={company.gstDocument}
                  label="GST Document"
                  onPreview={handleOpenPreview}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DocImage
                  src={company.addressProof1}
                  label="Address Proof 1"
                  onPreview={handleOpenPreview}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DocImage
                  src={company.addressProof2}
                  label="Address Proof 2"
                  onPreview={handleOpenPreview}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" fontWeight={700} mt={4} mb={2}>
              Company Office Photos
            </Typography>
            <Grid container spacing={2}>
              {company.companyPhotos?.map((img, idx) => (
                <Grid item xs={6} sm={4} key={idx}>
                  <DocImage
                    src={img}
                    label={`Office View ${idx + 1}`}
                    onPreview={handleOpenPreview}
                  />
                </Grid>
              ))}
            </Grid>

            <Box mt={4} p={2} bgcolor="#f8fafc" borderRadius={2}>
              <Typography variant="caption" color="text.secondary">
                Registered Address
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {company.fullAddress || "Address not provided"}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* MODAL remains the same */}
      <Modal
        open={preview.open}
        onClose={handleClosePreview}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <Fade in={preview.open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90vw",
              maxHeight: "90vh",
              outline: "none",
              textAlign: "center",
            }}
          >
            <IconButton
              onClick={handleClosePreview}
              sx={{ position: "absolute", right: 0, top: -40, color: "white" }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={preview.url}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
                borderRadius: 2,
                boxShadow: 24,
                objectFit: "contain",
              }}
            />
            <Typography variant="h6" color="white" mt={2}>
              {preview.title}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default CompanyDetails;
