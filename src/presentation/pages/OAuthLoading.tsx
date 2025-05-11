import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";





const OAuthLoading = () => {
    const navigate = useNavigate();
    const { registerWithOAuthCode, loading, loginError } = useAuth();

    const query = new URLSearchParams(window.location.search);

    useEffect(() => {
        const code = query.get("code");
        const state = query.get("state");

        const register = async () => {
            if (!code) return;

            const success = await registerWithOAuthCode("google", code, state);

            if (success) navigate("/");
        }
        register();
    }, []);
    

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-md shadow-lg">
                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            {
                                loading && <div className="bg-background px-2 text-muted-foreground">
                                    Cargando...
                                </div>
                            }
                            
                            { 
                                loginError && <div className="bg-background px-2 text-muted-foreground">
                                    {loginError}
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}


export default OAuthLoading;