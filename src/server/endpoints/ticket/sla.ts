import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

export const getSLAbySubCategory = async (subcatgoryFk : number) => {
    try {
        const url = `/sla/subcategory/${subcatgoryFk}`;
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