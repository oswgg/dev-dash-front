import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useAuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";




const Home = () => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Header />
            <Layout>
                <Dashboard />
            </Layout>
        </>
    );
}

export default Home
