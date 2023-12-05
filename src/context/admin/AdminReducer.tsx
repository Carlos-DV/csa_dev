import { IAdmonTickets } from "../../interfaces";
import { AdminState } from "./AdminProvider";


type AuthActionType = 
    | { type: '[Admon] - GetAll', payload: IAdmonTickets[] }
    | { type: '[Auth] - Logout' }

export const adminReducer = (state: AdminState, action: AuthActionType) : AdminState => {
    switch(action.type) {
        case '[Admon] - GetAll':
            return {
                ...state,
                admonTicket: action.payload
            }
            default:
                return state;
    }
}