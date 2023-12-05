import { IResponseFollowUp } from "../../../interfaces";
import { createFollowUp, getFollowUpByTicket } from "../../endpoints";

export class FollowUpAPI implements FollowUpAPI {
    createFollowUp(newFollowUp: IResponseFollowUp){
        return createFollowUp(newFollowUp);
    }
    getFollowUpByTicket(idTicket: number) {
        return getFollowUpByTicket(idTicket)
    }
}