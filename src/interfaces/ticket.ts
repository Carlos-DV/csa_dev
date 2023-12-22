import { ITicket } from "./tickets";

export type IBranchOffice = {
    pkBranchOffice:   number;
    code:             string;
    u_SO1_01SUCURSAL: string;
    name:             string;
    active:           boolean;
    type:             string;
    city:             string;
    zone:             string;
}

export type IDepartament = {
    pkDepartment: number;
    name:         string;
    description:  string;
}

export interface IDepartamentState {
    Departament:  IDepartament,
    Departaments: IDepartament[],
}

export type ICategory  = {
    pkCategory:   number;
    fkDepartment: number;
    name:         string;
    description:  string;
}

export interface ICategoryState {
    Category: ICategory;
}

export type ISubCategory  = {
    pkSubCategory: number;
    fkCategory:    number;
    name:          string;
    description:   string;
}

export type IDeparmentFK = {
    deparmentFK : number;
}

export type ISearchSLA = {
    departament?: number;
    category?:    number;
    subcategory?: number;
}

export interface ISubCategoryState {
    SubCategory: ISubCategory;
}

export type ICategoryFK = {
    categoryFK : number;
}

export type ISLas = {
    pkSLA:             number;
    fkSubCategory:     number;
    name:              string;
    description:       string;
    firstResponseTime: number;
    resolutionTime:    number;
}

export type IResponseTicket = {
    pkTicket:               number;
    name:                   string;
    fkBranch:               number;
    fkCntcCode:             number;
    fkSLA:                  number;
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
    fkAgent:                number;
}
export type IResponseS3 = {
    // statusCode?: number;
    message?:    string;
}

export type IMessages = {
    idMessage:  string;
    pkTicket:   number;
    message:    string;
    date:       string;
    fkUser?:     number;
    fkUserName?:   string;
    type:       string;
}

export type IResponseFollowUp = {
    pkFollowsUp?:         number;
    fkTicket:            number;
    message:             string;
    timeForMessage:      number;
    ticketFollowUpFiles?: string;
}

export type IMessageFollowUp = {
    idMessage:  string;
    pkTicket:   number;
    message:    string;
    date:       string;
    fkUser?:     number;
    fkUserName?:   string;
    type:       string;
}

export type IResponseTicketFullData = {
    pkTicket:                number;
    name:                    string;
    fkBranch:                string;
    fkCntcCode:              string;
    slaName:                 string;
    subCategoryName:         string;
    categoryName:            string;
    departmentName:          string;
    title:                   string;
    description:             string;
    files:                   string;
    status:                  string;
    origin:                  string;
    priority:                string;
    create:                  string;
    update:                  string;
    dueDate:                 string;
    firstResponse?:          string;
    closeDate?:              string;
    isFirstResponseExpired?: boolean;
    isSLAExpired?:           boolean;
    fkUser:                  string;
    fkUserNum:               number,
    fkAgent:                 string;
}

export type ITickets = {
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

export type IAgentInDep = {
    pkUser:     number;
    fkAgentNum: number;
    firstName:  string;
    lastName:   string;
    userName:   string;
}

export type IStatusUpdate = Pick<ITicket, 'pkTicket' | 'status'>
export type IAgentUpdate = Pick<ITicket, 'pkTicket' | 'fkAgent' | 'fkAgentName'>
export type IDueDateUpdate = Pick<ITicket, 'pkTicket' | 'dueDate'> & {
    dueDate?: ITicket['dueDate'] | null;
}