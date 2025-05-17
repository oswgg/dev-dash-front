import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OAuthButtons } from "../components/login/OAuthButtons";
import { LoginForm } from "../components/login/LoginForm";
import { LoginFooter } from "../components/login/LoginFooter";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
    email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const navigate = useNavigate();
    const { handleLogin, getOAuthUrl, loginError, loading } = useAuth();

    const onSubmit = async (data: LoginFormValues) => {
        const success = await handleLogin({
            email: data.email,
            password: data.password
        });

        if (success) navigate("/");
    };

    // this will redirect the user to the oauth provider and then redirect back to the login page but with the code in the url
    const handleOAuthLogin = async (provider: "google" | "github") => {
        const url = await getOAuthUrl(provider);
        window.location.href = url;
    };


    // When the user was redirected back to the login page from the oauth provider.
    // If the code is in the url, navigate to the oauth callback page
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");
        const state = query.get("state");
        const error = query.get("error");

        if (code) {
            navigate(`/oauth/${'google'}?code=${code}&state=${state}`); // TODO: just google for now
        }

    }, []);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
                    <CardDescription>
                        Use your email and password or login with a provider
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">


                    <OAuthButtons isLoading={loading} onOAuthLogin={handleOAuthLogin} />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                or
                            </span>
                        </div>
                    </div>
                    <LoginForm form={form} error={loginError} onSubmit={onSubmit} isLoading={loading} />
                </CardContent>
                <CardFooter>
                    <LoginFooter />
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
