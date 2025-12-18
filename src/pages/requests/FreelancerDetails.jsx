import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import PageLoader from "../../components/common/PageLoader";
import StatusChip from "../../components/common/StatusChip";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
  Paper,
  Divider,
  Button,
  Chip,
  Stack,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

/* ---------- DocImage Component ---------- */
const DocImage = ({ src, label, onPreview }) => {
  if (!src) return null;
  return (
    <Card
      variant="outlined"
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
      onClick={() => onPreview(src, label)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="140"
          image={src}
          alt={label}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            p: 0.5,
          }}
        >
          <OpenInNewIcon sx={{ fontSize: 16, color: "#1b2f74" }} />
        </Box>
      </Box>
      <CardContent sx={{ p: 1, textAlign: "center", bgcolor: "#f8fafc" }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

const FreelancerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  // FIXED PREVIEW STATE

  const [preview, setPreview] = useState({ open: false, url: "", title: "" });

  const fetchFreelancer = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/admin/freelancer/${id}`);
      setFreelancer(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancer();
  }, [id]);

  const handleOpenPreview = (url, title) =>
    setPreview({ open: true, url, title });
  const handleClosePreview = () => setPreview({ ...preview, open: false });

  const updateStatus = async (status) => {
    try {
      setStatusLoading(true);
      await axiosInstance.put(`/api/admin/freelancer/${id}/status`, {
        status,
      });
      fetchFreelancer();
    } catch (error) {
      console.error(error);
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) {
    return <PageLoader message="Loading Freelancer..." />;
  }
  if (!freelancer)
    return <Typography sx={{ p: 4 }}>Freelancer not found.</Typography>;

  return (
    <Box
      p={{ xs: 2, md: 4 }}
      sx={{ backgroundColor: "#f4f7fe", minHeight: "100vh", minWidth: "170vh" }}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ bgcolor: "white", boxShadow: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box>
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
            Freelancer Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review documents and verify identity
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {/* SIDEBAR */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              position: "sticky",
              top: 20,
            }}
          >
            <Avatar
              src={freelancer.selfiePhoto}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                border: "4px solid #fff",
                boxShadow: 3,
                cursor: "pointer",
              }}
              onClick={() =>
                handleOpenPreview(freelancer.selfiePhoto, "Profile Photo")
              }
            />
            <Typography variant="h6" fontWeight={700}>
              {freelancer.firstName} {freelancer.lastName}
            </Typography>
            <StatusChip status={freelancer.status} />

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2} textAlign="left">
              <Box display="flex" alignItems="center" gap={1.5}>
                <EmailIcon color="action" fontSize="small" />
                <Typography variant="body2">{freelancer.email}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1.5}>
                <PhoneIcon color="action" fontSize="small" />
                <Typography variant="body2">
                  {freelancer.phoneNumber}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1.5}>
                <PhoneIcon color="action" fontSize="small" />
                <Typography variant="body2">
                  {freelancer.altphoneNumber || "NA"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1.5}>
                <LinkedInIcon color="primary" fontSize="small" />
                <Typography
                  variant="body2"
                  component="a"
                  href={freelancer.linkedin}
                  target="_blank"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                    fontWeight: 600,
                  }}
                >
                  LinkedIn Profile
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1.5}>
                <CalendarTodayIcon color="action" fontSize="small" />
                <Typography variant="caption">
                  Joined {new Date(freelancer.createdAt).toLocaleDateString()}
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
                Manage Status
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

        {/* MAIN CONTENT */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Documents */}
            <Paper sx={{ p: 7, borderRadius: 4 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <VerifiedUserIcon color="primary" /> Identity Documents
              </Typography>
              <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    PAN / DL Number
                  </Typography>
                  <Typography fontWeight={600}>
                    {freelancer.panOrDLNumber || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    Aadhaar / Passport Number
                  </Typography>
                  <Typography fontWeight={600}>
                    {freelancer.aadhaarOrPassportNumber || "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={6}>
                <Grid item xs={6} sm={3}>
                  <DocImage
                    src={freelancer.panOrDLFront}
                    label="PAN Front"
                    onPreview={handleOpenPreview}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DocImage
                    src={freelancer.panOrDLBack}
                    label="PAN Back"
                    onPreview={handleOpenPreview}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DocImage
                    src={freelancer.aadhaarOrPassportFront}
                    label="Aadhaar Front"
                    onPreview={handleOpenPreview}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DocImage
                    src={freelancer.aadhaarOrPassportBack}
                    label="Aadhaar Back"
                    onPreview={handleOpenPreview}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Experience */}
            {freelancer.experienceDocs?.length > 0 && (
              <Paper sx={{ p: 7, borderRadius: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>
                  Experience & Portfolio
                </Typography>
                <Grid container spacing={6}>
                  {freelancer.experienceDocs.map((doc, idx) => (
                    <Grid item xs={6} sm={3} key={idx}>
                      <DocImage
                        src={doc}
                        label={`Certificate ${idx + 1}`}
                        onPreview={handleOpenPreview}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* LIGHTBOX MODAL */}
      <Modal
        open={preview.open}
        onClose={handleClosePreview}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(5px)",
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
            <Stack direction="row" justifyContent="flex-end" mb={1} spacing={1}>
              <IconButton
                component="a"
                href={preview.url}
                download
                sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
              >
                <DownloadIcon />
              </IconButton>
              <IconButton
                onClick={handleClosePreview}
                sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
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

export default FreelancerDetails;
