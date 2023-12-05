import { IBranchOffice } from "../../../interfaces";
import { getBranchOffices } from "../../endpoints";

export class BranchOfficeAPI implements BranchOfficeAPI {
    getBranchOffices() : Promise<IBranchOffice[]> {
        return getBranchOffices();
    }
}