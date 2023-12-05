import { useContext } from "react";
import { TicketsContext } from "../context/ticket";

const useTickets = () => {
    return useContext(TicketsContext)
}

export { 
    useTickets
}