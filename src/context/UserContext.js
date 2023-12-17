import { useState, createContext } from "react";

const UserContext = createContext({ email: "", auth: false });

function UserProvider({ children }) {
    const [user, setUser] = useState({ email: "", auth: false });

    const loginContext = (email, token) => {
        setUser({ email: email, auth: true });
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setUser({ email: "", auth: false });
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
