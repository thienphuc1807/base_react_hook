import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/userServices";
import { toast } from "react-toastify";

function ModalDeleteUser(props) {
    const { showDelete, handleClose, dataUser, handleDeleteUserFromModal } =
        props;

    const handleDelete = async () => {
        let res = await deleteUser(dataUser.id);
        if (res && +res.statusCode === 204) {
            handleDeleteUserFromModal(dataUser.id);
            handleClose();
            toast.success("Delete Successful!");
        } else {
            toast.error("Delete Error");
        }
    };

    return (
        <>
            <Modal
                show={showDelete}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>
                            Are you sure to delete this user with email ={" "}
                            {dataUser.email}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
