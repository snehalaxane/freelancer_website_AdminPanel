// import { styled, Box, Paper, TextField } from "@mui/material";

// // Colors for consistency
// const PRIMARY_BLUE = "#1b2f74";
// const ACCENT_RED = "#ff0000";

// export const BackgroundContainer = styled(Box)({
//   height: "100vh",
//   width: "100vw",
//   display: "flex",
//   overflow: "hidden",
//   position: "fixed",
//   top: 0,
//   left: 0,
// });

// export const LeftHalf = styled(Box)(({ theme }) => ({
//   flex: 1.2, // Slightly wider left side for the brand message
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   padding: "0 8%",
//   backgroundColor: PRIMARY_BLUE,
//   color: "#ffffff",
//   position: "relative",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background:
//       "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
//   },
//   [theme.breakpoints.down("md")]: {
//     display: "none",
//   },
// }));

// export const RightHalf = styled(Box)({
//   flex: 1,
//   height: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: "#fff", // Very light blue/grey background
// });

// export const LoginCard = styled(Paper)({
//   padding: "40px",
//   width: "100%",
//   maxWidth: "480px",
//   borderRadius: "32px",
//   boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.05)", // Soft shadow
//   backgroundColor: "#ffffff",
//   // border: "1px solid rgba(224, 224, 224, 0.5)",
// });

// export const StyledTextField = styled(TextField)({
//   marginBottom: "20px",
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "16px",
//     backgroundColor: "#ffffff",
//     transition: "all 0.3s ease",
//     "& fieldset": { borderColor: "#e2e8f0" },
//     "&:hover fieldset": { borderColor: PRIMARY_BLUE },
//     "&.Mui-focused fieldset": { borderColor: PRIMARY_BLUE, borderWidth: "2px" },
//   },
//   "& .MuiInputLabel-root": {
//     color: "#64748b",
//     fontSize: "0.9rem",
//     "&.Mui-focused": { color: PRIMARY_BLUE },
//   },
// });

import { styled, Box, Paper, TextField, keyframes } from "@mui/material";

const PRIMARY_BLUE = "#1b2f74";
// Animations for that "Real-tffime" feel
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const BackgroundContainer = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  background: `linear-gradient(155deg, ${PRIMARY_BLUE} 0%, #fff 200%)`,
  overflow: "hidden",
  position: "relative",
});

export const LeftHalf = styled(Box)({
  flex: 1.2,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 4%",
  zIndex: 2,
  "@media (max-width: 1500px)": { display: "none" },
});

export const RightHalf = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  "@media (max-width: 1024px)": {
    flex: "1 1 100%",
  },
});

// The "Boy" Illustration wrapper
export const IllustrationWrapper = styled(Box)({
  width: "100%",
  maxWidth: "600px",
  animation: `${float} 4s ease-in-out infinite`,
  marginBottom: "1px",
  "& img": {
    width: "90%",
    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
  },
});

export const DecorativeShape = styled(Box)(
  ({ size, top, left, bottom, right, opacity, speed = "10s" }) => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    border: `2px dashed #ff0000`,
    opacity: opacity || 0.2,
    top,
    left,
    bottom,
    right,
    zIndex: 1,
    animation: `${rotate} ${speed} linear infinite`,
  })
);

// THIS WAS MISSING AND CAUSED YOUR ERROR
export const LoginCard = styled(Paper)({
  padding: "48px",
  width: "100%",
  maxWidth: "580px",
  borderRadius: "28px",
  textAlign: "center",
  boxShadow: "0px 24px 48px rgba(0,0,0,0.4)",
  backgroundColor: "rgba(255, 255, 255, 1)",
  margin: "20px",
});

// THIS WAS ALSO MISSING
export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    transition: "all 0.2s",
    "& fieldset": { borderColor: "#e2e8f0" },
    "&:hover fieldset": { borderColor: "#cbd5e1" },
    "&.Mui-focused fieldset": { borderColor: PRIMARY_BLUE },
  },
});
