import instance from "./customize-axios";

function fetchAllUser() {
    return instance.get("/api/users?page=1");
}

export { fetchAllUser };
