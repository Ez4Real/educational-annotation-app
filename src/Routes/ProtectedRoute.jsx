import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'; 
import CircularLoader from '../Components/Loader/index.tsx';
import Main from '../Pages/Main/index.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, userData, loading } = useAuth();

  
  if (!currentUser || !allowedRoles.includes(userData.role)) {
    return <Navigate to="/login" replace />;
  }
  
  if (loading || !userData) { 
    return <CircularLoader />;
  }
  
  return (
    <Main />
  )
};

export default ProtectedRoute;