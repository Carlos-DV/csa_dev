import { IResponseFollowUp } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

const BASE = '/followup'

export const createFollowUp = async (newFollowUp : IResponseFollowUp) => {
    console.log(newFollowUp);
    try {
        const url= BASE
        const { data } = await clientAxios.post(url, newFollowUp);
        const { succeeded, result } = data;
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }
        return delayResponse(() => error(clone(data)));
    } catch (error) {
        console.log(error);
    }
} 

export const getFollowUpByTicket = async (idTicket: number) => {
    try {
        const url = `${BASE}/ticket/${idTicket}`;
        const { data } = await clientAxios(url);
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