import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PageLoader from "../../components/common/PageLoader";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <Box
      sx={{
        height: "95vh",
        width: "265%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          width: "100%",
          maxWidth: 550,
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(27, 47, 116, 0.05)",
          textAlign: "center",
        }}
      >
        {!submitted ? (
          <>
            {/* Back Button */}
            <Box textAlign="left" mb={2}>
              <IconButton onClick={() => navigate("/login")} size="small">
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="h5" fontWeight={800} color="#1b2f74" mb={1}>
              Forgot Password?
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              Enter your email address and we'll send you a link to reset your
              password.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="name@company.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon
                          sx={{ color: "action.active", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#1b2f74",
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#ff0000" },
                  }}
                >
                  {loading ? "Sending Link..." : "Send Reset Link"}
                </Button>

                <Button
                  variant="text"
                  onClick={() => navigate("/login")}
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  Back to Sign In
                </Button>
              </Stack>
            </form>
          </>
        ) : (
          <Box py={2}>
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "#059669", mb: 2 }}
            />
            <Typography variant="h5" fontWeight={800} color="#1b2f74" mb={1}>
              Check your email
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              We have sent a password reset link to <br /> <b>{email}</b>
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setSubmitted(false)}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
            >
              Didn't receive the email? Try again
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
