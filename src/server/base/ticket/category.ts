import { IDeparmentFK } from "../../../interfaces";
import { getCategories, getCategoriesByDepartment } from "../../endpoints";

export class CategoryAPI implements CategoryAPI {
    getCategories() {
        return getCategories();
    };
    getCategoriesByDepartment(deparmentFK : number) {
        return getCategoriesByDepartment(deparmentFK);
    }
}
