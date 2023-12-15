import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnglesLeft,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="d-flex flex-column mx-auto col-12 col-lg-4">
            <h1 className="text-center">Login</h1>
            <p className="m-0 fw-bold">Email or Username</p>
            <input
                className="mb-2 p-2 border border-2 rounded"
                type="email"
                placeholder="Enter username ..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="position-relative">
                <input
                    className="mb-2 p-2 border border-2 rounded w-100"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password ..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <FontAwesomeIcon
                    className="position-absolute icon-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? faEye : faEyeSlash}
                />
            </div>
            <button
                className={
                    email && password
                        ? "btn btn-danger my-2 py-2"
                        : "btn btn-secondary my-2 py-2"
                }
                disabled={email && password ? false : true}
            >
                Log in
            </button>
            <button className="btn">
                <FontAwesomeIcon icon={faAnglesLeft} className="me-2" />
                Go back
            </button>
        </div>
    );
}

export default Login;
