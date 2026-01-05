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
  CardMedia,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Container,
  Link,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import BadgeIcon from "@mui/icons-material/Badge";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/* ---------- Reusable Minimalist Doc Component ---------- */
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

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [preview, setPreview] = useState({ open: false, url: "", title: "" });
  // NEW state specifically for the Google Maps-style Gallery
  const [gallery, setGallery] = useState({
    open: false,
    activeIndex: 0,
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const InfoItem = ({ label, value, icon: Icon }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        {Icon && <Icon sx={{ fontSize: 16, color: "primary.main" }} />}
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            color: "text.secondary",
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, wordBreak: "break-all" }}
      >
        {value || "N/A"}
      </Typography>
    </Box>
  );

  const pdfDocs = [
    { label: "GST Document", path: company?.gstDocument },
    { label: "Address Proof 1", path: company?.addressProof1 },
    { label: "Address Proof 2", path: company?.addressProof2 },
  ].filter((doc) => doc.path?.toLowerCase().endsWith(".pdf"));

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/admin/company/${id}`);
      setCompany(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
      console.error(error);
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) return <PageLoader message="Fetching Organization Details..." />;
  if (!company)
    return (
      <Box p={5}>
        <Typography>Organization unreachable.</Typography>
      </Box>
    );

  // Data mapping for cleaner JSX
  const basicInfo = [
    {
      label: "Contact Person Name",
      value: `${company.firstName} ${company.lastName}`,
      icon: <BadgeIcon fontSize="small" />,
    },
    {
      label: "Personal Email Address",
      value: company.email,
      icon: <EmailIcon fontSize="small" />,
      isLink: "mailto",
    },
    {
      label: "Experience",
      value: company.experience,
      icon: <BusinessIcon fontSize="small" />,
    },
    {
      label: "Company Registration Type",
      value: company.companyRegistrationType,
      icon: <BusinessIcon fontSize="small" />,
    },
    {
      label: "Business Email Address",
      value: company.businessEmail,
      icon: <EmailIcon fontSize="small" />,
      isLink: "mailto",
    },
    {
      label: "Business Address",
      value: company.fullAddress,
      icon: <HomeWorkIcon fontSize="small" />,
    },
    {
      label: "Personal Phone Number",
      value: company.phoneNumber,
      icon: <PhoneIcon fontSize="small" />,
    },
    {
      label: "Alternate Number",
      value: company.altPhoneNumber,
      icon: <PhoneIcon fontSize="small" />,
    },
    {
      label: "Business Number",
      value: company.businessPhone,
      icon: <PhoneIcon fontSize="small" />,
    },
    {
      label: "Business Website",
      value: company.businessWebsite,
      icon: <LanguageIcon fontSize="small" />,
      isLink: "https",
    },
    {
      label: "GST Number",
      value: company.gstNumber,
      icon: <BadgeIcon fontSize="small" />,
    },
    {
      label: "PAN/DL Number",
      value: company.companypanOrDLNumber,
      icon: <BadgeIcon fontSize="small" />,
    },
    {
      label: "Aadhaar/Passport",
      value: company.companyaadhaarOrPassportNumber,
      icon: <BadgeIcon fontSize="small" />,
    },
    {
      label: "LinkedIn",
      value: company.companylinkedin,
      icon: <LinkedInIcon fontSize="small" />,
      isLink: "https",
    },
  ];

  // Add this function before the return ()
  const renderVisuals = () => {
    const photos = company?.companyPhotos || [];
    if (photos.length === 0) return null;

    return (
      <Box sx={{ mt: 4, mb: 4, ml: 4 }}>
        {/* ✅ HEADING */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
        >
          <HomeWorkIcon color="primary" />
          Company Photos
        </Typography>
        <Grid container spacing={1} sx={{ height: 180 }}>
          {/* Left Block */}
          <Grid item xs={4}>
            <Box
              onClick={() => setGallery({ open: true, activeIndex: 0 })}
              sx={{
                position: "relative",
                height: "100%",
                width: "50%",
                cursor: "pointer",
                borderRadius: "8px 0 0 8px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={`${BASE_URL}/${photos[0]}`}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "50%",
                  p: 1,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                }}
              >
                <Typography variant="caption" fontWeight={600}>
                  See photos
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Block (Map + Outside Photo) */}
          <Grid item xs={8}>
            <Stack spacing={1} sx={{ height: "50%" }}>
              {/* <Box sx={{ height: '60%', bgcolor: '#eee', borderRadius: '0 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
              {/* Insert your Map Component or Image here */}
              {/* <Typography variant="caption" color="text.secondary">Location Map</Typography>
              </Box> */}
              <Box
                onClick={() => setGallery({ open: true, activeIndex: 1 })}
                sx={{
                  position: "relative",
                  height: "40%",
                  cursor: "pointer",
                  borderRadius: "0 0 8px 0",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={
                    photos[1]
                      ? `${BASE_URL}/${photos[1]}`
                      : `${BASE_URL}/${photos[0]}`
                  }
                  sx={{ width: "50%", height: "100%", objectFit: "cover" }}
                />
                {/* <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 1, bgcolor: 'rgba(0,0,0,0.6)', color: 'white' }}>
                  <Typography variant="caption" fontWeight={600}>See outside</Typography>
                </Box> */}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const FullGalleryModal = () => {
    if (!company?.companyPhotos) return null;

    return (
      <Modal
        open={gallery.open}
        onClose={() => setGallery({ ...gallery, open: false })}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95vw",
            height: "90vh",
            bgcolor: "#000",
            outline: "none",
            display: "flex",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Sidebar: Thumbnails (Google Maps Style) */}
          <Box
            sx={{
              width: 280,
              borderRight: "1px solid #333",
              overflowY: "auto",
              p: 2,
              display: { xs: "none", md: "block" },
            }}
          >
            <Typography color="white" variant="subtitle2" sx={{ mb: 2 }}>
              Photos
            </Typography>
            <Stack spacing={2}>
              {company.companyPhotos.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setGallery({ ...gallery, activeIndex: i })}
                  sx={{
                    height: 100,
                    borderRadius: 1,
                    cursor: "pointer",
                    overflow: "hidden",
                    border:
                      gallery.activeIndex === i ? "3px solid #1a73e8" : "none",
                    opacity: gallery.activeIndex === i ? 1 : 0.6,
                  }}
                >
                  <Box
                    component="img"
                    src={`${BASE_URL}/${img}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Main Content: Large View */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "black",
            }}
          >
            <IconButton
              onClick={() => setGallery({ ...gallery, open: false })}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "white",
                zIndex: 10,
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              component="img"
              src={`${BASE_URL}/${company.companyPhotos[gallery.activeIndex]}`}
              sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />

            {/* Navigation Arrows */}
            <IconButton
              disabled={gallery.activeIndex === 0}
              onClick={() =>
                setGallery((prev) => ({
                  ...prev,
                  activeIndex: prev.activeIndex - 1,
                }))
              }
              sx={{
                position: "absolute",
                left: 20,
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              disabled={
                gallery.activeIndex === company.companyPhotos.length - 1
              }
              onClick={() =>
                setGallery((prev) => ({
                  ...prev,
                  activeIndex: prev.activeIndex + 1,
                }))
              }
              sx={{
                position: "absolute",
                right: 20,
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pb: 10 }}>
      {/* 1. NEW TOP HERO SECTION */}
      <Box
        sx={{
          minHeight: 220,
          background: "linear-gradient(135deg, #1b2f74 0%, #1b2f74 100%)",
          pt: 2,
          m: 1,
          borderRadius: 3,
        }}
      >
        <Container maxWidth="lg">
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ color: "white", mb: 2, bgcolor: "rgba(255,255,255,0.12)" }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="center"
          >
            <Avatar
              src={company?.logoPhoto ? `${BASE_URL}/${company.logoPhoto}` : ""}
              onClick={() =>
                handleOpenPreview(`${BASE_URL}/${company.logoPhoto}`, "Logo")
              }
              sx={{
                width: 140,
                height: 140,
                border: "5px solid #F8FAFC",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                cursor: "pointer",
              }}
            />
            <Box
              sx={{ color: "white", textAlign: { xs: "center", md: "left" } }}
            >
              <Typography variant="h4" fontWeight={800}>
                {company.businessName}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <StatusChip status={company.status} />
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
        <Grid container spacing={3}>
          {/* RIGHT: FLOATING ACTION CARD */}
          <Grid item xs={12}>
            {" "}
            {/* Changed from md={4} to xs={12} for full width */}
            <Paper
              sx={{ p: 4, borderRadius: "20px", border: "1px solid #e2e8f0" }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1.5 }}
              >
                <VerifiedUserIcon color="primary" /> Basic Information
              </Typography>

              <Grid container spacing={6}>
                {basicInfo.map((item, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Box sx={{ minHeight: "60px" }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={0.5}
                      >
                        <Box
                          sx={{
                            color: "primary.main",
                            display: "flex",
                            minWidth: 20,
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          color="text.secondary"
                          sx={{ textTransform: "uppercase", fontSize: "11px" }}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{
                          pl: 3.5,
                          wordBreak: "break-all",
                          color: item.isLink ? "primary.main" : "text.primary",
                          textDecoration: item.isLink ? "none" : "none",
                          "&:hover": {
                            textDecoration: item.isLink ? "underline" : "none",
                          },
                          cursor: item.isLink ? "pointer" : "default",
                        }}
                        component={item.isLink ? "a" : "p"}
                        href={
                          item.isLink === "mailto"
                            ? `mailto:${item.value}`
                            : item.isLink === "https"
                            ? `https://${item.value?.replace(
                                /^https?:\/\//,
                                ""
                              )}`
                            : undefined
                        }
                        target={item.isLink === "https" ? "_blank" : undefined}
                      >
                        {item.value || "—"}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
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
                  maxWidth: "100%", // Prevents it from getting too wide on huge screens
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
                        company?.companypanOrDLFront
                          ? `${BASE_URL}/${company.companypanOrDLFront}`
                          : ""
                      }
                      label="PAN / Driving License Front"
                      onPreview={handleOpenPreview}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DocCard
                      // src={company.panOrDLBack}
                      src={
                        company?.companypanOrDLBack
                          ? `${BASE_URL}/${company.companypanOrDLBack}`
                          : ""
                      }
                      label="PAN / Driving License Back"
                      onPreview={handleOpenPreview}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DocCard
                      // src={company.aadhaarOrPassportFront}
                      src={
                        company?.companyaadhaarOrPassportFront
                          ? `${BASE_URL}/${company.companyaadhaarOrPassportFront}`
                          : ""
                      }
                      label="Aadhaar Or Passport Front"
                      onPreview={handleOpenPreview}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DocCard
                      // src={company.aadhaarOrPassportBack}
                      src={
                        company?.companyaadhaarOrPassportBack
                          ? `${BASE_URL}/${company.companyaadhaarOrPassportBack}`
                          : ""
                      }
                      label="Aadhaar Or Passport Back"
                      onPreview={handleOpenPreview}
                    />
                  </Grid>
                </Grid>
              </Paper>
              {pdfDocs.length > 0 && (
                <Paper
                  sx={{
                    p: 4,

                    borderRadius: "20px",
                    border: "1px solid #e2e8f0",
                    width: "124%",
                    maxWidth: "100%",
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
                    <HomeWorkIcon color="primary" />
                    Company Documents (PDF)
                  </Typography>

                  <Grid container spacing={2}>
                    {pdfDocs.map((doc, idx) => (
                      <Grid item xs={6} sm={4} width={167} key={idx}>
                        <DocCard
                          src={`${BASE_URL}/${doc.path}`}
                          label={doc.label}
                          onPreview={handleOpenPreviews}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Stack>
            {/* 2. ADD THE VISUALS SECTION HERE */}
            {renderVisuals()}
            <FullGalleryModal />
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
                  Approve company
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

export default CompanyDetails;
