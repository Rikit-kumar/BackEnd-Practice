import { createContext, useState } from "react";

export const AuthContextStore = createContext()

export const AuthContextProvider = ({children})=>{

    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthContextStore.Provider value={{showPassword, setShowPassword}}>{children}</AuthContextStore.Provider>
    )
}