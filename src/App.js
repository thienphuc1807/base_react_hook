import "./App.scss";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
    const dataUserRedux = useSelector((state) => state.user.account);
    const { loginContext } = useContext(UserContext);
    console.log(dataUserRedux);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            loginContext(
                localStorage.getItem("email"),
                localStorage.getItem("token")
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Header />
            <AppRoutes />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Container>
    );
}

export default App;
