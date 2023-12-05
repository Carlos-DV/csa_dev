import Card from '@mui/material/Card';
import { useEffect, useState } from 'react'
import { TicketCard } from './TicketCard';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { ticketAPI } from '../../server';
import { IResponseTicket } from '../../interfaces';
import { useAuth, useTickets } from '../../hooks';
import LinearProgress from '@mui/material/LinearProgress';

const ListOfTickets = () => {

    const { user } = useAuth();
    const { tickets, loadingData } = useTickets();

    // console.log(tickets)

    if (loadingData) return ''

    // console.log(tickets);

    return (

        <Card
            sx={{
                marginTop: '2.5rem',
                padding: '1rem',
                borderRadius: 1,
                boxShadow: 2,
                backgroundColor: "#f5f5f4"
            }}
        >
            <Typography
                sx={{
                    color: 'primary',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    fontSize: '2.3rem'
                }}
            >Ticket Generados</Typography>
            <Divider>
                <Chip label="| 12 |" />
            </Divider>
            {
                tickets?.length > 0
                    ?
                    tickets.map(ticket => (
                        <TicketCard
                            key={ticket.pkTicket}
                            ticket={ticket}
                        />
                    ))
                    :
                    <Typography
                        sx={{
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}
                    >
                        Aún no haz creado un ticket, comienza creando tu Ticket
                    </Typography>
            }
        </Card>
    )
}

export { ListOfTickets }