import { IBranchOffice } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

export const getBranchOffices =async ():Promise<IBranchOffice[]> => {
    try {
        const url = `/branchoffice`
        const { data } = await clientAxios(url);
        const { succeeded, result } = data
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (err) {
        console.log(`${err} <---- error endpoint`)
        return delayResponse(() => error(clone(err)));
    }
}