import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../App.scss";
import { toast } from "react-toastify";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        toast.success("Log out success!");
    };
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand>CiKey's App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav id="navigation" className="me-auto">
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>
                    <NavLink to="/user" className="nav-link">
                        List User
                    </NavLink>
                </Nav>
                <Nav>
                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                        <Link to="/login" className="dropdown-item">
                            Login
                        </Link>
                        <NavDropdown.Item onClick={handleLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
