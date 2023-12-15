import { ITicket, ITicketCreate } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

const BASE = '/ticket';


export async function getDepartament() {
    const response = await clientAxios.get(`publicknowledgebase`);
    const content = await response.data;

    console.log('cont',content);
    console.log('res',response);

    if (content.succeeded) {
        return delayResponse(Promise.resolve(clone(content.result)));
    } else {
        return delayResponse(() => error(clone(content.Message)));
    }
}

export async function getPublicTemas(PkDepartment: string) {
    const response = await clientAxios.get(`publicknowledgebase/${PkDepartment}`);
    const content = await response.data;

    if(content.succeeded){
        return delayResponse(Promise.resolve(clone(content.result)));
    }
    else{
        return delayResponse(() => error(clone(content.Message)));
    }
}
