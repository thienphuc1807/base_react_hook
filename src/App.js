import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function App() {
    return (
        <Container>
            <Row>
                <Col>
                    <Header />
                    <TableUsers />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
