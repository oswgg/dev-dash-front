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

    // Add this effect to auto-clear the error after 5 seconds
    useEffect(() => {
        if (authError) {
            const timer = setTimeout(() => {
                setAuthError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [authError]);

    const login = (token: string) => {
        setToken(token);
        setAuthError(null);
        localStorage.setItem('token', token);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setAuthError('Your session has expired. Please login again.');
        window.location.reload();
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
            {
                authError &&
                <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
                    <div className="bg-muted text-white rounded-lg shadow-lg px-6 py-4 min-w-[250px] max-w-xs"> <p className="text-sm">{authError}</p>
                    </div>
                </div>
            }
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);