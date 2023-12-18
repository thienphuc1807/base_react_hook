import { Routes, Route } from "react-router-dom";
import TableUsers from "../components/TableUsers";
import Home from "../components/Home";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "./NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route
                path="/user"
                element={
                    <PrivateRoutes>
                        <TableUsers />
                    </PrivateRoutes>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
