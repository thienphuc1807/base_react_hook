import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userServices";
import ReactPaginate from "react-paginate";
import ModalUser from "./ModalUser";
import "../App.scss";

function TableUsers() {
    const [listUser, setListUser] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [show, setShow] = useState(false);

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

    const handleClose = () => {
        setShow(false);
    };

    const handlePageClick = (e) => {
        getUser(e.selected + 1);
    };

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser]);
    };

    return (
        <>
            <div className="d-flex mb-4 justify-content-between align-items-center">
                <h1>List User</h1>
                <button
                    className="btn btn-success"
                    onClick={() => setShow(true)}
                >
                    Add New User
                </button>
            </div>
            <ModalUser
                show={show}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
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
                className="react-paginate"
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
