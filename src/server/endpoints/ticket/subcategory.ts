import { ICategoryFK, ISubCategory } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

export const getSubcategoriesByCategory = async(categoryFk : number) => {
    try {
        const url = `/subcategory/category/${categoryFk}`;
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