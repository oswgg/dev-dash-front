import Home from "@/presentation/pages/Home";
import "./index.css"
import Header from "./presentation/components/Header";
import { AuthProvider } from "./presentation/context/auth.context";

function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <Home />
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;