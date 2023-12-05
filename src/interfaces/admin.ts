export type IAdmonTickets = {
    pkTicket:               number;
    name:                   string;
    title:                  string;
    branch:                 string;
    sla:                    string;
    department:             string;
    status:                 string;
    isFirstResponseExpired: boolean;
    isSLAExpired:           boolean;
    create:                 string;
    dueDate:                string;
    closeDate:              string;
    fkUser:                 string;
    fkUserNum:              number;
    fkAgent:                string;
    fkAgentNum:             number;
}
    
