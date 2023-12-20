import React from 'react'
import { useAuth, useTickets } from '../../hooks';
import { useRouter } from 'next/router';

const TicketPk = () => {

    let convertId = 0;
    // if (typeof id === 'string') {
    //     convertId = parseInt(id, 10);
    // }
    const a = useAuth()
    const {tickets} = useTickets()
    console.log(tickets)
    console.log(a)

    const Router = useRouter();

    // console.log(typeof id);
    if(Router.isReady) {
        const id = Router.query.id;
        if (typeof id === 'string') {
            convertId = Number(id);
        // console.log(id)
        }
    }

    return (
        <div>ticketPk</div>
    )
}

export default TicketPk
