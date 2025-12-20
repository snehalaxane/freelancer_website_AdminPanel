// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../services/axiosInstance"; // make sure path is correct
// import CommonTable from "../../components/common/Table/CommonTable"; // your table component
// import { CircularProgress, Box, Typography } from "@mui/material";

// const RejectedUsersPage = () => {
//   const [rejectedUsers, setRejectedUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRejectedUsers = async () => {
//       try {
//         setLoading(true);

//         const res = await axiosInstance.get("/api/admin/freelancers");

//         // Filter users with status = "rejected"
//         const rejected = res.data.filter(
//           (user) => user.status?.toLowerCase() === "rejected"
//         );

//         setRejectedUsers(rejected);
//       } catch (err) {
//         console.error("Error fetching rejected users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRejectedUsers();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (rejectedUsers.length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <Typography>No rejected users found.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={2}>
//       <Typography variant="h5" mb={2}>
//         Rejected Users
//       </Typography>

//       {/* Pass rejectedUsers array to your CommonTable */}
//       <CommonTable data={rejectedUsers} />
//     </Box>
//   );
// };

// export default RejectedUsersPage;
