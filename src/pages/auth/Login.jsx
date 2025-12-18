// import React, { useState } from "react";
// import axiosInstance from "../../services/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Snackbar,
//   Alert,
//   Button,
//   IconButton,
//   InputAdornment,
//   CircularProgress,
//   Link,
//   Divider,
// } from "@mui/material";
// import { Visibility, VisibilityOff, Google, Apple } from "@mui/icons-material";
// import {
//   BackgroundContainer,
//   LeftHalf,
//   RightHalf,
//   LoginCard,
//   StyledTextField,
// } from "./Login.styles";

// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [toast, setToast] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleCloseToast = () => setToast((prev) => ({ ...prev, open: false }));

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password) {
//       setToast({
//         open: true,
//         message: "Email and password are required",
//         severity: "warning",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // ✅ Trim values and send correct JSON
//       const payload = {
//         email: form.email.trim(),
//         password: form.password.trim(),
//       };
//       console.log("Sending login payload:", payload);

//       const response = await axiosInstance.post("/api/admin/login", payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = response.data;

//       if (!data.token) throw new Error("Invalid login credentials");

//       // Store token and admin data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("adminEmail", form.email);
//       localStorage.setItem("admin", JSON.stringify(data.admin));

//       setToast({
//         open: true,
//         message: "Login successful! Redirecting...",
//         severity: "success",
//       });

//       setTimeout(() => navigate("/dashboard", { replace: true }), 800);
//     } catch (error) {
//       console.error("Login error:", error.response || error.message);
//       setToast({
//         open: true,
//         message:
//           error.response?.data?.message || error.message || "Login failed",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <BackgroundContainer>
//       {/* LEFT SIDE */}
//       <LeftHalf>
//         <Box sx={{ zIndex: 3 }}>
//           <Box component="img" src="/logo.png" sx={{ height: 100, mb: 8 }} />
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 600,
//               mb: 4,
//               color: "#fff",
//               textShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//             }}
//           >
//             Management is about arranging the stars. <br />
//             Leadership is about helping them shine.
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: "1.2rem",
//               color: "rgba(255,255,255,0.8)",
//               maxWidth: "450px",
//               fontStyle: "italic",
//               borderLeft: "2px solid rgba(255,255,255,0.2)",
//               pl: 3,
//             }}
//           >
//             "The best way to predict the future is to create it. You are the
//             architect of this marketplace."
//           </Typography>
//         </Box>
//       </LeftHalf>

//       {/* RIGHT SIDE */}
//       <RightHalf>
//         <LoginCard>
//           <Typography variant="h4" fontWeight={700} mb={2}>
//             Welcome Back
//           </Typography>
//           <Typography color="text.secondary" mb={4}>
//             Login to access your dashboard
//           </Typography>

//           <Box display="flex" gap={2}>
//             <Button fullWidth variant="outlined" startIcon={<Google />}>
//               Google
//             </Button>
//             <Button fullWidth variant="outlined" startIcon={<Apple />}>
//               Apple
//             </Button>
//           </Box>

//           <Divider sx={{ my: 4 }}>OR</Divider>

//           <Box component="form" onSubmit={handleLogin}>
//             <Typography fontWeight={600} mb={1}>
//               Email
//             </Typography>
//             <StyledTextField
//               fullWidth
//               name="email"
//               type="email"
//               placeholder="admin@gmail.com"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />

//             <Typography fontWeight={600} mt={3} mb={1}>
//               Password
//             </Typography>
//             <StyledTextField
//               fullWidth
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               value={form.password}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setShowPassword(!showPassword)}
//                       size="small"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* NEW: ROW FOR REMEMBER ME & FORGOT PASSWORD */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 3,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   style={{ accentColor: "#1b2f74", cursor: "pointer" }}
//                 />
//                 <Typography
//                   component="label"
//                   htmlFor="remember"
//                   variant="body2"
//                   sx={{ ml: 1, cursor: "pointer", color: "text.secondary" }}
//                 >
//                   Remember me
//                 </Typography>
//               </Box>
//               <Link
//                 component="button"
//                 type="button"
//                 variant="body2"
//                 onClick={() => navigate("/forgot-password")}
//                 sx={{
//                   color: "#1b2f74",
//                   fontWeight: 600,
//                   textDecoration: "none",
//                 }}
//               >
//                 Forgot password?
//               </Link>
//             </Box>

//             <Button
//               type="submit"
//               fullWidth
//               disabled={loading}
//               sx={{
//                 mt: 3,
//                 py: 1.8,
//                 bgcolor: "#1b2f74",
//                 color: "#fff",
//                 borderRadius: 2,
//                 fontWeight: 700,
//                 "&:hover": { bgcolor: "#0a1947" },
//               }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Login"
//               )}
//             </Button>
//           </Box>
//         </LoginCard>
//       </RightHalf>

//       {/* SNACKBAR */}
//       <Snackbar
//         open={toast.open}
//         autoHideDuration={4000}
//         onClose={handleCloseToast}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseToast}
//           severity={toast.severity}
//           variant="filled"
//         >
//           {toast.message}
//         </Alert>
//       </Snackbar>
//     </BackgroundContainer>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Link,
  Divider,
  Avatar,
} from "@mui/material";
import { Visibility, VisibilityOff, Google, Apple } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  BackgroundContainer,
  LeftHalf,
  RightHalf,
  LoginCard,
  StyledTextField,
  IllustrationWrapper,
  DecorativeShape,
} from "./Login.styles";

const PRIMARY_BLUE = "#1b2f74";
const ACCENT_RED = "#ff0000";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseToast = () => setToast((prev) => ({ ...prev, open: false }));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setToast({
        open: true,
        message: "Email and password are required",
        severity: "warning",
      });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password.trim(),
      };
      const response = await axiosInstance.post("/api/admin/login", payload);
      const data = response.data;
      if (!data.token) throw new Error("Invalid login credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("adminEmail", form.email);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      setToast({
        open: true,
        message: "Login successful! Redirecting...",
        severity: "success",
      });
      setTimeout(() => navigate("/dashboard", { replace: true }), 800);
    } catch (error) {
      setToast({
        open: true,
        message:
          error.response?.data?.message || error.message || "Login failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundContainer>
      {/* 1. ANIMATED BACKGROUND SHAPES */}
      <DecorativeShape
        size="450px"
        top="-100px"
        left="-50px"
        opacity={0.1}
        speed="20s"
      />
      <DecorativeShape
        size="200px"
        top="20%"
        left="40%"
        opacity={0.15}
        speed="15s"
      />
      <DecorativeShape
        size="300px"
        bottom="-50px"
        right="5%"
        opacity={0.1}
        speed="25s"
      />

      {/* LEFT SIDE: TEXT & LOGO */}
      <LeftHalf>
        {/* 1. Logo at the top left of the left section */}
        <Box sx={{ position: "absolute", top: 40, left: 40, zIndex: 3 }}>
          <Box component="img" src="/logo.png" sx={{ height: 95 }} />
        </Box>

        {/* 2. Main Illustration */}
        <IllustrationWrapper>
          <img
            src="https://illustrations.popsy.co/white/work-from-home.svg"
            alt="Character Illustration"
          />
        </IllustrationWrapper>

        {/* 3. Text Content */}
        <Box sx={{ textAlign: "center", zIndex: 3 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#fff",
              mb: 2,
              textShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            Empowering <span style={{ color: "#ff0000" }}>Leadership.</span>
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.2rem",
              fontStyle: "italic",
              maxWidth: "500px",
              mx: "auto",
              borderLeft: "3px solid #ff0000",
              pl: 2,
            }}
          >
            Management is about arranging the stars. <br />
            Leadership is about helping them shine.
          </Typography>
        </Box>
      </LeftHalf>

      {/* RIGHT SIDE: LOGIN FORM */}
      <RightHalf>
        <LoginCard elevation={0}>
          <Avatar
            sx={{
              m: "0 auto 16px",
              bgcolor: "#f1f5f9",
              color: PRIMARY_BLUE,
              width: 60,
              height: 60,
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>

          <Typography variant="h4" fontWeight={800} color={PRIMARY_BLUE} mb={1}>
            Welcome Back
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Enter your credentials to access the admin panel
          </Typography>

          <Box display="flex" gap={2} mb={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{
                borderRadius: "10px",
                py: 1,
                textTransform: "none",
                borderColor: "#e2e8f0",
                color: "#64748b",
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Apple />}
              sx={{
                borderRadius: "10px",
                py: 1,
                textTransform: "none",
                borderColor: "#e2e8f0",
                color: "#64748b",
              }}
            >
              Apple
            </Button>
          </Box>

          <Divider sx={{ my: 3, fontSize: "0.75rem", color: "text.secondary" }}>
            OR LOGIN WITH EMAIL
          </Divider>

          <Box component="form" onSubmit={handleLogin} textAlign="left">
            <Typography variant="body2" fontWeight={700} mb={1} ml={0.5}>
              Email Address
            </Typography>
            <StyledTextField
              fullWidth
              name="email"
              type="email"
              placeholder="admin@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ mb: 2.5 }}
            />

            <Typography variant="body2" fontWeight={700} mb={1} ml={0.5}>
              Password
            </Typography>
            <StyledTextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id="remember"
                  style={{
                    accentColor: PRIMARY_BLUE,
                    cursor: "pointer",
                    width: 16,
                    height: 16,
                  }}
                />
                <Typography
                  component="label"
                  htmlFor="remember"
                  variant="body2"
                  sx={{ ml: 1, cursor: "pointer", color: "text.secondary" }}
                >
                  Remember me
                </Typography>
              </Box>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => navigate("/auth/forgot-password")}
                sx={{
                  color: PRIMARY_BLUE,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.8,
                bgcolor: PRIMARY_BLUE,
                color: "#fff",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: ACCENT_RED,
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px rgba(255,0,0,0.2)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </Box>
        </LoginCard>
      </RightHalf>

      {/* SNACKBAR */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ borderRadius: "12px" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </BackgroundContainer>
  );
};

export default Login;
