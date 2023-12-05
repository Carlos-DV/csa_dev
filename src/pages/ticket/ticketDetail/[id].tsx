'use client'
import { FC, useEffect, useRef, useState } from 'react';
import { UIProvider } from '../../../context/ui/UIProvider';
import { MainLayout } from '../../../components/layouts';
import { ticketAPI, TicketS3API } from '../../../server';
import { useRouter } from 'next/router';
import { IResponseTicket } from '../../../interfaces';
import { EditorSun, TickerUserDetails } from '../../../components/Ticket';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth, useTickets } from '../../../hooks';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useSearchParams } from 'next/navigation';

interface TicketDetailProps {
    id: string | string[] | undefined;
  }

const TicketDetail : FC<TicketDetailProps> = () => {
    // const router = useRouter();
    // const { isReady, 
    //     query: { id }
    // } = router

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



    // const [ticketData, setTicketData] = useState<IResponseTicket>(
    //     {
    //         idTicket: 0,
    //         ticketName: '',
    //         branchFK: 0,
    //         cntcCodeFK: 0,
    //         slafk: 0,
    //         ticketTitle: '',
    //         ticketDescription: '',
    //         ticketFiles: '',
    //         ticketStatus: '',
    //         ticketOrigin: '',
    //         ticketPriority: '',
    //         ticketQualification: '',
    //         ticketCreate: '',
    //         ticketUpdate: '',
    //         tickeDueDate: '',
    //         ticketFirstResponse: '',
    //         ticketCloseDate: '',
    //         isFirstResponseExpired: false,
    //         isSLAExpired: false,
    //         ticketUserFK: 0,
    //         ticketAgentFK: 0
    //     }
    // );
    const [infoS3, setInfoS3] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [loadingContent, setLoadingContent] = useState(false)
    const { getTicket, ticket, getInfoS3} = useTickets()


    // useEffect(() => {
    //     if(isReady) {
    //         getTicket(parseInt(id, 10))
    //     }
    // }, [isReady])


    return (
        <UIProvider>
            <MainLayout>
                    <TickerUserDetails
                        convertId={convertId}
                    />
            </MainLayout>
        </UIProvider>
    );
}

export default TicketDetail;
