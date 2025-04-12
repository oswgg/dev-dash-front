import Home from "@/presentation/pages/Home";
import "./index.css"
import Header from "./presentation/components/Header";

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Home />
            </main>
        </div>
    );
}

export default App;