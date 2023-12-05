import { clientAxios } from "../axios";
import { clone, delayResponse, error } from "../utils";

export const getTicketS3ById = async (idS3: string) => {
    try {
        const url = `/ticketupload/${idS3}`
        const { data } = await clientAxios(url);
        const { statusCode, message } = data
        if(statusCode === 200) {
            return delayResponse(Promise.resolve(clone(message)));
        }
        return delayResponse(() => error(clone(data)));
    } catch(error) {
        console.log(`${error}`)
    }
}