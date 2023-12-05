import { IDepartament } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

export const getDepartaments = async () :Promise<IDepartament[]> => {
    try {
        const url = `/department`
        const { data } = await clientAxios(url);
        // console.log(data);
        const { succeeded, result } = data
        // console.log(result);
        // console.log(succeeded);
        if(succeeded) {
            // console.log(departaments)
            return delayResponse(Promise.resolve(clone(result)));
            // return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (err) {
        console.log(`${err} <---- error endpoint`)
        return delayResponse(() => error(clone(err)));
    }
}