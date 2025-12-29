import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Switch,
  IconButton,
  Avatar,
  Link,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import CommonTable from "../../components/common/Table/CommonTable";
import StatusChip from "../../components/common/StatusChip";
import {
  StyledTableRow,
  BodyCell,
} from "../../components/common/Table/table.styles";

import axiosInstance from "../../services/axiosInstance";
import SubcategoryModal from "../subcategory/SubcategoryModal";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/admin/subcategories");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (row) => {
    const newStatus = !row.status;

    try {
      await axiosInstance.put(`/api/admin/subcategories/${row._id}`, {
        status: newStatus,
      });

      // update UI using sent value
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === row._id ? { ...cat, status: newStatus } : cat
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Unable to update status");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ---------------- DELETE CATEGORY ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axiosInstance.delete(`/api/admin/subcategories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ---------------- TABLE HEADERS ----------------
  const columns = [
    "S.No",
    "Image",
    "Name",
    "Category Name",
    // "Sub Categories",
    "Status",
    "Actions",
  ];

  // ---------------- ROW RENDER ----------------
  const renderRow = (row, index) => (
    <StyledTableRow key={row._id}>
      <BodyCell>{index + 1}</BodyCell>

      <BodyCell sx={{ textAlign: "center" }}>
        <Avatar
          src={row.image}
          variant="rounded"
          sx={{ width: 50, height: 50, margin: "0 auto" }} // ensures image is centered
        />
      </BodyCell>

      <BodyCell>{row.name}</BodyCell>
      <BodyCell>{row.categoryId?.name || "-"}</BodyCell>

      {/* <BodyCell>{row.subCategoryCount || 0}</BodyCell> */}

      <BodyCell align="center">
        <Box
          onClick={() => handleStatusToggle(row)}
          sx={{
            display: "inline-flex",
            cursor: "pointer",
          }}
        >
          <StatusChip status={row.status ? "active" : "inactive"} />
        </Box>
      </BodyCell>

      <BodyCell>
        <Box
          display="flex"
          //  gap={1}
        >
          <IconButton
            onClick={() => {
              setEditData(row);
              setOpenModal(true);
            }}
            sx={{ ml: 8 }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDelete(row._id)}
            sx={{ ml: 0 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </BodyCell>
    </StyledTableRow>
  );

  return (
    <Box p={1}>
      {/* Header with Breadcrumbs and Gradient Title */}
      <Box mb={1}>
        <Breadcrumbs sx={{ mb: 1, fontSize: "0.9rem" }}>
          <Link underline="hover" color="inherit" href="/dashboard">
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "0.9rem" }}>
            Skills
          </Typography>
        </Breadcrumbs>

        {/* Header Row */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          {/* LEFT SIDE: TITLE + SUBTITLE */}
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
              Subcategories
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Review and manage subcategories and system access.
            </Typography>
          </Box>

          {/* RIGHT SIDE: ADD BUTTON */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditData(null);
              setOpenModal(true);
            }}
            sx={{
              height: "fit-content",
              textTransform: "none",
              fontWeight: 600,
              background: "#1b2f74",
            }}
          >
            Add Subcategory
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <CommonTable
        columns={columns}
        rows={categories}
        renderRow={renderRow}
        loading={loading}
      />

      {/* Modal */}
      <SubcategoryModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null); // reset editData when modal closes
        }}
        editData={editData}
        onSuccess={fetchCategories}
      />
    </Box>
  );
};

export default Categories;
