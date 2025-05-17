import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const LoginForm = ({ form, error, onSubmit, isLoading }) => (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="sample@mail.com" type="email" {...field} disabled={isLoading} />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        {/* ...spinner svg... */}
                        Logging in
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Login
                    </div>
                )}
            </Button>
        </form>
    </Form>
);