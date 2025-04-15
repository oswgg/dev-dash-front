import Home from "@/presentation/pages/Home";
import "./index.css"
import { AuthProvider } from "./presentation/context/auth.context";

function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-gray-100">
                <Home />
            </div>
        </AuthProvider>
    );
}

export default App;