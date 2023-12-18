import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";

function PrivateRoutes({ children }) {
    const { user } = useContext(UserContext);
    if (user && !user.auth) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Access Denied!</Alert.Heading>
                <p>You don't have permission to access!</p>
            </Alert>
        );
    }
    return <>{children}</>;
}

export default PrivateRoutes;
