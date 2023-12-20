import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

function PrivateRoutes({ children }) {
    const user = useSelector((state) => state.user.account);
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
