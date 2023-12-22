import { IAgentUpdate, IDueDateUpdate, IResponseFollowUp, IStatusUpdate, ITicket } from "../../../interfaces";
import { createFollowUp, createTicketRequest, getFollowUpByTicket, getListTickets, getTicketByFkUser, getTicketById, getTickets, updateAgentTicket, updateDuedateTicket, updateStatusTicket } from "../../endpoints"

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
    getListTickets(req: number) {
        return getListTickets(req)
    }
    updateStatusTicket(req: IStatusUpdate, id: number) {
        return updateStatusTicket(req, id);
    }
    updateAgentTicket(req: IAgentUpdate, id: number ) {
        return updateAgentTicket(req, id);
    }
    updateDuedateTicket(req: IDueDateUpdate, id: number) {
        return updateDuedateTicket(req, id);
    }
    getFollowUpByTicket(req: number) {
        return getFollowUpByTicket(req)
    }
    createFollowUp(req: IResponseFollowUp){
        return createFollowUp(req);
    }
}
