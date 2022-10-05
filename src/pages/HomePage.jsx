import { useAuth } from 'contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default HomePage;
