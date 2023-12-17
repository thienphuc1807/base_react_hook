import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../App.scss";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function Header() {
    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Log out success!");
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand>CiKey's App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {((user && user.auth) || window.location.pathname === "/") && (
                    <>
                        <Nav id="navigation" className="me-auto">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/user" className="nav-link">
                                List User
                            </NavLink>
                        </Nav>
                        <Nav>
                            {user && user.email && (
                                <span className="nav-link">
                                    Welcome {user.email}
                                </span>
                            )}
                            <NavDropdown
                                title="Setting"
                                id="basic-nav-dropdown"
                            >
                                {user && user.auth === true ? (
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                ) : (
                                    <Link to="/login" className="dropdown-item">
                                        Login
                                    </Link>
                                )}
                            </NavDropdown>
                        </Nav>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
