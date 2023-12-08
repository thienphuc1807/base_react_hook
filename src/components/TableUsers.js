import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userServices";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import "../App.scss";

function TableUsers() {
    const [listUser, setListUser] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [showEdit, setShowEdit] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

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
        setShowEdit(false);
        setShowAddNew(false);
    };

    const handlePageClick = (e) => {
        getUser(e.selected + 1);
    };

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser]);
    };

    const handleEditUser = (user) => {
        setShowEdit(true);
        setDataUserEdit(user);
    };

    return (
        <>
            <div className="d-flex mb-4 justify-content-between align-items-center">
                <h1>List User</h1>
                <button
                    className="btn btn-success"
                    onClick={() => setShowAddNew(true)}
                >
                    Add New User
                </button>
            </div>
            <ModalAddUser
                showAddNew={showAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                showEdit={showEdit}
                handleClose={handleClose}
                // handleUpdateTable={handleUpdateTable}
                dataUserEdit={dataUserEdit}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
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
                                <td className="d-flex gap-3 px-3">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
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
