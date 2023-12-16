import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnglesLeft,
    faEye,
    faEyeSlash,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userLogin } from "../services/userServices";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email and password is required!");
            return;
        }
        setLoadingAPI(true);
        let res = await userLogin(email, password);
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoadingAPI(false);
    };
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
                onClick={() => handleLogin()}
            >
                {loadingAPI ? (
                    <FontAwesomeIcon className="spinner" icon={faSpinner} />
                ) : (
                    <>Log in</>
                )}
            </button>
            <button className="btn">
                <FontAwesomeIcon icon={faAnglesLeft} className="me-2" />
                Go back
            </button>
        </div>
    );
}

export default Login;
