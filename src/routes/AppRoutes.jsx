import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthPage = lazy(() => import('../pages/AuthPage'));
const SuperAdminHome = lazy(() => import('../pages/superadmin/SuperAdminHome'));
const StaffPage = lazy(() => import('../pages/superadmin/StaffPage'));
const StudentsPage = lazy(() => import('../pages/superadmin/StudentsPage'));
const StaffHomePage = lazy(() => import('../pages/staff/StaffHomePage'));

function ProtectedRoute({ children, allowedRoles }) {
  const { user, token } = useSelector((state) => state.auth);
  console.log("user",user);
  console.log("token",token);
  if (!user || !token) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <StaffPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staffhome"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <StaffHomePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRoutes; 