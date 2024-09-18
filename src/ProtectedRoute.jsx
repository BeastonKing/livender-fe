import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return children;
};
export default ProtectedRoute