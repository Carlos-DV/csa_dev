import { useContext } from "react";
import { AdminContext } from "../context/admin";

const useAdmin = () => {
    return useContext(AdminContext)
}

export {
    useAdmin
}