// export type ITicketCreate = {
//     ticket: ITicket
// }

export type ITicket = {
    pkTicket:               number;
    name:                   string;
    fkBranch:               number;
    branch:                 string;
    fkCntcCode:             number;
    fkSLA:                  number;
    sla:                    string;
    slA_Minutes:            number;
    slA_Hours:              number;
    fkSubCategory:          number;
    subCategory:            string;
    fkCategory:             number;
    category:               string;
    fkDepartment:           number;
    department:             string;
    title:                  string;
    description:            string;
    files:                  string;
    status:                 string;
    origin:                 string;
    priority:               string;
    create:                 string;
    update:                 string;
    dueDate:                string;
    firstResponse:          string;
    closeDate:              string;
    isFirstResponseExpired: boolean;
    isSLAExpired:           boolean;
    fkUser:                 number;
    fkUserName:              string;
    fkAgent:                number;
    fkAgentName:             string;
}

export type ITicketCreate = Pick<ITicket, 'pkTicket' |'fkBranch'|'fkCntcCode'|'fkSLA'|'status'| 'title' | 'description' | 'origin' | 'priority'>