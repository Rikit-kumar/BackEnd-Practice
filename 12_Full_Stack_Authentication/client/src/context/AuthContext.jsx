import { createContext, useState } from "react";
import { setAccessToken } from "../services/api";
import { loginUser } from "../services/auth.service";

export const AuthContextStore = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [accessToken, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    const updateAccessToken = (token)=>{
        setToken(token);
        setAccessToken(token)
    }

    const login = async (data)=>{
        const result = await loginUser(data);

        updateAccessToken(result.accessToken);
        setUser(result.user)

        return  result.user
    }

  return (
    <AuthContextStore.Provider value={{user, accessToken, loading, login}}>
      {children}
    </AuthContextStore.Provider>
  );
};
