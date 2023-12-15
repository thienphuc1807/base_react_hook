import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    return (
        <Container>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<TableUsers />} />
                <Route path="/login" element={<Login />} />
            </Routes>

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
