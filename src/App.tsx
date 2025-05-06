import "./index.css"
import { AuthProvider } from "./presentation/context/auth.context";
import { ThemeProvider } from "./presentation/context/theme.context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/presentation/pages/Home";
import Login from "@/presentation/pages/Login";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <div className="min-h-screen ">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<p>Not Found</p>} />
                        </Routes>
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;