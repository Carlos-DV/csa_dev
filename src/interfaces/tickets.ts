export type ITicketCreate = {
    ticket: ITicket
}

export interface ITicket {
    fkBranch: number,
    fkCntcCode: number,
    fkSLA: number,
    title: string,
    description: string,
    priority: string,
}

