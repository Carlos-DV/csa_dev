// 'use client'
import { Box } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EditorSun, ShowEditorSun } from '../shared/Editor';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { IMessageFollowUp, IResponseFollowUp, IResponseTicket } from '../../interfaces';
import { TicketS3API, followUpAPI } from '../../server';
import CircularProgress from '@mui/material/CircularProgress';
import { formatDate } from '../../helpers';
import { FormReply } from './Forms';
import { useComments, useTickets, useUI } from '../../hooks';
import { CommentaryCard } from './CommentaryCard';
import useSWR from 'swr' 

interface IResponseProp {
    ticketData: IResponseTicket;
}

// const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())


export const TicketContent:FC<IResponseProp> = ({ticketData}) => {

    // const { data, error } = useSWR(`https://localhost:7270/api/followup/ticket/${ticketData.idTicket}`, fetcher)

    const [loadingContent, setLoadingContent] = useState(false)
    const [loadingRepy, setLoadingReply] = useState(false)
    const [infoS3, setInfoS3] = useState<string>("")
    const [t2, setT2] = useState<IResponseFollowUp>();
    const [t3, setT3] = useState<IMessageFollowUp[]>([]);
    const { pkTicket, name, fkBranch, fkCntcCode, fkSLA, title, description, status, origin, priority, create, update, closeDate, isFirstResponseExpired, isSLAExpired, fkAgent, fkUser, dueDate } = ticketData;
    const { toogleReply, showReply } = useUI()
    const { reply, followUps, commentaryS3 } = useTickets()
    const [followUp, setFollowUP] = useState();
    // console.log(data?.result);
    // https://localhost:7053/api/followup/ticket/${ticketData.idTicket}
    //sirve
    // const { data, isLoading, error} = useComments(`https://s3-demo-dv.s3.amazonaws.com/CSA/FollowUp/f-8b41a493-1bda-42b9-aba7-bac1e1601e01`, { refreshInterval: 5000 })
    // const { result } = data;
    // const { message } = result;
    // // setT2(data?.result)
    // // setT3(JSON.parse(data?.result.message))
    // const getData = data?.result;
    // const getDataMsg = getData ? JSON.parse(data?.result?.message) : null
    // console.log(data);
    //srive
    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>

    useEffect(()=>{
        const getFollowUp = async () => {
            // setLoadingReply(true);
            if(pkTicket) {
                if(pkTicket !== undefined && pkTicket !== 0) {
                    try {
                        const res = await followUpAPI.getFollowUpByTicket(pkTicket)
                        setT2(res);
                    } catch (error) {
                        console.log(`Error in response from getFollowUpByTicket:${error}`);
                    }
                }
                // setLoadingReply(false);
            }
        }
        getFollowUp();
    }, [pkTicket])

    // useEffect(()=>{
    //     const getFollowUpS3 = async () => {

    //         if(t2 && t2.message !== undefined) {
    //             setLoadingReply(true)
    //             try {
    //                 const res = await TicketS3API.getTicketS3ById(t2.message.split("FollowUp/")[1]);
    //                 setT3(JSON.parse(res));
    //             } catch (error) {
    //                 console.log(`Error in response from getFollowUpByTicket:${error}`);
    //             }
    //             setLoadingReply(false)
    //         }
    //     }
    //     getFollowUpS3();
    // }, [t2])

    useEffect(()=>{
        const getFollowUp = async () => {
            setLoadingReply(true);
            if(pkTicket) {
                if(pkTicket !== undefined && pkTicket !== 0) {
                    try {
                        const res = await followUpAPI.getFollowUpByTicket(pkTicket)
                        const { message } = res
                        setT2(res)
                        setT3(JSON.parse(message));
                    } catch (error) {
                        console.log(`Error in response from getFollowUpByTicket:${error}`);
                    }
                }
            }
        }
        getFollowUp();
    }, [pkTicket])//idticket

    console.log(t2);
    console.log(t3);

    return (
        <Box
        sx={{
            flex: '70%',
            marginTop: '1.5rem',
        }}
        >
            <Box>
                <Typography variant="h6">Ticket: {title}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            md: 'row'
                        },
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        gap: '2rem',
                    }}
                >
                    <Typography
                        sx={{
                            marginTop: '1.5rem',
                            padding:'0.5rem',
                            }}
                    >{formatDate(create)}</Typography>
                    <Button 
                        sx={{
                        marginTop: '1.5rem',
                        padding:'0.5rem',
                        }}
                        startIcon={<QuestionAnswerIcon />}
                        size="small"
                        onClick={toogleReply}
                    >
                        Responder
                    </Button>
                </Box>
            </Box>
            {
                showReply
                    ?  
                        <FormReply
                            pkTicketInfo={{pkTicket, fkAgent, fkUser}}
                        />
                    : 
                        <></>
            }
            <Box
                sx={{
                    display: 'flex',
                    flexDirection:'column-reverse'
                }}
            >
                {
                    // getDataMsg && getDataMsg.length > 0 ?
                    // getDataMsg.map(r => (
                    t3.length > 0 ?
                    t3.map(r => (
                        <CommentaryCard
                            key={r.idMessage}
                            r={r}
                            x={ticketData}
                        />
                    ))
                    :
                    <p>Este ticket no tiene aun respuestas</p>
                }
            </Box>
                
            <Accordion
                TransitionProps={{ unmountOnExit: true }} 
                defaultExpanded={true}
                disabled={true}
                sx={{
                    boxShadow: 5
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        boxShadow: 4
                    }}
                >
                <Typography variant='h6'>Descripción del ticket:</Typography>
                </AccordionSummary>
                
                <AccordionDetails
                    sx={{
                        backgroundColor: 'rgb(228 228 231)'
                    }}
                >
                            <ShowEditorSun 
                                // infoS3={infoS3}
                                infoS3={ticketData.description}
                            /> 
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
