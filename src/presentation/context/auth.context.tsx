import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    authError: string | null;
    setAuthError: (error: string | null) => void;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    authError: null,
    setAuthError: () => {},
    login: () => {},
    logout: () => {},
});
    

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [authError, setAuthError] = useState<string | null>(null);
    
    const login = (token: string) => {
        setToken(token);
        setAuthError(null);
        localStorage.setItem('token', token);
    }
    
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    }
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!token,
                authError,
                setAuthError,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);