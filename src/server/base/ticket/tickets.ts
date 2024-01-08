import { IAgentUpdate, IDueDateUpdate, IHistory, IQuality, IResponseFollowUp, IStatusUpdate, ITicket, ITicketCreate } from "../../../interfaces";
import { createFollowUp, createQuality, createTicketRequest, getFollowUpByTicket, getHistoryById, getListTickets, getTicketByFkUser, getTicketById, getTickets, updateAgentTicket, updateDuedateTicket, updateStatusTicket, validToken } from "../../endpoints"

export class TicketAPI implements TicketAPI {
    createTicketRequest(ticket: ITicketCreate){
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
    createFollowUp(req: IResponseFollowUp) {
        return createFollowUp(req);
    }
    validToken(req: string) {
        return validToken(req);
    }
    createQuality(req: IQuality) {
        return createQuality(req);
    }
    getHistoryById(req: number) : Promise<IHistory[]> {
        return getHistoryById(req)
    }
}
