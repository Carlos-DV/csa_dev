'use client'
import { FC, Fragment, useEffect, useState } from 'react'
//next
import Image from 'next/image';
//interfaces
import { IMessageFollowUp, ITicket } from '../../interfaces';
//material ui
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box, Avatar } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// assets
import { ShowEditorSun } from '../shared'; 
//Helpers
// import { formatDate, formatDateWithHours } from 'services/utils';
import * as signalR from '@microsoft/signalr';
import { ticketAPI } from '../../server'; 
import { Stack } from '@mui/system';
//css
// import "../../../styles/Home.module.css";
// import '../../styles/bg-chat.css'
import nf from "../../assets/imagesChat/nf-chat.png"
// import AnimateButton from 'components/@extended/AnimateButton';
//componets
import { FormReply } from './form';
import { SnackbarAlert } from '../shared'; 
import { useUI } from '../../hooks';

interface IProps {
    // fs3: IMessageFollowUp;
    // index: number
    ticket: ITicket
    setTicket: any
}

const TabChat: FC<IProps> = ({ ticket, setTicket }) => {

    const [followS3, setFollowS3] = useState<IMessageFollowUp[]>([])
    // const [showReply, setShowReply] = useState<boolean>(false)
    const { toogleReply, showReply } = useUI()
        // Snackbar
        const [openSnackBar, setOpenSnackBar] = useState(false);
        const [snackBarType, setSnackBarType] = useState('info');
        const [snackBarMessage, setSnackBarMessage] = useState("");
        // Module
        // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:7053/ticketHub`)
            .build();

        const startConnection = async () => {
            try {
                await connection.start();
                console.log('Conexión de SignalR establecida.');
                // Unir al grupo del ticket específico
                connection.invoke('AddToGroup', ticket.pkTicket.toString());
            } catch (err) {
                console.error(`Error al establecer la conexión de SignalR: ${err}`);
                // Puedes implementar lógica de reintento aquí si es necesario
            }
        };

        connection.on('ReceiveFollowUpUpdate', (ticketId, followUp) => {
            console.log(`Actualización de seguimiento recibida para el ticket ${ticketId}:`, followUp);
            console.log('clean');
            setFollowS3([]);
            console.log('add');
            setFollowS3(JSON.parse(followUp.message));
        });

        // Manejar eventos de conexión y reconexión
        connection.onclose(async () => {
            console.log('La conexión de SignalR se cerró, intentando volver a conectar...');
            await startConnection();
        });

        startConnection();

        return () => {
            connection.stop();
            console.log('Desconectado de SignalR');
        };
    }, [ticket.pkTicket]);

    useEffect(() => {
        const getFollowUp = async () => {
            if (ticket.pkTicket) {
                if (ticket.pkTicket !== undefined && ticket.pkTicket !== 0) {
                    try {
                        const res = await ticketAPI.getFollowUpByTicket(ticket.pkTicket)
                        const { message } = res
                        setFollowS3(JSON.parse(message));
                    } catch (error) {
                        setFollowS3([])
                        console.log(`Error in response from getFollowUpByTicket:${error}`);
                    }
                }
            }
        }
        getFollowUp();
    }, [ticket.pkTicket])

    return (
        <>

            {
                followS3.length > 0
                    ?
                    (
                        // <Box sx={{ maxHeight: '50rem', overflowY: 'auto', padding: '1rem', ...customScrollbarStyle }}>
                        <div className='contentImageChat scrollBar'>
                            {
                                followS3.map((fs3, index) => (
                                    (
                                        <Fragment key={fs3.idMessage}>
                                            {/* <Divider /> */}
                                            <Card
                                                key={fs3.idMessage}
                                                sx={{
                                                    position: 'relative',
                                                    width: '55%',
                                                    marginLeft: fs3.fkUser !== ticket.fkUser ? 'auto' : 0,
                                                    marginRight: fs3.fkUser !== ticket.fkUser ? 0 : 'auto',
                                                    marginBottom: '1.5rem',
                                                    // backgroundColor: fs3.fkUser !== ticket.fkUserNum ? 'primary.main' : 'secondary.main',
                                                    backgroundColor: '#f1f1f1',
                                                    marginTop: index === 0 ? 0 : '1.5rem',
                                                    boxShadow: 5,
                                                    borderRadius: fs3.fkUser !== ticket.fkUser ? '0 0 0 2rem' : '0 0 2rem 0',
                                                    overflow: 'visible',
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: '0rem',
                                                        left: fs3.fkUser !== ticket.fkUser ? 'auto' : '-0.75rem',
                                                        right: fs3.fkUser !== ticket.fkUser ? '-0.75rem' : 'auto',
                                                        width: '1.5rem',
                                                        height: '1.5rem',
                                                        borderStyle: 'solid',
                                                        borderWidth: '0.75rem',
                                                        // borderBottomColor: fs3.fkUser !== ticket.fkUserNum ? 'transparent' : '#ff0000',
                                                        // borderTopColor: fs3.fkUser !== ticket.fkUserNum ? '#ff0000' : 'transparent',
                                                        borderBottomColor: 'transparent',
                                                        // borderTopColor: fs3.fkUser !== ticket.fkUserNum ? 'primary.main' : 'success.main',
                                                        borderTopColor: '#f1f1f1',
                                                        borderRightColor: 'transparent',
                                                        borderLeftColor: 'transparent',
                                                    },
                                                }}
                                            >
                                                <CardContent
                                                    sx={{
                                                        textAlign: fs3.fkUser !== ticket.fkUser ? 'right' : 'left',
                                                        padding:'0.5rem',
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: fs3.fkUser !== ticket.fkUser ? 'flex-end' : 'flex-start',
                                                            gap: 1,
                                                            marginBottom: 0.5,
                                                        }}
                                                    >
                                                        <Stack
                                                            direction={"row"}
                                                            spacing={2}
                                                        >
                                                            <Stack
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: fs3.fkUser !== ticket.fkUser ? 'row-reverse' : 'row',
                                                                    flexGrow: 1,
                                                                    gap: 1,

                                                                }}
                                                            >
                                                                <Tooltip title={fs3.fkUserName}>
                                                                    <Avatar
                                                                        alt={fs3.fkUserName}
                                                                        src={`https://ui-avatars.com/api/?name=${fs3?.fkUserName}&background=FFF&color=000&size=64`}
                                                                    />
                                                                </Tooltip>

                                                                <ShowEditorSun infoS3={fs3.message} />
                                                            </Stack>
                                                        </Stack>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Fragment>
                                    )))}
                        </div>
                        // </Box>
                    )
                    :
                    (
                        <>
                            <Box sx={{
                                display: showReply ? 'none' : 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '2rem',
                                marginBottom: '2rem'
                            }}>
                                <Image
                                    src={nf}
                                    alt="Chat Image"
                                    width={150}
                                    height={150}
                                />
                                <Typography sx={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Este Ticket aún no ha sido contestado...</Typography>
                            </Box>
                        </>
                    )
            }
            <Box>
                {
                    showReply ?
                        <FormReply
                            ticket={ticket}
                            setTicket={setTicket}
                            setOpenSnackBar={setOpenSnackBar}
                            setSnackBarType={setSnackBarType}
                            setSnackBarMessage={setSnackBarMessage}

                        />
                        :
                        <Stack direction="row" justifyContent="flex-end">
                            {/* <AnimateButton> */}
                                <Button
                                    startIcon={<QuestionAnswerIcon />}
                                    size="small"
                                    onClick={toogleReply}
                                    color="primary"
                                    disabled={ticket.status === "Cerrado"}
                                    sx={{
                                        marginTop: '1.5rem',
                                    }}
                                >
                                    Responder
                                </Button>
                            {/* </AnimateButton> */}
                        </Stack>
                }
            </Box>
            <SnackbarAlert
                openSnackBar={openSnackBar}
                snackBarMessage={snackBarMessage}
                setOpenSnackBar={setOpenSnackBar}
                snackBarType={snackBarType}
            />
        </>
    )
}

export { TabChat }