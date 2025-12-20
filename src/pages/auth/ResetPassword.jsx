import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import publicAxios from "../../services/publicAxios";
import { BackgroundContainer } from "../../components/common/BackgroundContainer";

import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Paper,
  IconButton,
  Fade,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 🔹 from reset link
  const email = searchParams.get("email");

  // --- STATE ---
  const [showPassword, setShowPassword] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tempCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Invalid reset link");
      return;
    }

    if (!form.tempCode) {
      alert("Temporary password is required");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await publicAxios.post("/api/admin/reset-password", {
        email,
        tempCode: form.tempCode,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      setIsChanged(true);
    } catch (error) {
      console.error("Reset password error:", error);
      alert(
        error?.response?.data?.message || "Unable to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundContainer
      sx={{ alignItems: "center", justifyContent: "center", p: 2 }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: 950,
          minHeight: 600,
        }}
      >
        {/* LEFT ILLUSTRATION */}
        <Box
          sx={{
            flex: 1.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/reset-password.gif"
            sx={{ width: "120%", maxWidth: 550 }}
          />
        </Box>

        {/* RIGHT FORM */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {!isChanged ? (
            <Fade in>
              <Box component="form" onSubmit={handleSubmit}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, color: "#1b2f74", mb: 2 }}
                >
                  Reset Password
                </Typography>

                {/* TEMP PASSWORD */}
                <TextField
                  fullWidth
                  required
                  name="tempCode"
                  type={showPassword ? "text" : "password"}
                  value={form.tempCode}
                  onChange={handleChange}
                  placeholder="Enter temporary password"
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />

                {/* NEW PASSWORD */}
                <TextField
                  fullWidth
                  required
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  sx={{ mb: 3 }}
                />

                {/* CONFIRM PASSWORD */}
                <TextField
                  fullWidth
                  required
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  sx={{ mb: 4 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 2,
                    backgroundColor: "#ff0000",
                    fontWeight: 700,
                    "&:hover": { backgroundColor: "#d30000" },
                  }}
                >
                  {loading ? "Updating..." : "Change Password"}
                </Button>
              </Box>
            </Fade>
          ) : (
            <Fade in>
              <Box textAlign="center">
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 90, color: "#4caf50" }}
                />
                <Typography variant="h4" sx={{ mt: 2, fontWeight: 800 }}>
                  Password Reset Successful!
                </Typography>
                <Button
                  sx={{ mt: 3 }}
                  variant="contained"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </Button>
              </Box>
            </Fade>
          )}

          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 4 }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </BackgroundContainer>
  );
};

export default ResetPassword;
