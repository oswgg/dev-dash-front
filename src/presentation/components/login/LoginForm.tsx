import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const LoginForm = ({ form, onSubmit, isLoading }) => (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                            <Input placeholder="ejemplo@correo.com" type="email" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        {/* ...spinner svg... */}
                        Iniciando sesión...
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Iniciar sesión
                    </div>
                )}
            </Button>
        </form>
    </Form>
);