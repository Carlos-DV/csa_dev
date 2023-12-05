import { ICategoryFK } from "../../../interfaces";
import { getSubcategoriesByCategory } from "../../endpoints/ticket/subcategory";

export class SubCategoryAPI implements SubCategoryAPI {
    getSubcategoryByCategory(categoryFk : number) {
        return getSubcategoriesByCategory(categoryFk);
    }
}