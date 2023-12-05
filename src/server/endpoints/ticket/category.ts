import { IDeparmentFK } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

export const getCategories = async () => {
    try {
        const url = '/category'
        const { data } = await clientAxios(url);
        const { succeeded, result } = data
         if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
         }
         return delayResponse(() => error(clone(data)));
    } catch (error) { 
        console.log(`${error}`)
    }
}

export const getCategoriesByDepartment = async (departmentFK : number) => {
    try {
        // console.log(departmentFK)
        const url = `/category/deparmentfk/${departmentFK}`;
        const { data } = await clientAxios(url);
        // console.log(data)
        const { succeeded, result } = data
        // console.log(result)
        if(succeeded) {
           return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (error) {
        console.log(`${error}`)
    }
}