import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'; 

const RoleBasedRedirect = () => {
  const { userData } = useAuth();

  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  
  switch (userData.role) {
    case 'teacher':
      return <Navigate to="/t" replace />;
    case 'student':
      return <Navigate to="/s" replace />;
  }
};

export default RoleBasedRedirect;