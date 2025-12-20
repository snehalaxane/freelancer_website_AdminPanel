import React, { useState, useEffect } from "react";
// import axiosInstance from "../../services/axiosInstance";
import publicAxios from "../../services/publicAxios";
import { BackgroundContainer } from "../../components/common/BackgroundContainer";

import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Link,
  Paper,
  Fade,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ForgotPassword = () => {
  // --- STATE MANAGEMENT ---
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // --- TIMER LOGIC ---
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- HANDLERS ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting forgot password for:", email);

    // --- VALIDATIONS ---
    if (!email) {
      alert("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await publicAxios.post("/api/admin/forgot-password", {
        email,
      });
      console.log("Forgot password response:", res.data);

      // Success
      setIsSubmitted(true);
      setTimer(60);
    } catch (error) {
      console.error("Forgot password error:", error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      await publicAxios.post("/api/admin/forgot-password", { email });
      setTimer(60);
    } catch (error) {
      console.error("error", error);
      alert("Unable to resend email. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundContainer
      sx={{
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Forced side-by-side on desktop
          width: "100%",
          maxWidth: "1050px",
          minHeight: "600px",
          borderRadius: "32px",
          overflow: "hidden",
          // boxShadow: "0px 30px 90px rgba(27, 47, 116, 0.1)",
        }}
      >
        {/* LEFT SIDE: THE CONTENT AREA */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // backgroundColor: "#fff",
          }}
        >
          {!isSubmitted ? (
            <Fade in={!isSubmitted} timeout={500}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "#1b2f74",
                    mb: 1,
                    fontSize: { xs: "2rem", md: "2.6rem" },
                  }}
                >
                  Forgot Password?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#888", mb: 5, fontWeight: 500 }}
                >
                  NO WORRIES! Enter your email address below, and we'll send you
                  an OTP to reset your password.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, mb: 1.5, color: "#444" }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    variant="outlined"
                    sx={{
                      mb: 4,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        // backgroundColor: "#f8faff",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon sx={{ color: "#1b2f74" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      py: 2,
                      mb: 2.5,
                      backgroundColor: "#1b2f74",
                      borderRadius: "14px",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 700,
                      boxShadow: "0px 10px 25px rgba(27, 47, 116, 0.25)",
                      "&:hover": { backgroundColor: "#14235a" },
                    }}
                  >
                    {loading ? "Sending..." : "Submit"}
                  </Button>
                </Box>
              </Box>
            </Fade>
          ) : (
            <Fade in={isSubmitted} timeout={500}>
              <Box sx={{ textAlign: "center" }}>
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 90, color: "#ff0000", mb: 2 }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: "#1b2f74", mb: 2 }}
                >
                  Check Your Email
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#666", mb: 5, lineHeight: 1.6 }}
                >
                  Verification email sent to: <br />
                  <strong>{email}</strong>. Check your inbox and follow the
                  steps.
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Button
                    disabled={timer > 0}
                    onClick={handleResend}
                    sx={{
                      textTransform: "none",
                      color: "#1b2f74",
                      fontWeight: 800,
                      fontSize: "1rem",
                    }}
                  >
                    {timer > 0 ? `Resend email in ${timer}s` : "Resend Email"}
                  </Button>
                </Box>

                <Button
                  variant="text"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setIsSubmitted(false)}
                  sx={{ textTransform: "none", color: "#aaa" }}
                >
                  Try another email
                </Button>
              </Box>
            </Fade>
          )}

          <Link
            href="/login"
            sx={{
              mt: 4,
              textAlign: "center",
              display: "block",
              textDecoration: "none",
              color: "#1b2f74",
              fontWeight: 800,
              fontSize: "0.9rem",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Back to Login
          </Link>
        </Box>

        {/* RIGHT SIDE: THE ILLUSTRATION */}
        <Box
          sx={{
            flex: 1.2,
            // backgroundColor: "#fcfcff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
            // borderLeft: { md: "1px solid #f0f3f9" },
          }}
        >
          <Box
            component="img"
            src="/forgot-password.gif" // Ensure this file is in your public folder
            alt="Illustration"
            sx={{
              width: "100%",
              height: "auto",
              maxWidth: "500px",
              // filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.06))",
            }}
          />
        </Box>
      </Paper>
    </BackgroundContainer>
  );
};

export default ForgotPassword;
