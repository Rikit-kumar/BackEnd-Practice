import { createContext, useState } from "react";
import { refreshAccessToken, setAccessToken } from "../services/api";
import {
  getCurrectUser,
  loginUser,
  logoutUser,
} from "../services/auth.service";
import { useEffect } from "react";

export const AuthContextStore = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await refreshAccessToken();
        updateAccessToken(token);
        const currentUser = await getCurrectUser();
        setUser(currentUser);
      } catch (error) {
        setAccessToken(null);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const updateAccessToken = (token) => {
    setToken(token);
    setAccessToken(token);
  };

  const login = async (data) => {
    const result = await loginUser(data);

    updateAccessToken(result.accessToken);
    setUser(result.user);

    return result.user;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      updateAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContextStore.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContextStore.Provider>
  );
};
