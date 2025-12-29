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
import { useEffect } from "react";

const AuthLayout = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return <Outlet />;
};

export default AuthLayout;
