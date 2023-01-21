/* eslint-disable no-restricted-globals */
import React, {
  createContext, PropsWithChildren, useContext, useEffect, useMemo, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router';

import { api } from 'shared';

interface User {}
interface Auth {
    token: string;
    onLogin:(user: User)=>Promise<void>;
    onLogout:()=>void;
}
const AuthContext = createContext<Auth>({} as Auth);

const useAuth = () => ({ ...useContext(AuthContext) });

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const origin = location.state?.from?.pathname || '/';
  const [token, setToken] = useState('');

  const value = useMemo(() => {
    const handleLogout = () => {
      setToken('');
      api.auth.logout();
    };

    const handleLogin = async (credentials: User) => {
      await api.auth.login(credentials).then((gotToken) => {
        localStorage.setItem('token', gotToken);
        setToken(gotToken);
      });
      navigate(origin);
    };
    return ({
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
    });
  }, [token, navigate, origin]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
const withAuth = (component: ()=> React.ReactNode) => () => (
  <AuthProvider>
    {component()}
  </AuthProvider>
);
export { withAuth, useAuth };
