import { IAdmonTickets, IUser } from "../../../interfaces";
import { clientAxios } from "../../axios";
import { clone, delayResponse, encrypted, error } from "../../utils";

type ApiResponse = {
    message: string,
    result: IAdmonTickets[],
    succeeded: boolean,
}
type ApiError = {
}
const BASE = '/ticket'

export const getAdmonTicket = async (req: number)/* : Promise<ApiResponse | ApiError> */=> {
    try {
        const url = `${BASE}/deparment/${req}`;
        const { data } = await clientAxios.get<ApiResponse>(url);
        const { succeeded, result, message } = data
        if(succeeded) {
            return delayResponse(Promise.resolve(clone(result)));
        }         
        return delayResponse(() => error(clone(data)));
    } catch (error) {
        console.error(error);
        throw error;
    }
}