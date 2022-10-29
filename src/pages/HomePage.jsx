import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkPermission } from 'apis/auth';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        navigate('/login');
      }
      const result = await checkPermission(authToken);
      if (result) {
        navigate('/todos');
      } else {
        navigate('/login');
      }
    };

    checkTokenIsValid();
  }, [navigate]);
};

export default HomePage;
