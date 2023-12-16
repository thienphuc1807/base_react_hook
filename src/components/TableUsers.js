import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userServices";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import "../App.scss";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
    faArrowUp,
    faCirclePlus,
    faFileExport,
    faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

function TableUsers() {
    const [listUser, setListUser] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [showEdit, setShowEdit] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("");
    const [dataExport, setDataExport] = useState([]);

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
        setShowDelete(false);
    };

    const handlePageClick = (e) => {
        getUser(e.selected + 1);
    };

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser]);
    };

    const handleEditUser = (user) => {
        setShowEdit(true);
        setDataUser(user);
    };

    const handelEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        let index = listUser.findIndex((item) => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        setListUser(cloneListUser);
    };

    const handleDeleteUserFromModal = (id) => {
        let cloneListUser = _.cloneDeep(listUser);
        let index = listUser.findIndex((item) => item.id === id);
        cloneListUser.splice(index, 1);
        setListUser(cloneListUser);
    };

    const handleDeleteUser = (user) => {
        setShowDelete(true);
        setDataUser(user);
    };

    const handleSort = (sort, field) => {
        if (sort && field) {
            setSortBy(sort);
            setSortField(field);
            let cloneListUser = _.cloneDeep(listUser);
            cloneListUser = _.orderBy(listUser, [field], [sort]);
            setListUser(cloneListUser);
        }
    };

    const handleSearch = _.debounce((value) => {
        console.log(value);
        if (value) {
            let cloneListUser = _.cloneDeep(listUser);
            cloneListUser = cloneListUser.filter((item) =>
                item.email.includes(value.toLowerCase())
            );
            setListUser(cloneListUser);
        } else {
            getUser(1);
        }
    }, 1000);

    const getUserExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(["ID", "Email", "First Name", "Last Name"]);
            listUser.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                return result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    const handleImportCSV = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];

            if (file.type !== "text/csv") {
                toast.error("Only accept text/csv files...");
                return;
            }

            Papa.parse(file, {
                complete: function (result) {
                    let rawCSV = result.data;
                    console.log(rawCSV);
                    if (
                        rawCSV.length > 0 &&
                        rawCSV[0][0] !== "" &&
                        rawCSV[0][1] !== ""
                    ) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== "email" ||
                                rawCSV[0][1] !== "first_name" ||
                                rawCSV[0][2] !== "last_name"
                            ) {
                                toast.error("Wrong format Header CSV file!");
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                    return result;
                                });
                                setListUser(result);
                                toast.success("Import Success!");
                            }
                        } else {
                            toast.error("Wrong format CSV file!");
                        }
                    } else {
                        toast.error("Not found data on CSV file!");
                    }
                },
            });
        }
    };

    return (
        <>
            <div className="d-flex mb-4 justify-content-between align-items-center">
                <h1>List User</h1>
                <div className="d-flex gap-2">
                    <label htmlFor="import" className="btn btn-danger">
                        <FontAwesomeIcon className="me-2" icon={faFileImport} />
                        Import
                    </label>
                    <input
                        type="file"
                        id="import"
                        onChange={(e) => handleImportCSV(e)}
                        hidden
                    />
                    <CSVLink
                        filename={"user"}
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUserExport}
                        className="btn btn-primary"
                        separator={";"}
                    >
                        <FontAwesomeIcon className="me-2" icon={faFileExport} />
                        Export File
                    </CSVLink>
                    <button
                        className="btn btn-success"
                        onClick={() => setShowAddNew(true)}
                    >
                        <FontAwesomeIcon className="me-2" icon={faCirclePlus} />
                        Add New User
                    </button>
                </div>
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
                dataUser={dataUser}
                handelEditUserFromModal={handelEditUserFromModal}
            />
            <ModalDeleteUser
                showDelete={showDelete}
                handleClose={handleClose}
                dataUser={dataUser}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
            <input
                type="text"
                placeholder="Search by Email ..."
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th
                            onClick={() =>
                                handleSort(
                                    sortBy === "asc" ? "desc" : "asc",
                                    "id"
                                )
                            }
                        >
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="m-0">ID</p>
                                {sortBy === "asc" ? (
                                    <FontAwesomeIcon icon={faArrowUp} />
                                ) : (
                                    <FontAwesomeIcon icon={faArrowDown} />
                                )}
                            </div>
                        </th>
                        <th
                            onClick={() =>
                                handleSort(
                                    sortBy === "asc" ? "desc" : "asc",
                                    "first_name"
                                )
                            }
                        >
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="m-0">First Name</p>
                                {sortBy === "asc" ? (
                                    <FontAwesomeIcon icon={faArrowUp} />
                                ) : (
                                    <FontAwesomeIcon icon={faArrowDown} />
                                )}
                            </div>
                        </th>
                        <th
                            onClick={() =>
                                handleSort(
                                    sortBy === "asc" ? "desc" : "asc",
                                    "last_name"
                                )
                            }
                        >
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="m-0">Last Name</p>
                                {sortBy === "asc" ? (
                                    <FontAwesomeIcon icon={faArrowUp} />
                                ) : (
                                    <FontAwesomeIcon icon={faArrowDown} />
                                )}
                            </div>
                        </th>
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
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteUser(user)}
                                    >
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
