import { IAgentUpdate, IDueDateUpdate, IHistory, IMessageFollowUp, IQuality, IResponseFollowUp, IResponseTicket, IStatusUpdate, ITicket, ITicketCreate, ITickets, IToken } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

const BASE = '/ticket';

type ApiResponse = {
    message: string,
    result: ITickets[],
    succeeded: boolean,
}

export const createTicketRequest = async (newTicket : ITicketCreate) => {
    try {
        const url = BASE;
        console.log(newTicket)
        const { data } = await clientAxios.post(url, newTicket);
        const { succeeded, result } = data
        console.log(data);
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (error) {
        console.log(`${error}`)
    }
}

//obtengo lista x departamento
export const getListTickets = async (req: number) : Promise<ITickets[]> => {
    try {
        const url = `${BASE}/user/${req}`;
        const { data } = await clientAxios.get<ApiResponse>(url);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTickets = async () => {
    try {
        const url = BASE;
        const { data } = await clientAxios(url); 
        const { succeeded, result, message } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(message)));
    } catch(err)  {
        console.log(`${err}`)
        // const msg = 'Error al conectarse con la API'
        // return delayResponse(() => error(clone(`${err} - ${msg}`)));
    }
}

export const getTicketById = async (idTicket: number) => {
    try {
        const url = `${BASE}/${idTicket}`;
        const { data } = await clientAxios(url);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch(err)  {
        console.log(`${err}`)
        return delayResponse(() => error(clone(err)));
    }
}

export const getTicketByFkUser = async (idTicket: number) => {
    try {
        const url = `${BASE}/user/${idTicket}`;
        const { data } = await clientAxios(url);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch(err)  {
        console.log(`${err}`)
        return delayResponse(() => error(clone(err)));
    }
}

// update Status ticket
export const updateStatusTicket = async (req: IStatusUpdate, id: number) : Promise<IResponseTicket> => {
    try {
        const url = `${BASE}/status/${id}`;
        const { data } = await clientAxios.put<ApiResponse>(url, req);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (err) {
        console.error(err);
        return delayResponse(() => error(clone(err)));
    }
}
// update Agent Ticket
export const updateAgentTicket = async (req: IAgentUpdate, id: number): Promise<ITicket> => {
    try {
        const url = `${BASE}/agent/${id}`;
        const { data } = await clientAxios.put<ApiResponse>(url, req);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (err) {
        console.error(err);
        return delayResponse(() => error(clone(err)));
    }
}
//update duedae
export const updateDuedateTicket = async (req: IDueDateUpdate, id: number) : Promise<ITicket> => {
    try {
        const url = `${BASE}/duedate/${id}`;
        const { data } = await clientAxios.put<ApiResponse>(url, req);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (err) {
        console.error(err);
        return delayResponse(() => error(clone(err)));
    }
}

//obtener array de follows up para el ticket
export const getFollowUpByTicket = async (idTicket: number) : Promise<IMessageFollowUp> => {
    try {
        const url = `/followup/ticket/${idTicket}`;
        const { data } = await clientAxios.get<ApiResponse>(url);
        const { succeeded, result, message } = data
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }else {
            return delayResponse(() => error(clone(message)));
        }
    } catch (er) {
        return delayResponse(() => error(clone(er)));
    }
}

//create followup para un ticket
export const createFollowUp = async (newFollowUp : IResponseFollowUp) : Promise<IResponseFollowUp> => {
    try {
        const url= `/followup`;
        const { data } = await clientAxios.post<ApiResponse>(url, newFollowUp);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (err) {
        console.log(err);
        return delayResponse(() => error(clone(err)));
    }
} 

// validate token ticket
export const validToken = async  (req: string) : Promise<IToken> => {
    try {
        const url= `${BASE}/token/${req}`;
        const { data } = await clientAxios.get<ApiResponse>(url);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (err) {
        console.log(err);
        return delayResponse(() => error(clone(err)));
    }
}
//manda la calificación de un ticket
export const createQuality = async (req: IQuality): Promise<boolean> => {
    try {
        console.log(req);
        const url = `/quality`
        const { data } = await clientAxios.post<ApiResponse>(url, req);
        const { succeeded, result, message } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        console.log(data);
        return delayResponse(() => error(clone(message)));
        
    } catch (err) {
        console.log(err);
        return delayResponse(() => error(clone(err)));
    }
}

//history
//obtengo el historial de un ticket
export const getHistoryById = async(req: number) : Promise<IHistory[]> => {
    try {
        const url= `/history/${req}`;
        const { data } =await clientAxios.get<ApiResponse>(url);
        const { succeeded, result } = data
        if (succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (err) {
        console.log(`${err} <---- error endpoint`)
        return delayResponse(() => error(clone(err)));
    }
}