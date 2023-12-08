import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userServices";

function TableUsers(props) {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        let res = await fetchAllUser();
        if (res && res.data) {
            setListUser(res.data);
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {listUser &&
                    listUser.length > 0 &&
                    listUser.map((user, index) => (
                        <tr key={`user-${index}`}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}

export default TableUsers;
