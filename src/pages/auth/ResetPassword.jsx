import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  keyframes,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// --- ANIMATIONS ---
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail")?.trim();
  console.log("Email from localStorage:", email);

  const [show, setShow] = useState({
    tempCode: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleShow = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const [form, setForm] = useState({
    tempCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      if (!PASSWORD_REGEX.test(value)) {
        setErrors((prev) => ({
          ...prev,
          newPassword: "Min 8 chars, 1 letter, 1 number & 1 special character",
        }));
      } else {
        setErrors((prev) => ({ ...prev, newPassword: "" }));
      }
    }

    if (name === "confirmPassword") {
      if (value !== form.newPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Reset session expired. Please request password reset again.");
      navigate("/forgot-password");
      return;
    }
    if (!PASSWORD_REGEX.test(form.newPassword)) {
      alert("Password does not meet security requirements.");
      return;
    }
    console.log("Reset payload:", {
      email,
      tempCode: form.tempCode,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });

    try {
      setLoading(true);

      await publicAxios.post("/api/admin/reset-password", {
        email,
        tempCode: form.tempCode,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });
      setIsChanged(true);
      localStorage.removeItem("resetEmail");
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundContainer
      sx={{
        display: "flex",
        alignItems: "center", // Vertically centers the form
        justifyContent: "center", // Horizontally centers the form
        minHeight: "100vh", // <--- THIS ENSURES FULL HEIGHT
        width: "100vw", // Ensures full width
        p: { xs: 2, md: 0 }, // Small padding on mobile only
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "200%",
          maxWidth: "1050px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {/* ================= LEFT ILLUSTRATION ================= */}
        <Box
          sx={{
            flex: 1.2,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            animation: `${float} 5s ease-in-out infinite`,
          }}
        >
          <Box
            component="img"
            src="/reset-password(2).png"
            alt="Reset Illustration"
            sx={{ width: "100%", maxWidth: "950px" }}
          />
        </Box>

        {/* ================= RIGHT FORM ================= */}
        <Paper
          elevation={20}
          sx={{
            flex: 1,
            width: { xs: "100%", sm: "100%", md: 620 },
            // height: { xs: "100%", md: 580 },
            height: "200%",
            p: { xs: 3, sm: 14, md: 9 },
            mr: { xs: 0, md: "-20%" },
            borderRadius: { xs: "20px", md: "32px" },
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: { md: "translateY(-5px)" },
            },
          }}
        >
          {!isChanged ? (
            <Fade in={!isChanged}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#1b2f74",
                    mb: 4,
                    fontSize: { xs: "1.4rem", md: "2rem" },
                  }}
                >
                  Create New Password
                </Typography>

                <Typography sx={{ color: "#777", mb: 4 }}>
                  Please enter the temporary code sent to your email and choose
                  a strong new password.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  {/* TEMP PASSWORD */}
                  <TextField
                    fullWidth
                    required
                    label="Temporary Code"
                    name="tempCode"
                    type={show.tempCode ? "text" : "password"}
                    value={form.tempCode}
                    onChange={handleChange}
                    sx={{
                      mb: 2.5,
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
                            onClick={() => toggleShow("tempCode")}
                            edge="end"
                          >
                            {show.tempCode ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* NEW PASSWORD */}
                  <TextField
                    fullWidth
                    required
                    label="New Password"
                    name="newPassword"
                    type={show.newPassword ? "text" : "password"}
                    value={form.newPassword}
                    onChange={handleChange}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword}
                    sx={{
                      mb: 2.5,
                      "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => toggleShow("newPassword")}
                            edge="end"
                          >
                            {show.newPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* CONFIRM PASSWORD */}
                  <TextField
                    fullWidth
                    required
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={show.confirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    sx={{
                      mb: 4,
                      "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => toggleShow("confirmPassword")}
                            edge="end"
                          >
                            {show.confirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="contained"
                    sx={{
                      py: 2,
                      backgroundColor: "#1b2f74", // Changed to match your primary brand color
                      borderRadius: "14px",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": { backgroundColor: "#14235a" },
                    }}
                  >
                    {loading ? "Updating..." : "Reset Password"}
                  </Button>
                </Box>
              </Box>
            </Fade>
          ) : (
            <Fade in={isChanged}>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 90, color: "#4caf50", mb: 2 }}
                />
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                  All Set!
                </Typography>
                <Typography sx={{ color: "#666", mb: 4 }}>
                  Your password has been reset successfully. <br /> You can now
                  login with your new credentials.
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    py: 2,
                    borderRadius: "14px",
                    fontWeight: 700,
                    backgroundColor: "#1b2f74",
                  }}
                >
                  Continue to Login
                </Button>
              </Box>
            </Fade>
          )}

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mt: 3,
              textTransform: "none",
              color: "#1b2f74",
              fontWeight: 700,
              width: "100%",
            }}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    </BackgroundContainer>
  );
};

export default ResetPassword;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import publicAxios from "../../services/publicAxios";

// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   Paper,
//   IconButton,
//   Fade,
//   keyframes,
// } from "@mui/material";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// // --- ANIMATIONS ---
// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-15px); }
//   100% { transform: translateY(0px); }
// `;

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const email = localStorage.getItem("resetEmail")?.trim();
//   console.log("Email from localStorage:", email);

//   const [show, setShow] = useState({
//     tempCode: false,
//     newPassword: false,
//     confirmPassword: false,
//   });

//   const toggleShow = (field) => {
//     setShow((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const [isChanged, setIsChanged] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const PASSWORD_REGEX =
//     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//   const [form, setForm] = useState({
//     tempCode: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     newPassword: "",
//     confirmPassword: "",
//   });

//     if (name === "confirmPassword") {
//       if (value !== form.newPassword) {
//         setErrors((prev) => ({
//           ...prev,
//           confirmPassword: "Passwords do not match",
//         }));
//       } else {
//         setErrors((prev) => ({ ...prev, confirmPassword: "" }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       alert("Reset session expired. Please request password reset again.");
//       navigate("/forgot-password");
//       return;
//     }
//     if (!PASSWORD_REGEX.test(form.newPassword)) {
//       alert("Password does not meet security requirements.");
//       return;
//     }

//                       fontWeight: 700,
//                       textTransform: "none",
//                       fontSize: "1rem",
//                       "&:hover": { backgroundColor: "#14235a" },
//                     }}
//                   >
//                     {loading ? "Updating..." : "Reset Password"}
//                   </Button>
//                 </Box>
//               </Box>
//             </Fade>
//           ) : (
//             <Fade in={isChanged}>
//               <Box sx={{ textAlign: "center", py: 4 }}>
//                 <CheckCircleOutlineIcon
//                   sx={{ fontSize: 90, color: "#4caf50", mb: 2 }}
//                 />
//                 <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
//                   All Set!
//                 </Typography>
//                 <Typography sx={{ color: "#666", mb: 4 }}>
//                   Your password has been reset successfully. <br /> You can now
//                   login with your new credentials.
//                 </Typography>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={() => navigate("/login")}
//                   sx={{
//                     py: 2,
//                     borderRadius: "14px",
//                     fontWeight: 700,
//                     backgroundColor: "#1b2f74",
//                   }}
//                 >
//                   Continue to Login
//                 </Button>
//               </Box>
//             </Fade>
//           )}

//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(-1)}
//             sx={{
//               mt: 3,
//               textTransform: "none",
//               color: "#1b2f74",
//               fontWeight: 700,
//               width: "100%",
//             }}
//           >
//             Go Back
//           </Button>
//         </Paper>
//       </Box>
//     </BackgroundContainer>
//   );
// };

// export default ResetPassword;
