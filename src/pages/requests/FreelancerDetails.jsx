import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import PageLoader from "../../components/common/PageLoader";
import StatusChip from "../../components/common/StatusChip";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Paper,
  Divider,
  Button,
  Stack,
  Card,
  CardMedia,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Container,
  Tooltip,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import WorkIcon from "@mui/icons-material/Work";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

/* ---------- New Minimalist Doc Component ---------- */
const DocCard = ({ src, label, onPreview }) => {
  const isPdf = src?.toLowerCase().endsWith(".pdf");

  return (
    <Box
      onClick={src ? () => onPreview(src, label) : undefined}
      sx={{
        position: "relative",
        width: "100%",
        height: 180, // ✅ FIXED HEIGHT
        borderRadius: "20px",
        overflow: "hidden",
        cursor: src ? "pointer" : "default",
        bgcolor: "#f1f5f9", // ✅ SAME BG ALWAYS
        border: "1px dashed #e2e8f0",

        transition: "0.3s",
        "&:hover": src
          ? {
              transform: "scale(1.02)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            }
          : {},
      }}
    >
      {/* CONTENT AREA */}
      {src ? (
        isPdf ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PictureAsPdfIcon sx={{ fontSize: 46, color: "error.main" }} />
            <Typography variant="caption" fontWeight={600}>
              PDF Document
            </Typography>
          </Box>
        ) : (
          <CardMedia
            component="img"
            image={src}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )
      ) : (
        /* EMPTY STATE */
        <Box
          sx={{
            height: "100%",
            // width:"200%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          No Document
        </Box>
      )}

      {/* LABEL FOOTER */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 1.2,
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
        }}
      >
        <Typography variant="caption" sx={{ color: "white", fontWeight: 500 }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const FreelancerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [preview, setPreview] = useState({ open: false, url: "", title: "" });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  const handleOpenPreviews = (url, title) => {
    if (!url) return;

    const isPdf = url.toLowerCase().endsWith(".pdf");

    if (isPdf) {
      // 🔥 OPEN PDF
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // 🖼 IMAGE PREVIEW
    setPreview({ open: true, url, title });
  };

  const handleClosePreview = () => setPreview({ ...preview, open: false });

  const updateStatus = async (status) => {
    try {
      setStatusLoading(true);
      await axiosInstance.put(`/api/admin/freelancer/${id}/status`, { status });
      fetchFreelancer();
    } catch (error) {
      console.error(error);
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) return <PageLoader message="Initializing verification..." />;
  if (!freelancer)
    return (
      <Box p={5}>
        <Typography>Profile unreachable.</Typography>
      </Box>
    );

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pb: 10 }}>
      {/* 1. NEW TOP HERO SECTION */}
      <Box
        sx={{
          minHeight: { xs: 180, sm: 220 }, // 🔥 responsive height
          background: "linear-gradient(135deg, #1b2f74 0%, #1b2f74 100%)",
          pt: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 0 },
          m: 1,
          borderRadius: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="lg">
          {/* Back Button */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              color: "white",
              mb: { xs: 1, sm: 2 },
              bgcolor: "rgba(255,255,255,0.12)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          {/* Header Content */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 3 }}
            alignItems="center"
            textAlign={{ xs: "center", md: "left" }}
          >
            {/* Avatar */}
            <Avatar
              src={
                freelancer?.selfiePhoto
                  ? `${BASE_URL}/${freelancer.selfiePhoto}`
                  : ""
              }
              onClick={() =>
                handleOpenPreview(
                  `${BASE_URL}/${freelancer.selfiePhoto}`,
                  "Profile Photo"
                )
              }
              sx={{
                width: { xs: 96, sm: 120, md: 140 },
                height: { xs: 96, sm: 120, md: 140 },
                border: "5px solid #F8FAFC",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                cursor: "pointer",
              }}
            />

            {/* Name & Status */}
            <Box sx={{ color: "white" }}>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  letterSpacing: -0.5,
                  fontSize: { xs: "1.6rem", sm: "2rem" },
                }}
              >
                {freelancer.firstName} {freelancer.lastName}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
                mt={1}
              >
                <StatusChip status={freelancer.status} />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  ID: {id.slice(-6).toUpperCase()}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* 2. MAIN CONTENT AREA */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={{ xs: 3, md: 8 }}>
          {/* RIGHT: FLOATING ACTION CARD */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: { xs: "static", md: "sticky" }, // 🔥 disable sticky on mobile
                top: 24,
              }}
            >
              <Paper
                sx={{ p: 5, borderRadius: "20px", border: "1px solid #e2e8f0" }}
              >
                {/* Line 1: The Heading */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    mb: 5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <VerifiedUserIcon color="primary" /> Basic Information
                </Typography>

                {/* Line 2+: The Data flowing horizontally */}
                <Grid container spacing={7}>
                  {[
                    {
                      label: "Email Address",
                      value: freelancer.email,
                      icon: <EmailIcon fontSize="small" />,
                      isLink: true, // <--- THIS MUST BE HERE
                    },
                    {
                      label: "Phone Number",
                      value: freelancer.phoneNumber,
                      icon: <PhoneIcon fontSize="small" />,
                    },
                    {
                      label: "Alternate Number",
                      value: freelancer.altPhoneNumber,
                      icon: <PhoneIcon fontSize="small" />,
                    },
                    {
                      label: "Documents",
                      value: `${freelancer.panOrDLType}: ${freelancer.panOrDLNumber}`,
                      icon: <BadgeIcon fontSize="small" />,
                    },
                    {
                      label: "Documents",
                      value: `${freelancer.aadhaarOrPassportType}: ${freelancer.aadhaarOrPassportNumber}`,
                      icon: <BadgeIcon fontSize="small" />,
                    },

                    {
                      label: "Category",
                      value: freelancer.category,
                      icon: <AssignmentIndIcon fontSize="small" />,
                    },
                    {
                      label: "Subcategory",
                      value: freelancer.subcategory,
                      icon: <AssignmentIndIcon fontSize="small" />,
                    },
                    {
                      label: "Expertise",
                      value: freelancer.skill,
                      icon: <AssignmentIndIcon fontSize="small" />,
                    },
                    {
                      label: "LinkedIn",
                      value: freelancer.linkedin,
                      icon: <LinkedInIcon fontSize="small" />,
                      isLink: true,
                    },
                  ].map((item, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                      {/* xs=12 (Mobile: Full width) 
            sm=6  (Tablet: 2 per row) 
            md=4  (Desktop: 3 per row) 
            lg={3} (Large Desktop: 4 per row) */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          // alignItems: "center", // Centers everything horizontally
                          // textAlign: "center",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          mb={0.5}
                        >
                          <Box sx={{ color: "primary.main", display: "flex" }}>
                            {item.icon}
                          </Box>
                          <Typography
                            variant="caption"
                            fontWeight={700}
                            color="text.secondary"
                            sx={{ textTransform: "uppercase" }}
                          >
                            {item.label}
                          </Typography>
                        </Stack>
                        {item.isLink && item.value ? (
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            component="a"
                            // If value contains '@', it's an email, so we MUST add mailto:
                            href={
                              item.value.includes("@")
                                ? `mailto:${item.value}`
                                : `https://${item.value
                                    .replace("https://", "")
                                    .replace("http://", "")}`
                            }
                            target="_blank"
                            sx={{
                              wordBreak: "break-all",
                              color: "primary.main",
                              textDecoration: "none",
                              cursor: "pointer",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {item.value}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{
                              wordBreak: "break-all",
                              color: "text.primary",
                              pl: 3,
                            }}
                          >
                            {item.value || "Not Provided"}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>
          </Grid>

          {/* LEFT: INFORMATION CARDS */}
          <Grid container spacing={{ xs: 4.5, md: 9 }}>
            <Stack spacing={7}>
              <Paper
                sx={{
                  p: 5,
                  borderRadius: "20px",
                  // boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  border: "1px solid #e2e8f0",
                  // Fixed Dimensions
                  width: "124%", // Occupy full container width
                  maxWidth: "1500px", // Prevents it from getting too wide on huge screens
                  minHeight: "400px", // Ensures the card doesn't shrink when empty
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <VerifiedUserIcon color="primary" /> Identity Verification
                </Typography>

                <Grid container spacing={3} mb={4}></Grid>

                <Grid container spacing={5}>
                  <Grid item xs={6} sm={3}>
                    <DocCard
                      src={
                        freelancer?.panOrDLFront
                          ? `${BASE_URL}/${freelancer.panOrDLFront}`
                          : ""
                      }
                      label="PAN / Driving License Front"
                      onPreview={handleOpenPreview}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DocCard
                      // src={freelancer.panOrDLBack}
                      src={
                        freelancer?.panOrDLBack
                          ? `${BASE_URL}/${freelancer.panOrDLBack}`
                          : ""
                      }
                      label="PAN / Driving License Back"
                      onPreview={handleOpenPreview}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DocCard
                      // src={freelancer.aadhaarOrPassportFront}
                      src={
                        freelancer?.aadhaarOrPassportFront
                          ? `${BASE_URL}/${freelancer.aadhaarOrPassportFront}`
                          : ""
                      }
                      label="Aadhaar Or Passport Front"
                      onPreview={handleOpenPreview}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DocCard
                      // src={freelancer.aadhaarOrPassportBack}
                      src={
                        freelancer?.aadhaarOrPassportBack
                          ? `${BASE_URL}/${freelancer.aadhaarOrPassportBack}`
                          : ""
                      }
                      label="Aadhaar Or Passport Back"
                      onPreview={handleOpenPreview}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {freelancer.experienceDocs?.length > 0 && (
                <Paper
                  sx={{
                    p: 4,

                    borderRadius: "20px",
                    border: "1px solid #e2e8f0",
                    width: "124%",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,

                      mb: 6,
                    }}
                  >
                    <WorkIcon color="primary" />
                    Experience Documents
                  </Typography>
                  <Grid container spacing={2}>
                    {freelancer.experienceDocs.map((doc, idx) => (
                      <Grid item xs={6} sm={4} width={167} key={idx}>
                        <DocCard
                          src={`${BASE_URL}/${doc}`}
                          label={`Certificate ${idx + 1}`}
                          onPreview={handleOpenPreviews}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" }, // 🔥 key line
                width: "100%",
              }}
            >
              <Stack
                spacing={3}
                sx={{
                  width: { xs: "100%", sm: "70%", md: "25%" },
                }}
              >
                {/* Primary Action */}
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  disabled={statusLoading}
                  onClick={() => updateStatus("approved")}
                  sx={{
                    borderRadius: "14px",
                    py: 1.6,
                    fontWeight: 700,

                    boxShadow: "0 12px 24px rgba(34,197,94,0.25)",
                  }}
                >
                  Approve Freelancer
                </Button>

                {/* Secondary Actions */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => updateStatus("rejected")}
                    sx={{
                      borderRadius: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Reject
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    color="warning"
                    onClick={() => updateStatus("blocked")}
                    sx={{
                      borderRadius: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Block
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* LIGHTBOX MODAL (RETAINED LOGIC) */}
      <Modal
        open={preview.open}
        onClose={handleClosePreview}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(15, 23, 42, 0.9)",
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
              maxWidth: "95vw",
              outline: "none",
              textAlign: "center",
            }}
          >
            <Stack direction="row" justifyContent="flex-end" mb={2} spacing={2}>
              <IconButton
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
                maxHeight: "75vh",
                borderRadius: 4,
                boxShadow: 24,
                objectFit: "contain",
              }}
            />
            <Typography variant="h6" color="white" mt={3} fontWeight={300}>
              {preview.title}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default FreelancerDetails;
