import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";




const Home = () => {
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
