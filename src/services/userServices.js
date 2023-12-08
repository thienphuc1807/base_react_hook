import instance from "./customize-axios";

function fetchAllUser(page) {
    return instance.get(`/api/users?page=${page}`);
}

export { fetchAllUser };
