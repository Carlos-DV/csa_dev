import { ITicket } from "../../../interfaces";
import { createTicketRequest, getTicketByFkUser, getTicketById, getTickets } from "../../endpoints"

export class TicketAPI implements TicketAPI {
    createTicketRequest(ticket: ITicket){
        return createTicketRequest(ticket);
    }
    getTickets() {
        return getTickets();
    }
    getTicketById(idTicket : number) {
        return getTicketById(idTicket);
    }
    getTicketByFkUser(fkUser : number) {
        return getTicketByFkUser(fkUser);
    }
}
