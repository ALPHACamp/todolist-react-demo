import { createContext, useEffect, useState, useContext } from 'react';
import { register, login, logout } from 'api/auth';
import * as jwt from 'jsonwebtoken';

const defaultAuthContext = {
  isAuthenticated: false,
  authToken: null,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ?? null;
  });
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    if (!authToken) {
      setPayload(null);
      setIsAuthenticated(false);
    }
    const tempPayload = jwt.decode(authToken);

    if (tempPayload) {
      setPayload(tempPayload);
      setIsAuthenticated(true);
    } else {
      setPayload(null);
      setIsAuthenticated(false);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
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
        login: (data) => {
          login({
            username: data.username,
            password: data.password,
          })
            .then((res) => {
              localStorage.setItem('authToken', res.authToken);
              setAuthToken(res.authToken);
            })
            .catch((error) => {
              console.error(error);
            });
        },
        logout: () => {
          logout();
          setAuthToken(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
