import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    // const isAuthenticated = localStorage.getItem("authToken"); // or your auth state
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        return <Navigate to="/authform" replace />;
    }

    return children;
};

export default ProtectedRoute;
