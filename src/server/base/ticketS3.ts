import { getTicketS3ById } from '../endpoints'

export class TicketS3Api implements TicketS3Api {
    getTicketS3ById(idS3 : string) {
        return getTicketS3ById(idS3);
    }
}