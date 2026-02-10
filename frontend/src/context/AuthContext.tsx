import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    email: string;
    user_name: string;
    permissions: number[];
}

type AuthContextType = {
    user: User | null;
    login: (data: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider( {children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (data: any) => {
        localStorage.setItem("access", data.access)
        localStorage.setItem("refresh", data.refresh)
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user)
    }

    const logout = () => {
        localStorage.clear()
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{ user,login,logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}