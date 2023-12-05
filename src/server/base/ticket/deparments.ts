import { IDepartament, IDepartamentState } from "../../../interfaces";
import { getDepartaments } from "../../endpoints";

export class TicketDepartmentAPI implements TicketDepartmentAPI {
    getDepartaments() : Promise<IDepartament[]> {
        return getDepartaments();
    }
    
}