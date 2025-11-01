import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;

