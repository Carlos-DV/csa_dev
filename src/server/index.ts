import {
    TicketDepartmentAPI,
    TicketAPI,
    TicketS3Api,
    CategoryAPI,
    SubCategoryAPI,
    SlaAPI,
    FollowUpAPI,
    LoginAPI,
    BranchOfficeAPI,
    AdmonAPI,
    BaseConocimientoAPI,
}
from './base'

export const ticketDepartmentAPI = new TicketDepartmentAPI ();
export const ticketAPI = new TicketAPI();
export const TicketS3API = new TicketS3Api();
export const categoryAPI = new CategoryAPI();
export const subcategoryAPI = new SubCategoryAPI();
export const slaAPI = new SlaAPI();
export const followUpAPI = new FollowUpAPI();
export const logintAPI = new LoginAPI();
export const branchOfficeAPI = new BranchOfficeAPI();
export const admonAPI = new AdmonAPI();
export const baseConomientoAPI = new BaseConocimientoAPI();