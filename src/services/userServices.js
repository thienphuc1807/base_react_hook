import instance from "./customize-axios";

function fetchAllUser(page) {
    return instance.get(`/api/users?page=${page}`);
}

function addNewUser(name, job) {
    return instance.post("/api/users", {
        name: name,
        job: job,
    });
}

function updateUser(name, job) {
    return instance.put("/api/users/", {
        name: name,
        job: job,
    });
}

function userLogin(email, password) {
    return instance.post("/api/login", {
        email,
        password,
    });
}

function deleteUser(id) {
    return instance.delete(`/api/users/${id}`);
}

export { fetchAllUser, addNewUser, updateUser, deleteUser, userLogin };
