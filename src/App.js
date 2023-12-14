import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Container>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<TableUsers />} />
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
