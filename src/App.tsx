import Home from "@/presentation/pages/Home";
import "./index.css"
import { AuthProvider } from "./presentation/context/auth.context";
import { ThemeProvider } from "./presentation/context/theme.context";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <div className="min-h-screen ">
                    <Home />
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;