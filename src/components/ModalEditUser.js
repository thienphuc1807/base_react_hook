import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { updateUser } from "../services/userServices";
import { toast } from "react-toastify";

function ModalEditUser(props) {
    const { showEdit, handleClose, dataUser, handelEditUserFromModal } =
        props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    useEffect(() => {
        if (showEdit) {
            setName(dataUser.first_name);
        }
    }, [showEdit, dataUser]);

    const handleEditUser = async () => {
        let res = await updateUser(name, job);
        console.log(res);
        if (res && res.updatedAt) {
            handelEditUserFromModal({ first_name: name, id: dataUser.id });
            handleClose();
            toast.success("Update Success!");
        } else {
            toast.error("Update Error!");
        }
    };
    return (
        <>
            <Modal
                show={showEdit}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput2"
                        >
                            <Form.Label>Job</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
