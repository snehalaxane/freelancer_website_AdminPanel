// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../services/axiosInstance";
// import PageLoader from "../../components/common/PageLoader";
// // 1. IMPORT YOUR SHARED COMPONENT
// import StatusChip from "../../components/common/StatusChip";

// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Stack,
//   Avatar,
//   Divider,
//   Button,
//   IconButton,
//   Card,
//   CardMedia,
//   CardContent,
//   Modal,
//   Backdrop,
//   Fade,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import CloseIcon from "@mui/icons-material/Close";

// /* ---------- Internal DocImage Component ---------- */
// const DocImage = ({ src, label, onPreview }) => {
//   if (!src) return null;
//   return (
//     <Card
//       variant="outlined"
//       onClick={() => onPreview(src, label)}
//       sx={{
//         borderRadius: 3,
//         cursor: "pointer",
//         transition: "0.3s",
//         "&:hover": {
//           boxShadow: 6,
//           transform: "translateY(-4px)",
//           borderColor: "primary.main",
//         },
//       }}
//     >
//       <Box sx={{ position: "relative" }}>
//         <CardMedia
//           component="img"
//           height="120"
//           image={src}
//           alt={label}
//           sx={{ objectFit: "cover" }}
//         />
//         <Box
//           sx={{
//             position: "absolute",
//             top: 5,
//             right: 5,
//             bgcolor: "rgba(255,255,255,0.9)",
//             borderRadius: "50%",
//             p: 0.5,
//           }}
//         >
//           <OpenInNewIcon sx={{ fontSize: 14, color: "#1b2f74" }} />
//         </Box>
//       </Box>
//       <CardContent sx={{ p: 1, textAlign: "center", bgcolor: "#f8fafc" }}>
//         <Typography variant="caption" fontWeight={700}>
//           {label}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// const CompanyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [statusLoading, setStatusLoading] = useState(false);
//   const [preview, setPreview] = useState({ open: false, url: "", title: "" });

//   const fetchDetails = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`/api/admin/company/${id}`);
//       setCompany(res.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDetails();
//   }, [id]);

//   const handleOpenPreview = (url, title) =>
//     setPreview({ open: true, url, title });
//   const handleClosePreview = () => setPreview({ ...preview, open: false });

//   const updateStatus = async (status) => {
//     try {
//       setStatusLoading(true);
//       await axiosInstance.put(`/api/admin/company/${id}/status`, { status });
//       fetchDetails();
//     } catch (error) {
//       console.error("Status update error:", error);
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   // Centered Loader call
//   if (loading) {
//     return <PageLoader message="Loading Organisation Details..." />;
//   }

//   if (!company)
//     return (
//       <Typography sx={{ p: 4, textAlign: "center" }}>
//         Organisation not found.
//       </Typography>
//     );

//   return (
//     <Box
//       p={{ xs: 2, md: 4 }}
//       sx={{
//         backgroundColor: "#f4f7fe",
//         minHeight: "100vh",
//         width: "150%", // Ensures content doesn't cause horizontal overflow
//       }}
//     >
//       {/* Header */}
//       <Stack direction="row" spacing={2} mb={3} alignItems="center">
//         <IconButton
//           onClick={() => navigate(-1)}
//           sx={{ bgcolor: "white", boxShadow: 1 }}
//         >
//           <ArrowBackIcon />
//         </IconButton>
//         <Typography variant="h5" fontWeight={800} color="#1b2f74">
//           Company Profile
//         </Typography>
//       </Stack>

//       <Grid container spacing={3}>
//         {/* LEFT COLUMN: Profile Info */}
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3, borderRadius: 4, textAlign: "center" }}>
//             <Avatar
//               src={company.logoPhoto}
//               sx={{
//                 width: 120,
//                 height: 120,
//                 mx: "auto",
//                 mb: 2,
//                 border: "4px solid white",
//                 boxShadow: 3,
//               }}
//               variant="rounded"
//             />
//             <Typography variant="h6" fontWeight={700}>
//               {company.firstName} {company.lastName}
//             </Typography>

//             {/* 2. REUSABLE STATUS CHIP USED HERE */}
//             <Box mt={1} mb={1}>
//               <StatusChip status={company.status} />
//             </Box>

//             <Typography color="text.secondary" variant="body2" gutterBottom>
//               {company.email}<br></br>
//               {company.businessEmail}
//             </Typography>

//             <Divider sx={{ my: 3 }} />

//             <Stack textAlign="left" spacing={2}>
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   GST Number
//                 </Typography>
//                 <Typography variant="body2" fontWeight={700}>
//                   {company.gstNumber || "N/A"}
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Business Phone
//                 </Typography>
//                 <Typography variant="body2" fontWeight={700}>
//                   {company.businessPhone || "N/A"}
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Website
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   component="a"
//                   href={company.businessWebsite}
//                   target="_blank"
//                   color="primary"
//                   sx={{ textDecoration: "none" }}
//                 >
//                   {company.businessWebsite || "N/A"}
//                 </Typography>
//               </Box>
//             </Stack>

//             <Box mt={4}>
//               <Typography
//                 variant="subtitle2"
//                 fontWeight={700}
//                 mb={2}
//                 textAlign="left"
//               >
//                 Review Action
//               </Typography>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="success"
//                 sx={{ mb: 1, borderRadius: 2 }}
//                 disabled={statusLoading}
//                 onClick={() => updateStatus("approved")}
//               >
//                 Approve
//               </Button>
//               <Stack direction="row" spacing={1}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   color="error"
//                   sx={{ borderRadius: 2 }}
//                   onClick={() => updateStatus("rejected")}
//                 >
//                   Reject
//                 </Button>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   color="warning"
//                   sx={{ borderRadius: 2 }}
//                   onClick={() => updateStatus("blocked")}
//                 >
//                   Block
//                 </Button>
//               </Stack>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* RIGHT COLUMN: Documents */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 7, borderRadius: 4 }}>
//             <Typography
//               variant="h6"
//               fontWeight={700}
//               mb={3}
//               display="flex"
//               alignItems="center"
//             >
//               <VerifiedIcon color="primary" sx={{ mr: 1 }} /> Legal & Identity
//               Documents
//             </Typography>

//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <DocImage
//                   src={company.gstDocument}
//                   label="GST Document"
//                   onPreview={handleOpenPreview}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <DocImage
//                   src={company.addressProof1}
//                   label="Address Proof 1"
//                   onPreview={handleOpenPreview}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <DocImage
//                   src={company.addressProof2}
//                   label="Address Proof 2"
//                   onPreview={handleOpenPreview}
//                 />
//               </Grid>
//             </Grid>

//             <Typography variant="h6" fontWeight={700} mt={4} mb={2}>
//               Company Office Photos
//             </Typography>
//             <Grid container spacing={2}>
//               {company.companyPhotos?.map((img, idx) => (
//                 <Grid item xs={6} sm={4} key={idx}>
//                   <DocImage
//                     src={img}
//                     label={`Office View ${idx + 1}`}
//                     onPreview={handleOpenPreview}
//                   />
//                 </Grid>
//               ))}
//             </Grid>

//             <Box mt={4} p={2} bgcolor="#f8fafc" borderRadius={2}>
//               <Typography variant="caption" color="text.secondary">
//                 Registered Address
//               </Typography>
//               <Typography variant="body2" fontWeight={500}>
//                 {company.fullAddress || "Address not provided"}
//               </Typography>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* MODAL remains the same */}
//       <Modal
//         open={preview.open}
//         onClose={handleClosePreview}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//           sx: {
//             backdropFilter: "blur(4px)",
//             backgroundColor: "rgba(0,0,0,0.8)",
//           },
//         }}
//       >
//         <Fade in={preview.open}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               maxWidth: "90vw",
//               maxHeight: "90vh",
//               outline: "none",
//               textAlign: "center",
//             }}
//           >
//             <IconButton
//               onClick={handleClosePreview}
//               sx={{ position: "absolute", right: 0, top: -40, color: "white" }}
//             >
//               <CloseIcon />
//             </IconButton>
//             <Box
//               component="img"
//               src={preview.url}
//               sx={{
//                 width: "100%",
//                 height: "auto",
//                 maxHeight: "80vh",
//                 borderRadius: 2,
//                 boxShadow: 24,
//                 objectFit: "contain",
//               }}
//             />
//             <Typography variant="h6" color="white" mt={2}>
//               {preview.title}
//             </Typography>
//           </Box>
//         </Fade>
//       </Modal>
//     </Box>
//   );
// };

// export default CompanyDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import PageLoader from "../../components/common/PageLoader";
import StatusChip from "../../components/common/StatusChip";
import DownloadIcon from "@mui/icons-material/Download";
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
  Link,
  Backdrop,
  Fade,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

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

  if (loading) return <PageLoader message="Loading Organisation Details..." />;

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
        width: "100%", // Fixed from 150%
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "white",
            boxShadow: 1,
            "&:hover": { bgcolor: "#eee" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
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
          Organization Profile
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* LEFT COLUMN: Main Info & Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, textAlign: "center", mb: 3 }}>
            <Avatar
              src={company.logoPhoto}
              sx={{
                width: 140,
                height: 140,
                mx: "auto",
                mb: 2,
                border: "4px solid white",
                boxShadow: 3,
              }}
              variant="rounded"
            />
            <Typography variant="h5" fontWeight={800} color="#1b2f74">
              {company.businessName}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.secondary"
            >
              {company.firstName} {company.lastName}
            </Typography>

            <Box mt={1} mb={2}>
              <StatusChip status={company.status} />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Contact Information */}
            <Stack spacing={2} textAlign="left">
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Personal Email
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {company.email}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Business Email
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {company.businessEmail}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Personal Phone
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {company.phoneNumber}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Alternate Phone
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {company.altPhoneNumber || "N/A"}
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
                sx={{ mb: 1, borderRadius: 2, py: 1.2, fontWeight: 700 }}
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
                  sx={{ borderRadius: 2, fontWeight: 600 }}
                  onClick={() => updateStatus("rejected")}
                >
                  Reject
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="warning"
                  sx={{ borderRadius: 2, fontWeight: 600 }}
                  onClick={() => updateStatus("blocked")}
                >
                  Block
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: Professional Details & Documents */}
        <Grid item xs={12} md={8}>
          {/* Business Summary Card */}
          <Paper sx={{ p: 4, borderRadius: 4, mb: 3 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
              display="flex"
              alignItems="center"
            >
              <BusinessIcon color="primary" sx={{ mr: 1 }} /> Business
              Registration Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">
                  Registration Type
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {company.companyRegistrationType}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">
                  Experience
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {company.experience} Years
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">
                  GST Number
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {company.gstNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Business Phone
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {company.businessPhone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Website
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  <Link
                    href={
                      company.businessWebsite.startsWith("http")
                        ? company.businessWebsite
                        : `https://${company.businessWebsite}`
                    }
                    target="_blank"
                    sx={{ textDecoration: "none" }}
                  >
                    {company.businessWebsite}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Registered Office Address
                </Typography>
                <Typography variant="body2" fontWeight={500} sx={{ mt: 0.5 }}>
                  {company.fullAddress}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Documents Section */}
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
              display="flex"
              alignItems="center"
            >
              <VerifiedIcon color="primary" sx={{ mr: 1 }} /> Identity & Legal
              Documents
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <DocImage
                  src={company.gstDocument}
                  label="GST Certificate"
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

            <Typography variant="h6" fontWeight={700} mt={5} mb={2}>
              Office & Workspace Photos
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
          </Paper>
        </Grid>
      </Grid>

      {/* Image Preview Modal */}
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

export default CompanyDetails;
