import { ITicket, ITicketCreate } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, error } from "../../utils";

const BASE = '/ticket';


export async function getDepartament() {
    const response = await clientAxios.get(`publicknowledgebase`);
    const content = await response.data;

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

export async function GetObject(key:string) {
    const response = await clientAxios.get(`publicknowledgebase/contenido/${key}`);
    const content = await response.data;

    if(content.succeeded){
        return delayResponse(Promise.resolve(clone(content)));
    } else {
        return delayResponse(Promise.resolve(clone(content)));
    }
}

export async function getSearchBaseConocimiento(id : string) {
    const response = await clientAxios.get(`publicknowledgebase/search/${id}`);
    const content = await response.data;

    if(content.succeeded){
        return delayResponse(Promise.resolve(clone(content.result)));
    } else {
        return delayResponse(() => error(clone(content.Message)));
    }
}

export async function getRegisterTemas(PkDepartment: string) {
    const response = await clientAxios.get(`publicknowledgebase/registered/${PkDepartment}`);
    const content = await response.data;

    if(content.succeeded){
        return delayResponse(Promise.resolve(clone(content.result)));
    }
    else{
        return delayResponse(() => error(clone(content.Message)));
    }
}


export async function GetTopPublic() {
    const response = await clientAxios.get(`/publicknowledgebase/publictop/`);
    const content = await response.data;

    if(content.succeeded){
        return delayResponse(Promise.resolve(clone(content.result)));
    }
    else{
        return delayResponse(() => error(clone(content.Message)));
    }
}

export async function GetTopRegister() {
    const response = await clientAxios.get(`publicknowledgebase/registeredtop/`);
    const content = await response.data;

    if(content.succeeded){
        return delayResponse(Promise.resolve(clone(content.result)));
    }
    else{
        return delayResponse(() => error(clone(content.Message)));
    }
}
