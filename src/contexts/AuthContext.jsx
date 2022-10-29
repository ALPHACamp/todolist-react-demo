import { createContext, useEffect, useState, useContext } from 'react';
import { register, login, checkPermission } from 'apis/auth';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
          const { success, authToken } = await register({
            email: data.email,
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          localStorage.setItem('authToken', authToken);
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            email: data.email,
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          localStorage.setItem('authToken', authToken);
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setIsAuthenticated(null);
          setPayload(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
