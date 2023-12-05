import { getSLAbySubCategory } from "../../endpoints";

export class SlaAPI implements SlaAPI {
    getSLAbySubCategory(subcategoryFk : number) {
        return getSLAbySubCategory(subcategoryFk);
    }
}