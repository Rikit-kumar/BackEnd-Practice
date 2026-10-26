import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContextStore } from "../context/AuthContext";

const MainLayout = () => {
  const { user, loading } = useContext(AuthContextStore);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
