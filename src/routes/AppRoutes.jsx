import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";

const Login = lazy(() => import("../pages/auth/Login/"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const FreelancerDetails = lazy(() =>
  import("../pages/requests/FreelancerDetails")
);
const RoleManagement = lazy(() => import("../pages/roleManagement/roles"));
const AddStaff = lazy(() => import("../pages/roleManagement/add-staff"));
const Clients = lazy(() => import("../pages/users/clients"));
const Categories = lazy(() => import("../pages/category/Categories/"));
const Subcategories = lazy(() => import("../pages/subcategory/Subcategories"));
const Freelancers = lazy(() => import("../pages/requests/freelancers"));
const Organisations = lazy(() => import("../pages/requests/organisations"));
const OrganisationDetails = lazy(() =>
  import("../pages/requests/OrganisationDetails")
);
const RejectedFreelancers = lazy(() => import("../pages/rejected/freelancers"));
const BlockedFreelancers = lazy(() => import("../pages/blocked/freelancers"));
const RejectedOrganisations = lazy(() =>
  import("../pages/rejected/organisations")
);
const BlockedOrganisations = lazy(() =>
  import("../pages/blocked/organisations")
);

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      }
    >
      <Routes>
        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/clients" element={<Clients />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/subcategories" element={<Subcategories />} />
          <Route path="/roleManagement/roles" element={<RoleManagement />} />
          <Route path="/roleManagement/add-staff" element={<AddStaff />} />
          <Route path="/requests/freelancers" element={<Freelancers />} />
          <Route
            path="/rejected/freelancers"
            element={<RejectedFreelancers />}
          />
          <Route path="/blocked/freelancers" element={<BlockedFreelancers />} />
          <Route
            path="/requests/freelancers/:id"
            element={<FreelancerDetails />}
          />
          <Route path="/requests/organisations" element={<Organisations />} />
          <Route
            path="/requests/organisations/:id"
            element={<OrganisationDetails />}
          />
          <Route
            path="/rejected/organisations"
            element={<RejectedOrganisations />}
          />
          <Route
            path="/blocked/organisations"
            element={<BlockedOrganisations />}
          />
        </Route>

        {/* 🌍 GLOBAL FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
