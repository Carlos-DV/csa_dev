import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { EditorSun } from '../../shared/Editor';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth, useTickets, useUI } from '../../../hooks';
import { FC, useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { IMessageFollowUp, IMessages, IResponseFollowUp } from '../../../interfaces';
import { formatDate, getDateNowFormat } from '../../../helpers';


interface TicketCardProps {
    pkTicketInfo: {pkTicket: number, fkAgent?: number, fkUser?:number}
}


const FormReply:FC<TicketCardProps> = ({ pkTicketInfo }/*{ params: { idTicket }}: {params: { idTicket: number }}*/) => {

    console.log(pkTicketInfo.pkTicket)
    console.log(pkTicketInfo.fkUser)
    // const {pkTicket, fkAgent, fkUser } = pkTicketInfo;
    

    const { toogleReply } = useUI();
    const { handleSubmitReply, tickets } = useTickets();
    const { user } = useAuth();

    const [description, setDescription] = useState<string>('');
    const [replyMessage, setReplyMessage] = useState<IResponseFollowUp>({
        fkTicket: 0,
        message: '',
        timeForMessage: 0,
    });

    const dataFilter = tickets.filter(info => info.pkTicket === pkTicketInfo.pkTicket)

    const handleChangeDataEditor = (content : string) => {
        setDescription(content)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([description].includes("")) {
            console.log('datos nulos');
            return;
        }

        const t1 = dataFilter[0]?.pkTicket;
        const t2 = dataFilter[0]?.fkUserNum;
        console.log(`${t1}-${t2}`);

        const newMessage : IMessageFollowUp = {
            idMessage: crypto.randomUUID(),
            pkTicket:   pkTicketInfo.pkTicket,
            message: description,
            date: getDateNowFormat(),
            fkUserName: user?.userName,
            fkUser: user?.id,
            type: user?.id !== pkTicketInfo.fkUser ? "Receptor" : "Emisor",
        };
        console.log(newMessage);
        const newReponse : IResponseFollowUp = {
            fkTicket: pkTicketInfo.pkTicket,
            message: JSON.stringify([newMessage]),
            timeForMessage: 5,
            ticketFollowUpFiles: ''
        }
        console.log(user);
        console.log(newReponse)
        console.log(newReponse.message)
        handleSubmitReply(newReponse);
        toogleReply();
      };

    return (
        <>
        <form
            onSubmit={handleSubmit}
        >
            <Accordion
                sx={{ marginTop: '2rem'}}
                defaultExpanded={true}
            >
                <AccordionSummary>
                    <Typography>Escribe tu respuesta</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EditorSun
                        handleChangeDataEditor={handleChangeDataEditor}
                    />
                </AccordionDetails>
            </Accordion> 
            <Box
                sx={{
                    display:'flex',
                    gap: '1rem'
                }}
            >
                <Button
                    variant='contained'
                    size='small'
                    type='submit'
                >
                    Enviar
                </Button>
                <Button
                    variant='contained'
                    size='small'
                    onClick={ toogleReply } 
                >
                    Cancelar
                </Button>
            </Box>
        </form>
        </>
    )
}

export { FormReply }