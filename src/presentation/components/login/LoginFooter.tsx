import { useNavigate } from "react-router-dom";

export const LoginFooter = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
                <a
                    href="#"
                    className="hover:text-primary underline underline-offset-4"
                    onClick={e => {
                        e.preventDefault();
                        navigate("/forgot-password");
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </a>
            </div>
            <div className="text-sm text-center text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <a
                    href="#"
                    className="hover:text-primary underline underline-offset-4"
                    onClick={e => {
                        e.preventDefault();
                        navigate("/register");
                    }}
                >
                    Regístrate
                </a>
            </div>
        </div>
    );
};