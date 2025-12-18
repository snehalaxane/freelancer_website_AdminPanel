// import { Box, Container } from "@mui/material";

// const AuthLayout = ({ children }) => {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "background.default",
//       }}
//     >
//       <Container maxWidth="sm">{children}</Container>
//     </Box>
//   );
// };

// export default AuthLayout;

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return <Outlet />;
};

export default AuthLayout;
