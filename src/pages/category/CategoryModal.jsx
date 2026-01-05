// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControl,
//   Chip,
//   Grid,
//   Divider,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CloseIcon from "@mui/icons-material/Close";
// import SaveIcon from "@mui/icons-material/Save";
// import axiosInstance from "../../services/axiosInstance";
// import { useNotification } from "../../context/NotificationContext";

// const BRAND_NAVY = "#1b2f74";
// const BRAND_RED = "#ff0000";

// const KeywordsInput = ({ value, onChange }) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const newKeyword = inputValue.trim();
//       if (newKeyword && !value.includes(newKeyword)) {
//         onChange([...value, newKeyword]);
//       }
//       setInputValue("");
//     }
//   };

//   const handleDelete = (keywordToDelete) => {
//     onChange(value.filter((k) => k !== keywordToDelete));
//   };

//   return (
//     <Box mt={2}>
//       <TextField
//         label="Meta Keywords"
//         placeholder="Type and press Enter"
//         fullWidth
//         size="small"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         onKeyDown={handleKeyDown}
//       />
//       <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
//         {(value || []).map((keyword, index) => (
//           <Chip
//             key={index}
//             label={keyword}
//             onDelete={() => handleDelete(keyword)}
//             size="small"
//             sx={{
//               bgcolor: BRAND_NAVY,
//               color: "white",
//               "& .MuiChip-deleteIcon": { color: "white" },
//             }}
//           />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// const CategoryModal = ({ open, onClose, editData, onSuccess }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     image: null,
//     bannerImage: null,
//     status: true,
//     seo: { metaTitle: "", metaKeywords: "", metaDescription: "" },
//   });
//   const [imagePreview, setImagePreview] = useState("");
//   const [bannerPreview, setBannerPreview] = useState("");
//   const [categoryId, setCategoryId] = useState(null);
//   const isEdit = Boolean(editData);
//   const canEditSEO = isEdit || Boolean(categoryId);
//   const { showNotification } = useNotification();

//   useEffect(() => {
//     if (editData) {
//       setForm({
//         ...editData,
//         image: null,
//         bannerImage: null,
//         seo: editData.seo || {
//           metaTitle: "",
//           metaKeywords: "",
//           metaDescription: "",
//         },
//       });

//       setImagePreview(editData.image || "");
//       setBannerPreview(editData.bannerImage || "");

//       // ✅ EDIT MODE → allow SEO
//       setCategoryId(editData._id);
//     } else {
//       setForm({
//         name: "",
//         description: "",
//         image: null,
//         bannerImage: null,
//         status: true,
//         seo: { metaTitle: "", metaKeywords: "", metaDescription: "" },
//       });

//       setImagePreview("");
//       setBannerPreview("");

//       // ✅ ADD MODE → block SEO
//       setCategoryId(null);
//       localStorage.removeItem("categoryId");
//     }
//   }, [editData, open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCloseModal = () => {
//     localStorage.removeItem("categoryId");
//     onClose();
//   };

//   const handleSeoChange = (e) => {
//     const { name, value } = e.target;
//     const limit = name === "metaTitle" ? 90 : 200;
//     setForm((prev) => ({
//       ...prev,
//       seo: { ...prev.seo, [name]: (value || "").slice(0, limit) },
//     }));
//   };

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === "image") setImagePreview(reader.result);
//       if (type === "bannerImage") setBannerPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//     setForm((prev) => ({ ...prev, [type]: file }));
//   };

//   const handleSaveBasicInfo = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("description", form.description);
//       if (form.image) formData.append("image", form.image);
//       if (form.bannerImage) formData.append("bannerImage", form.bannerImage);

//       let res;

//       if (isEdit) {
//         res = await axiosInstance.put(
//           `/api/admin/categories/${editData._id}`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         // keep existing id
//         localStorage.setItem("categoryId", editData._id);
//       } else {
//         res = await axiosInstance.post("/api/admin/categories", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         // 🔥 store newly created category id
//         const createdCategoryId = res.data?.data?._id || res.data?._id;
//         localStorage.setItem("categoryId", createdCategoryId);
//         setCategoryId(createdCategoryId); // ✅ ADD THIS
//       }

//       onSuccess();
//      showNotification(
//   isEdit
//     ? "Category updated successfully"
//     : "Category created successfully",
//   "success"
// );

//     } catch (err) {
//    showNotification("Failed to save category. Please try again.", "error");
//       console.error(err);
//     }
//   };

//   const handleSaveSEO = async () => {
//     const id = editData?._id || categoryId;

//     if (!id) {
//       alert("Please create category first.");
//       return;
//     }

//     try {
//       await axiosInstance.put(`/api/admin/categories/${id}/seo`, form.seo);

//       // ✅ clear after SEO save
//       localStorage.removeItem("categoryId");
//       setCategoryId(null);

//      onSuccess();
//      showNotification(
//   isEdit
//     ? "SEO Metadata updated successfully"
//     : "SEO Metadata created successfully",
//   "success"
// );

//     } catch (err) {
//       console.error(err);
//      showNotification("Failed to save SEO data", "error");

//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleCloseModal}
//       maxWidth="md"
//       fullWidth
//       scroll="body"
//     >
//       <DialogTitle
//         sx={{
//           bgcolor: BRAND_NAVY,
//           color: "white",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           py: 2,
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold">
//           {isEdit ? `Update Category: ${form.name}` : "Add New Category"}
//         </Typography>
//         <IconButton onClick={handleCloseModal} sx={{ color: "white" }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3, bgcolor: "#f4f6f8" }}>
//         {/* SECTION 1: GENERAL INFO */}
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             mb: 4,
//             borderRadius: 3,
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "4px",
//               height: "100%",
//               bgcolor: BRAND_NAVY,
//             }}
//           />

//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={3}
//           >
//             <Typography variant="h6" color={BRAND_NAVY} fontWeight="bold">
//               CATEGORY INFORMATION
//             </Typography>
//           </Box>
//           <Divider sx={{ mb: 4 }} />

//           <Grid>
//             <Grid item xs={12} md={7}>
//               <TextField
//                 label="Category Name"
//                 name="name"
//                 fullWidth
//                 value={form.name || ""}
//                 onChange={handleChange}
//                 sx={{
//                   "& .MuiInputBase-input": {
//                     padding: "2%", // Increase this value to make it taller
//                     // height: "5%",
//                     width: "20%", // You can also set a specific height
//                   },
//                 }}
//               />
//               <TextField
//                 label="Description"
//                 name="description"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 margin="normal"
//                 value={form.description || ""}
//                 onChange={handleChange}
//               />
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={form.status ? "enable" : "disable"}
//                   label="Status"
//                   onChange={(e) =>
//                     setForm({ ...form, status: e.target.value === "enable" })
//                   }
//                 >
//                   <MenuItem value="enable">Active / Enabled</MenuItem>
//                   <MenuItem value="disable">Inactive / Disabled</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <Grid container spacing={2}>
//                 {/* THUMBNAIL ZONE */}
//                 <Grid item xs={12} md={6}>
//                   <Typography
//                     variant="caption"
//                     fontWeight="bold"
//                     color={BRAND_NAVY}
//                     display="block"
//                     mb={1}
//                     ml={2}
//                     mt={2}
//                   >
//                     Thumbnail Image
//                   </Typography>
//                   <Box
//                     sx={{
//                       border: "2px dashed #cbd5e0",
//                       p: 1.5,
//                       borderRadius: 2,
//                       textAlign: "center",
//                       bgcolor: "#f8fafc",
//                       transition: "0.3s",
//                       "&:hover": {
//                         borderColor: BRAND_NAVY,
//                         bgcolor: "#f1f5f9",
//                       },
//                     }}
//                   >
//                     {imagePreview ? (
//                       <Box mb={1}>
//                         <img
//                           src={imagePreview}
//                           alt="thumb"
//                           style={{
//                             height: "60px",
//                             maxWidth: "100%",
//                             objectFit: "contain",
//                             borderRadius: "4px",
//                           }}
//                         />
//                       </Box>
//                     ) : (
//                       <CloudUploadIcon
//                         sx={{
//                           fontSize: 30,
//                           mb: 0.5,
//                           opacity: 0.5,
//                           color: "text.secondary",
//                         }}
//                       />
//                     )}
//                     <Box>
//                       <Button
//                         component="label"
//                         variant="outlined"
//                         size="small"
//                         sx={{
//                           color: BRAND_NAVY,
//                           borderColor: BRAND_NAVY,
//                           fontSize: "0.7rem",
//                           py: 0,
//                         }}
//                       >
//                         {imagePreview ? "Change" : "Choose Image"}
//                         <input
//                           type="file"
//                           hidden
//                           onChange={(e) => handleFileChange(e, "image")}
//                         />
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Grid>

//                 {/* BANNER ZONE */}
//                 <Grid item xs={12} md={6}>
//                   <Typography
//                     variant="caption"
//                     fontWeight="bold"
//                     color={BRAND_NAVY}
//                     display="block"
//                     mb={1}
//                     ml={4}
//                     mt={2}
//                   >
//                     Banner Image
//                   </Typography>
//                   <Box
//                     sx={{
//                       border: "2px dashed #cbd5e0",
//                       p: 1.5,
//                       borderRadius: 2,
//                       textAlign: "center",
//                       bgcolor: "#f8fafc",
//                       transition: "0.3s",
//                       "&:hover": {
//                         borderColor: BRAND_NAVY,
//                         bgcolor: "#f1f5f9",
//                       },
//                     }}
//                   >
//                     {bannerPreview ? (
//                       <Box mb={1}>
//                         <img
//                           src={bannerPreview}
//                           alt="banner"
//                           style={{
//                             height: "60px",
//                             maxWidth: "100%",
//                             objectFit: "contain",
//                             borderRadius: "4px",
//                           }}
//                         />
//                       </Box>
//                     ) : (
//                       <CloudUploadIcon
//                         sx={{
//                           fontSize: 30,
//                           mb: 0.5,
//                           opacity: 0.5,
//                           color: "text.secondary",
//                         }}
//                       />
//                     )}
//                     <Box>
//                       <Button
//                         component="label"
//                         variant="outlined"
//                         size="small"
//                         sx={{
//                           color: BRAND_NAVY,
//                           borderColor: BRAND_NAVY,
//                           fontSize: "0.7rem",
//                           py: 0,
//                         }}
//                       >
//                         {bannerPreview ? "Change" : "Choose Banner"}
//                         <input
//                           type="file"
//                           hidden
//                           onChange={(e) => handleFileChange(e, "bannerImage")}
//                         />
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Button
//             variant="contained"
//             startIcon={<SaveIcon />}
//             onClick={handleSaveBasicInfo}
//             sx={{
//               bgcolor: BRAND_NAVY,
//               px: 3,
//               ml: { xs: 0, md: 80 }, // ✅ FIX
//               mt: { xs: 2, md: 0 },
//               display: "flex",
//               justifyContent: "center",
//               "&:hover": { bgcolor: "#122152" },
//               borderRadius: "8px",
//             }}
//           >
//             {isEdit ? "Update" : "Create"}
//           </Button>
//         </Paper>

//         {/* SECTION 2: SEO INFO */}
//         {!canEditSEO && (
//           <Typography color="error" mb={2}>
//             Please create category first to add SEO information.
//           </Typography>
//         )}

//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             borderRadius: 3,
//             position: "relative",
//             overflow: "hidden",

//             // 🔒 STEP-2: disable SEO until category exists
//             opacity: canEditSEO ? 1 : 0.5,
//             pointerEvents: canEditSEO ? "auto" : "none",
//           }}
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "4px",
//               height: "100%",
//               bgcolor: BRAND_RED,
//             }}
//           />

//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={3}
//           >
//             <Typography variant="h6" color={BRAND_RED} fontWeight="bold">
//               SEO METADATA
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "4px",
//               height: "100%",
//               bgcolor: BRAND_RED,
//             }}
//           />

//           <Divider sx={{ mb: 4 }} />

//           <Grid>
//             <Grid item xs={12} md={6} mb={2}>
//               <TextField
//                 label="Meta Title"
//                 name="metaTitle"
//                 fullWidth
//                 variant="outlined"
//                 value={form.seo?.metaTitle || ""}
//                 onChange={handleSeoChange}
//                 helperText={`${form.seo?.metaTitle?.length || 0}/90 characters`}
//               />
//               <KeywordsInput
//                 value={
//                   Array.isArray(form.seo?.metaKeywords)
//                     ? form.seo.metaKeywords
//                     : form.seo?.metaKeywords
//                     ? form.seo.metaKeywords.split(",")
//                     : []
//                 }
//                 onChange={(newKeywords) =>
//                   setForm({
//                     ...form,
//                     seo: { ...form.seo, metaKeywords: newKeywords.join(",") },
//                   })
//                 }
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Meta Description"
//                 name="metaDescription"
//                 fullWidth
//                 multiline
//                 rows={2}
//                 variant="outlined"
//                 value={form.seo?.metaDescription || ""}
//                 onChange={handleSeoChange}
//                 helperText={`${
//                   form.seo?.metaDescription?.length || 0
//                 }/200 characters`}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             variant="contained"
//             startIcon={<SaveIcon />}
//             onClick={handleSaveSEO}
//             sx={{
//               bgcolor: BRAND_RED,
//               px: 3,
//               ml: { xs: 0, md: 80 }, // ✅ FIX
//               mt: { xs: 2, md: 0 },
//               display: "flex",
//               justifyContent: "center",
//               "&:hover": { bgcolor: "#ff0000" },
//               borderRadius: "8px",
//             }}
//           >
//             {isEdit ? "Update " : "Create "}
//           </Button>
//         </Paper>

//         <Box mt={4} display="flex" justifyContent="center">
//           <Button
//             onClick={handleCloseModal}
//             variant="outlined"
//             sx={{ color: "grey.600", borderColor: "grey.400", px: 4 }}
//           >
//             Close Modal
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CategoryModal;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Grid,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import axiosInstance from "../../services/axiosInstance";
import { useNotification } from "../../context/NotificationContext";

const BRAND_NAVY = "#1b2f74";
const BRAND_RED = "#ff0000";

const KeywordsInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (newKeyword && !value.includes(newKeyword)) {
        onChange([...value, newKeyword]);
      }
      setInputValue("");
    }
  };

  const handleDelete = (keywordToDelete) => {
    onChange(value.filter((k) => k !== keywordToDelete));
  };

  return (
    <Box mt={2}>
      <TextField
        label="Meta Keywords"
        placeholder="Type and press Enter"
        fullWidth
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
        {(value || []).map((keyword, index) => (
          <Chip
            key={index}
            label={keyword}
            onDelete={() => handleDelete(keyword)}
            size="small"
            sx={{
              bgcolor: BRAND_NAVY,
              color: "white",
              "& .MuiChip-deleteIcon": { color: "white" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const CategoryModal = ({ open, onClose, editData, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    bannerImage: null,
    status: true,
    seo: { metaTitle: "", metaKeywords: "", metaDescription: "" },
  });
  const [imagePreview, setImagePreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  // const [categoryId, setCategoryId] = useState(null);
  const isEdit = Boolean(editData);
  // const canEditSEO = isEdit || Boolean(categoryId);
  const { showNotification } = useNotification();

 



  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
          name: editData.name || "",
      description: editData.description || "", // ✅ keep it
        image: null,
        bannerImage: null,
        seo: {
          metaTitle: editData.seo?.metaTitle || "",
          metaDescription: editData.seo?.metaDescription || "",
          metaKeywords: Array.isArray(editData.seo?.metaKeywords)
            ? editData.seo.metaKeywords.join(",")
            : "",
        },
      });

      setImagePreview(editData.image || "");
      setBannerPreview(editData.bannerImage || "");
    } else {
      setForm({
        name: "",
        description: "",
        image: null,
        bannerImage: null,
        status: true,
        seo: {
          metaTitle: "",
          metaKeywords: "",
          metaDescription: "",
        },
      });

      setImagePreview("");
      setBannerPreview("");
    }
  }, [editData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    localStorage.removeItem("categoryId");
    onClose();
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    const limit = name === "metaTitle" ? 90 : 200;
    setForm((prev) => ({
      ...prev,
      seo: { ...prev.seo, [name]: (value || "").slice(0, limit) },
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "image") setImagePreview(reader.result);
      if (type === "bannerImage") setBannerPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setForm((prev) => ({ ...prev, [type]: file }));
  };

  const handleSaveBasicInfo = async () => {
    try {
      const formData = new FormData();

      // CATEGORY FIELDS
      formData.append("name", form.name);
      formData.append("description", form.description || "");

      formData.append("status", form.status);

      if (form.image) formData.append("image", form.image);
      if (form.bannerImage) formData.append("bannerImage", form.bannerImage);

      // ✅ SEO AS JSON STRING (IMPORTANT)
      formData.append("metaTitle", form.seo.metaTitle);
      formData.append("metaKeywords", form.seo.metaKeywords);
      formData.append("metaDescription", form.seo.metaDescription);

      if (isEdit) {
        await axiosInstance.put(
          `/api/admin/categories/${editData._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axiosInstance.post("/api/admin/categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess();
      showNotification(
        isEdit
          ? "Category & SEO updated successfully"
          : "Category & SEO created successfully",
        "success"
      );
    } catch (err) {
      console.error(err);
      showNotification("Failed to save category data", "error");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      maxWidth="md"
      fullWidth
      scroll="body"
    >
      <DialogTitle
        sx={{
          bgcolor: BRAND_NAVY,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {isEdit ? `Update Category: ${form.name}` : "Add New Category"}
        </Typography>
        <IconButton onClick={handleCloseModal} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, bgcolor: "#f4f6f8" }}>
        {/* SECTION 1: GENERAL INFO */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              bgcolor: BRAND_NAVY,
            }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" color={BRAND_NAVY} fontWeight="bold">
              CATEGORY INFORMATION
            </Typography>
          </Box>
          <Divider sx={{ mb: 4 }} />

          <Grid>
            <Grid item xs={12} md={7}>
              <TextField
                label="Category Name"
                name="name"
                fullWidth
                value={form.name || ""}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "2%", // Increase this value to make it taller
                    // height: "5%",
                    width: "20%", // You can also set a specific height
                  },
                }}
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                value={form.description || ""}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={form.status ? "enable" : "disable"}
                  label="Status"
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value === "enable" })
                  }
                >
                  <MenuItem value="enable">Active / Enabled</MenuItem>
                  <MenuItem value="disable">Inactive / Disabled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                {/* THUMBNAIL ZONE */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color={BRAND_NAVY}
                    display="block"
                    mb={1}
                    ml={2}
                    mt={2}
                  >
                    Thumbnail Image
                  </Typography>
                  <Box
                    sx={{
                      border: "2px dashed #cbd5e0",
                      p: 1.5,
                      borderRadius: 2,
                      textAlign: "center",
                      bgcolor: "#f8fafc",
                      transition: "0.3s",
                      "&:hover": {
                        borderColor: BRAND_NAVY,
                        bgcolor: "#f1f5f9",
                      },
                    }}
                  >
                    {imagePreview ? (
                      <Box mb={1}>
                        <img
                          src={imagePreview}
                          alt="thumb"
                          style={{
                            height: "60px",
                            maxWidth: "100%",
                            objectFit: "contain",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    ) : (
                      <CloudUploadIcon
                        sx={{
                          fontSize: 30,
                          mb: 0.5,
                          opacity: 0.5,
                          color: "text.secondary",
                        }}
                      />
                    )}
                    <Box>
                      <Button
                        component="label"
                        variant="outlined"
                        size="small"
                        sx={{
                          color: BRAND_NAVY,
                          borderColor: BRAND_NAVY,
                          fontSize: "0.7rem",
                          py: 0,
                        }}
                      >
                        {imagePreview ? "Change" : "Choose Image"}
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, "image")}
                        />
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                {/* BANNER ZONE */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color={BRAND_NAVY}
                    display="block"
                    mb={1}
                    ml={4}
                    mt={2}
                  >
                    Banner Image
                  </Typography>
                  <Box
                    sx={{
                      border: "2px dashed #cbd5e0",
                      p: 1.5,
                      borderRadius: 2,
                      textAlign: "center",
                      bgcolor: "#f8fafc",
                      transition: "0.3s",
                      "&:hover": {
                        borderColor: BRAND_NAVY,
                        bgcolor: "#f1f5f9",
                      },
                    }}
                  >
                    {bannerPreview ? (
                      <Box mb={1}>
                        <img
                          src={bannerPreview}
                          alt="banner"
                          style={{
                            height: "60px",
                            maxWidth: "100%",
                            objectFit: "contain",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    ) : (
                      <CloudUploadIcon
                        sx={{
                          fontSize: 30,
                          mb: 0.5,
                          opacity: 0.5,
                          color: "text.secondary",
                        }}
                      />
                    )}
                    <Box>
                      <Button
                        component="label"
                        variant="outlined"
                        size="small"
                        sx={{
                          color: BRAND_NAVY,
                          borderColor: BRAND_NAVY,
                          fontSize: "0.7rem",
                          py: 0,
                        }}
                      >
                        {bannerPreview ? "Change" : "Choose Banner"}
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, "bannerImage")}
                        />
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveBasicInfo}
            sx={{
              bgcolor: BRAND_NAVY,
              px: 3,
              ml: { xs: 0, md: 80 }, // ✅ FIX
              mt: { xs: 2, md: 0 },
              display: "flex",
              justifyContent: "center",
              "&:hover": { bgcolor: "#122152" },
              borderRadius: "8px",
            }}
          >
            {isEdit ? "Update" : "Create"}
          </Button> */}
        </Paper>

        {/* SECTION 2: SEO INFO */}
        {/* {!canEditSEO && (
          <Typography color="error" mb={2}>
            Please create category first to add SEO information.
          </Typography>
        )} */}

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",

            // 🔒 STEP-2: disable SEO until category exists
            // opacity: canEditSEO ? 1 : 0.5,
            // pointerEvents: canEditSEO ? "auto" : "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              bgcolor: BRAND_RED,
            }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" color={BRAND_RED} fontWeight="bold">
              SEO METADATA
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              bgcolor: BRAND_RED,
            }}
          />

          <Divider sx={{ mb: 4 }} />

          <Grid>
            <Grid item xs={12} md={6} mb={2}>
              <TextField
                label="Meta Title"
                name="metaTitle"
                fullWidth
                variant="outlined"
                value={form.seo?.metaTitle || ""}
                onChange={handleSeoChange}
                helperText={`${form.seo?.metaTitle?.length || 0}/90 characters`}
              />
              <KeywordsInput
                value={
                  Array.isArray(form.seo?.metaKeywords)
                    ? form.seo.metaKeywords
                    : form.seo?.metaKeywords
                    ? form.seo.metaKeywords.split(",")
                    : []
                }
                onChange={(newKeywords) =>
                  setForm({
                    ...form,
                    seo: { ...form.seo, metaKeywords: newKeywords.join(",") },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Meta Description"
                name="metaDescription"
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                value={form.seo?.metaDescription || ""}
                onChange={handleSeoChange}
                helperText={`${
                  form.seo?.metaDescription?.length || 0
                }/200 characters`}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveBasicInfo}
            sx={{
              bgcolor: BRAND_NAVY,
              px: 3,
              ml: { xs: 0, md: 80 }, // ✅ FIX
              mt: { xs: 2, md: 0 },
              display: "flex",
              justifyContent: "center",
              "&:hover": { bgcolor: "#122152" },
              borderRadius: "8px",
            }}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </Paper>

        <Box mt={4} display="flex" justifyContent="center">
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            sx={{ color: "grey.600", borderColor: "grey.400", px: 4 }}
          >
            Close Modal
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
