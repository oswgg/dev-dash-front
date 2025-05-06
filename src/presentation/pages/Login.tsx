import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/presentation/context/auth.context";
import { OAuthButtons } from "../components/login/OAuthButtons";
import { LoginForm } from "../components/login/LoginForm";
import { LoginFooter } from "../components/login/LoginFooter";
import { useLogin } from "../hooks/useLogin";

const loginSchema = z.object({
    email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const navigate = useNavigate();
    const { handleLogin, loginError, loginLoading } = useLogin();
    const { isAuthenticated }  = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        const success = await handleLogin({
            email: data.email,
            password: data.password
        });
        
        if (success) navigate("/");
    };

    const handleOAuthLogin = async (provider: "google" | "github") => {
        console.log(provider);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales o usa un proveedor de autenticación
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <OAuthButtons isLoading={loginLoading} onOAuthLogin={handleOAuthLogin} />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                O continúa con
                            </span>
                        </div>
                    </div>
                    <LoginForm form={form} onSubmit={onSubmit} isLoading={loginLoading} />
                </CardContent>
                <CardFooter>
                    <LoginFooter />
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
