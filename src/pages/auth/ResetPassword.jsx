import React, { useState } from "react";
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
  // --- STATE ---
  const [showPassword, setShowPassword] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [passwords, setPasswords] = useState({ password: "", confirm: "" });

  // --- HANDLERS ---
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.password === passwords.confirm && passwords.password !== "") {
      setIsChanged(true);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff", // Soft background to make the white container pop
        p: 2,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Side-by-side on desktop
          width: "100%",
          maxWidth: "950px",
          minHeight: "600px",
          //   borderRadius: "32px",
          overflow: "hidden",
          //   boxShadow: "0px 30px 90px rgba(27, 47, 116, 0.1)",
        }}
      >
        {/* LEFT SIDE: ILLUSTRATION */}
        <Box
          sx={{
            flex: 1.2,
            // backgroundColor: "#fcfcff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            // borderRight: { md: "1px solid #f0f3f9" },
          }}
        >
          <Box
            component="img"
            src="/reset-password.gif" // Place your GIF in the public folder
            alt="Reset Illustration"
            sx={{
              width: "120%",
              height: "90%",
              maxWidth: "550px",
              //   filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.06))",
            }}
          />
        </Box>

        {/* RIGHT SIDE: THE FORM */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // backgroundColor: "#fff",
          }}
        >
          {!isChanged ? (
            <Fade in={!isChanged}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "#1b2f74", // Navy Color
                    mb: 1.5,
                    fontSize: { xs: "2rem", md: "2.4rem" },
                  }}
                >
                  Reset Password
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#888", mb: 5, fontWeight: 500 }}
                >
                  Create a new password to regain access to your account.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  {/* New Password Field */}

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, mb: 1, color: "#444" }}
                  >
                    Temporary Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={passwords.password}
                    onChange={handleChange}
                    placeholder="Enter temporary password"
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: "#1b2f74" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, mb: 1, color: "#444" }}
                  >
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={passwords.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: "#1b2f74" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Confirm Password Field */}
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, mb: 1, color: "#444" }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    name="confirm"
                    type={showPassword ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    sx={{
                      mb: 4,
                      "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Change Button - FF0000 */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 2,
                      backgroundColor: "#ff0000", // Your Red Color
                      borderRadius: "14px",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      boxShadow: "0px 10px 20px rgba(255, 0, 0, 0.2)",
                      "&:hover": { backgroundColor: "#d30000" },
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Box>
            </Fade>
          ) : (
            <Fade in={isChanged}>
              <Box sx={{ textAlign: "center" }}>
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 90, color: "#4caf50", mb: 2 }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: "#1b2f74", mb: 2 }}
                >
                  Success!
                </Typography>
                <Typography variant="body1" sx={{ color: "#666", mb: 4 }}>
                  Your password has been reset. You can now log in safely.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 2,
                    backgroundColor: "#1b2f74",
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            </Fade>
          )}

          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              mt: 4,
              alignSelf: "center",
              color: "#888",
              textTransform: "none",
            }}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
