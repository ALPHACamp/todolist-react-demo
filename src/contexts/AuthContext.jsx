import { createContext } from 'react';

const defaultAuthContext = {
  isAuthenticated: false,
  authToken: null,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [payload, setPayload] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
      }}
    ></AuthContext.Provider>
  );
};
