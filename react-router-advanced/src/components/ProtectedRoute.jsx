import { Navigate } from "react-router-dom";

const useAuth = () => {
    // Simulate authentication check
    const isAuthenticated = localStorage.getItem("auth") === "true";
    return { isAuthenticated };
};

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
