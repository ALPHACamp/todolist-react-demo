import { createContext } from 'react';
import { register } from 'api/auth';

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
        register: (data) => {
          register({
            email: data.email,
            username: data.username,
            password: data.password,
          })
            .then(({ authToken }) => {
              localStorage.setItem('authToken', authToken);
              setAuthToken(authToken);
            })
            .catch((error) => {
              console.error(error);
            });
        },
        login: (data) => {},
        logout: () => {},
      }}
    ></AuthContext.Provider>
  );
};
