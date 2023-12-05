import { ITicket, ITicketCreate } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

const BASE = '/ticket';

export const createTicketRequest = async (newTicket : ITicket) => {
    try {
        const url = BASE;
        console.log(newTicket)
        const { data } = await clientAxios.post(url, newTicket);
        const { succeeded, result } = data
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (error) {
        console.log(`${error}`)
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