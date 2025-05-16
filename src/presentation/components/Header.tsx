import { Github, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '../context/auth.context';

const Header = () => {
    const { logout } = useAuthContext();

    const handleGoToRepository = () => {
        window.open('https://github.com/oswgg/dev-dash-front', '_blank');
    }

    const handleLogout = () => {
        logout();
        window.location.reload();
    }

    return (
        <header className="border-b border-border bg-card sticky top-0 z-10">
            <div className="mx-auto flex items-center justify-between h-16 px-4 max-w-[1000px]">
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-bold text-primary">DevDash</h1>
                    <span className="text-xs border border-muted rounded-full px-2 py-0.5 text-muted-foreground">Beta</span>
                </div>

                <div className="hidden md:flex flex-1 max-w-md mx-4">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search PRs and tickets..."
                            className="w-full pl-9 bg-muted/40"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" aria-label="GitHub" onClick={handleGoToRepository}>
                        <Github className="h-5 w-5" />
                    </Button>

                    <Button variant="ghost" size="icon" aria-label="Settings">
                        <Settings className="h-5 w-5" />
                    </Button>

                    <Button variant="outline" size="sm" aria-label="Logout" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;