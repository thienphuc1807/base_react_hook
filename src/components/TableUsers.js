import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userServices";
import ReactPaginate from "react-paginate";

function TableUsers(props) {
    const [listUser, setListUser] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getUser(1);
    }, []);

    const getUser = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalPages(res.total_pages);
            setListUser(res.data);
        }
    };

    const handlePageClick = (e) => {
        getUser(e.selected + 1);
    };

    return (
        <>
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
            <ReactPaginate
                className="d-flex gap-3 text-decoration-none list-unstyled justify-content-center "
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default TableUsers;
