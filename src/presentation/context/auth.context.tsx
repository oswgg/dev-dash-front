import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    authError: string | null;
    setAuthError: (error: string | null) => void;
    login: (token: string) => void;
    logout: () => void;
    getAuthHeader: () => any;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    authError: null,
    setAuthError: () => {},
    login: () => {},
    logout: () => {},
    getAuthHeader: () => {}
});
    

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [authError, setAuthError] = useState<string | null>(null);
    
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);
    
    const login = (token: string) => {
        setToken(token);
        setAuthError(null);
        localStorage.setItem('token', token);
    }
    
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    }
    
    const getAuthHeader = () => {
        return token ? token : ``;
    }
    
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!token,
                authError,
                setAuthError,
                login,
                logout,
                getAuthHeader
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);