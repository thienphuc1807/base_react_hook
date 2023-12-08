import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalUser from "./components/ModalUser";
import { useState } from "react";
function App() {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    return (
        <Container>
            <Row>
                <Col>
                    <Header />
                    <div className="d-flex mb-4 justify-content-between align-items-center">
                        <h1>List User</h1>
                        <button
                            className="btn btn-success"
                            onClick={() => setShow(true)}
                        >
                            Add New User
                        </button>
                    </div>
                    <TableUsers />
                </Col>
            </Row>
            <ModalUser show={show} handleClose={handleClose} />
        </Container>
    );
}

export default App;
