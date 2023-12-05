import { IAdmonTickets } from "../../../interfaces";
import { getAdmonTicket } from "../../endpoints";

export class AdmonAPI implements AdmonAPI {
    getAdmonTicket(req: number) {
        return getAdmonTicket(req) 
    }
}