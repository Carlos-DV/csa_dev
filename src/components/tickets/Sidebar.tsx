'use client'
//REACT
import { FC, useEffect, useState } from 'react';
import { IAgentInDep, IAgentUpdate, IDueDateUpdate, IStatusUpdate, ITicket } from '../../interfaces';
//MATERIAL UI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Tooltip from '@mui/material/Tooltip';
//ant-design
import { PushpinOutlined, InfoCircleOutlined, CommentOutlined, HistoryOutlined, AlertOutlined, FieldTimeOutlined, ReadOutlined } from '@ant-design/icons';
//HELPER
import { validStatus } from '../../context/ticket';
import { SnackbarAlert, TabPanel } from '../shared';
import { TabChat } from './TabChat';
import { TabDescription } from './TabDescription';
import { TabTicket } from './TabTicket';
import { formatDateWithHours } from '../../helpers';
import { ticketAPI } from '../../server';


// FUNCTION TABS
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface IResponseProp {
    ticket: ITicket;
    setTicket: any
}

const Sidebar: FC<IResponseProp> = ({ ticket, setTicket }) => {
    const [value, setValue] = useState<number>(1);
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isEditingAgent, setIsEditingAgent] = useState<boolean>(false)
    const [isEditingDate, setIsEditingDate] = useState<boolean>(false)
    const [status, setStatus] = useState(validStatus(ticket?.status))
    const [agent, setAgent] = useState(ticket?.fkAgent)
    const [agents, setAgents] = useState<IAgentInDep[]>([])
    const [date, setDate] = useState<Dayjs | null>(dayjs(ticket?.dueDate));
    // Snackbar
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarType, setSnackBarType] = useState('info');
    const [snackBarMessage, setSnackBarMessage] = useState("");
    // Module
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    //Status
    const handleEdit = () => {
        console.log('click...')
        setIsEditing(!isEditing);
        setStatus(validStatus(ticket?.status))
    }
    // const [loading] = useState(false);
    const handleChangeStatus = (e: SelectChangeEvent) => {
        const stateStatus = e.target.value;
        setStatus(stateStatus);
        handleSubmitStatus(stateStatus)
    }
    const handleSubmitStatus = async (status: string) => {
        const updateStatus: IStatusUpdate = {
            pkTicket: ticket.pkTicket,
            status
        }
        try {
            const res = await ticketAPI.updateStatusTicket(updateStatus, ticket.pkTicket)
            const updatedTicket = { ...ticket, status: res.status };
            setTicket(updatedTicket)
            setSnackBarType('success');
            setSnackBarMessage('STATUS ACTUALIZADO');
            setOpenSnackBar(true);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
            setSnackBarType('error');
            setSnackBarMessage('ERROR AL ACTUALIZAR EL STATUS');
            setOpenSnackBar(true);
            setLoading(false);
        }
    }

    const handleEditAgent = () => {
        console.log('click...')
        setIsEditingAgent(!isEditingAgent);
        setAgent(ticket?.fkAgent);
    }
    const handleChangeAgent = (e: SelectChangeEvent) => {
        const stateAgent = e.target.value;
        setAgent(Number(stateAgent));
        handleSubmitAgent(Number(stateAgent));
    }

    const handleSubmitAgent = async (fkAgent: number) => {
        const updateAgent: IAgentUpdate = {
            pkTicket: ticket.pkTicket,
            fkAgent,
            fkAgentName: '',
        }
        console.log(updateAgent)
        try {
            const res = await ticketAPI.updateAgentTicket(updateAgent, ticket.pkTicket)
            console.log(res);
            const updatedTicket = { ...ticket, fkAgent: res.fkAgent, fkAgentName: res.fkAgentName };
            setTicket(updatedTicket)
            setSnackBarType('success');
            setSnackBarMessage('AGENTE AGREGADO');
            setOpenSnackBar(true);
            setIsEditingAgent(false);

        } catch (error) {
            console.log(error);
            setSnackBarType('error');
            setSnackBarMessage('ERROR AL CAMBIAR EL AGENTE');
            setOpenSnackBar(true);
            setLoading(false);
        }
    }
    //date
    const handleEditDate = () => {
        console.log('click...')
        setIsEditingDate(!isEditingDate);
        setDate(dayjs(ticket?.dueDate));
    }

    const handleChangeDate = async (newvalue: Dayjs | null) => {
        setDate(newvalue);
        handleSubmitDate(newvalue);
    }

    const handleSubmitDate = async (newValue: Dayjs | null) => {
        const updateAgent: IDueDateUpdate = {
            pkTicket: ticket.pkTicket,
            dueDate: newValue ? newValue.toISOString() : ticket.dueDate,
        };

        try {
            const res = await ticketAPI.updateDuedateTicket(updateAgent, ticket.pkTicket)
            const updatedTicket = { ...ticket, dueDate: res.dueDate };
            setTicket(updatedTicket)
            setSnackBarType('success');
            setSnackBarMessage('Fecha Actualizada..');
            setOpenSnackBar(true);
            setIsEditingAgent(false);
        } catch (error) {
            console.log(error);
            setSnackBarType('error');
            setSnackBarMessage('Error al cambiar la fecha');
            setOpenSnackBar(true);
            setLoading(false);
        }
    }
    //css
    const tabTickets = {
        justifyContent: 'left',
        fontSize: '0.8rem',
        "&:hover": {
            color: "#40a9ff",
            opacity: 1,
            width: '100%',
            minWidth: 0,
            maxWidth: 'none',
        },
        "&.Mui-selected": {
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "primary.main",
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        },
        "&.Mui-focusVisible": {
            backgroundColor: "#d1eaff",
            width: '100%',
        },
    };
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
                <Paper
                    sx={{
                        borderRadius: 4,
                        boxShadow: 10,
                        margin: '0.5rem',
                        padding: '2rem',
                        backgroundColor: '#ffffff'
                    }}
                >
                    <Stack direction={"column"} spacing={2} >
                        <Typography sx={{
                            textTransform: 'capitalize',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            ':after': {
                                content: '""',
                                display: 'block',
                                height: '0.4rem',
                                width: '5rem',
                                backgroundImage: 'linear-gradient(90deg,#0087cb 0, #0087cb 50%,#eb1c23 0,#eb1c24)',
                            }
                        }}>Información del Contacto</Typography>
                        <Stack direction={"column"} spacing={0} sx={{ /*fontSize: '0.5rem'*/ }}>
                            <Typography sx={{ fontWeight: '700', fontSize: '1rem', '&:hover': { color: 'primary.main' } }}>Brenda Pech</Typography>
                            <Typography sx={{ fontWeight: '700', fontSize: '0.8rem', '&:hover': { color: 'primary.main' } }}>Brenda.pech@gmail.com</Typography>
                            <Typography sx={{ fontWeight: '700', fontSize: '0.8rem', '&:hover': { color: 'primary.main' } }}>9984104853</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"column"} spacing={2} marginTop={4}>
                        <Typography sx={{
                            textTransform: 'capitalize',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            ':after': {
                                content: '""',
                                display: 'block',
                                height: '0.4rem',
                                width: '5rem',
                                backgroundImage: 'linear-gradient(90deg,#0087cb 0,#0087cb 50%,#eb1c23 0,#eb1c24)',
                            }
                        }}>Información del Ticket</Typography>
                        <Stack direction={"column"} spacing={0} sx={{ fontSize: '0.5rem' }}>
                            <Typography sx={{
                                textTransform: 'capitalize',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                marginTop: '1rem',
                            }}>Propietario</Typography>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Avatar
                                    alt={ticket?.fkAgentName}
                                    src={`https://ui-avatars.com/api/?name=${ticket?.fkAgentName}&background=0087cb&color=fff&size=32&rounded=true`}
                                    sx={{ width: 24, height: 24, cursor: 'pointer' }}
                                />
                                <Typography sx={{
                                    marginLeft: '0.4rem',
                                    fontWeight: '700',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}>{ticket?.fkAgentName}</Typography>
                            </Stack>
                            <Typography sx={{
                                marginTop: '1rem',
                                textTransform: 'capitalize',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                            }}>Estado</Typography>
                            <Tooltip title={ticket?.status}>
                                <Stack>
                                    {
                                        ticket.status === "Abierto"
                                            ?
                                            <Stack
                                                sx={{
                                                    backgroundColor: 'primary.light',
                                                    padding: 1,
                                                    borderRadius: 3,
                                                    textAlign: 'center',
                                                    color: '#fff',
                                                    marginTop: '0.3rem',
                                                    marginBottom: '0.3rem',
                                                    transition: 'transform .25s ease-out',
                                                    '&:hover': {
                                                        cursor: 'pointer',
                                                        transform: 'scale(1.05)',
                                                        backgroundColor: 'primary.main',
                                                    }
                                                }}
                                            >
                                                <Typography>
                                                    {ticket.status}
                                                </Typography>
                                            </Stack>
                                            : ticket.status === "Cerrado"
                                                ? <Stack
                                                    sx={{
                                                        backgroundColor: 'success.light',
                                                        padding: 1,
                                                        borderRadius: 3,
                                                        color: '#fff',
                                                        marginTop: '0.3rem',
                                                        textAlign: 'center',
                                                        marginBottom: '0.3rem',
                                                        transition: 'transform .25s ease-out',
                                                        '&:hover': {
                                                            cursor: 'pointer',
                                                            transform: 'scale(1.05)',
                                                            backgroundColor: 'success.main',
                                                        }
                                                    }}
                                                >
                                                    <Typography>
                                                        {ticket.status}
                                                    </Typography>
                                                </Stack>
                                                :
                                                ticket.status === "Escalado"
                                                    ?
                                                    <Stack
                                                        sx={{
                                                            backgroundColor: 'warning.light',
                                                            padding: 1,
                                                            borderRadius: 3,
                                                            color: '#fff',
                                                            marginTop: '0.3rem',
                                                            textAlign: 'center',
                                                            marginBottom: '0.3rem',
                                                            transition: 'transform .25s ease-out',
                                                            '&:hover': {
                                                                cursor: 'pointer',
                                                                transform: 'scale(1.05)',
                                                                backgroundColor: 'warning.main',
                                                            }
                                                        }}
                                                    >
                                                        <Typography>
                                                            {ticket.status}
                                                        </Typography>
                                                    </Stack>
                                                    :
                                                    <Stack
                                                        sx={{
                                                            backgroundColor: 'info.light',
                                                            padding: 1,
                                                            borderRadius: 3,
                                                            color: '#fff',
                                                            marginTop: '0.3rem',
                                                            textAlign: 'center',
                                                            marginBottom: '0.3rem',
                                                            transition: 'transform .25s ease-out',
                                                            '&:hover': {
                                                                cursor: 'pointer',
                                                                transform: 'scale(1.05)',
                                                                backgroundColor: 'info.main',
                                                            }
                                                        }}
                                                        onClick={handleEdit}
                                                    >
                                                        <Typography>
                                                            {ticket.status}
                                                        </Typography>
                                                    </Stack>
                                    }
                                </Stack>
                            </Tooltip>


                            <Typography sx={{
                                marginTop: '1rem',
                                textTransform: 'capitalize',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                            }}>Fecha de Vencimiento</Typography>
                            <Typography onClick={handleEditDate}>{formatDateWithHours(ticket.dueDate)}</Typography>

                        </Stack>

                        <Stack direction={"column"} spacing={2} marginTop={4}>
                            <Typography sx={{
                                textTransform: 'capitalize',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                ':after': {
                                    content: '""',
                                    display: 'block',
                                    height: '0.4rem',
                                    width: '5rem',
                                    // margin:'0.5rem',
                                    backgroundImage: 'linear-gradient(90deg,#0087cb 0,#0087cb 50%,#eb1c23 0,#eb1c24)',
                                }
                            }}>Mas Información</Typography>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Tab"
                            >
                                <Tab
                                    icon={<InfoCircleOutlined />}
                                    iconPosition="start"
                                    label="Ticket"
                                    sx={tabTickets}
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    icon={<ReadOutlined />}
                                    iconPosition="start"
                                    label="Descripcion"
                                    sx={tabTickets}
                                    {...a11yProps(1)}
                                />
                                <Tab
                                    icon={<CommentOutlined />}
                                    iconPosition="start"
                                    label="Chat"
                                    sx={tabTickets}
                                    {...a11yProps(2)}
                                />
                                <Tab
                                    icon={<PushpinOutlined />}
                                    iconPosition="start"
                                    label="Resolución"
                                    sx={tabTickets}
                                    {...a11yProps(3)}
                                />
                                <Tab
                                    icon={<HistoryOutlined />}
                                    iconPosition="start"
                                    label="Historial"
                                    sx={tabTickets}
                                    {...a11yProps(4)}
                                />
                            </Tabs>
                        </Stack>
                    </Stack>
                </Paper >
            </Grid>
            <Grid item xs={12} md={9}>
                <Paper sx={{
                    borderRadius: 4,
                    boxShadow: 10,
                    margin: '0.5rem',
                    padding: '2rem',
                    backgroundColor: '#ffffff'
                }}
                >
                    <Stack>
                        <Typography sx={{
                            textTransform: 'capitalize',
                            fontWeight: '700',
                            fontSize: '0.9rem'
                        }}>{ticket?.title}</Typography>
                        <Stack direction={'row'} spacing={2}>
                            <Typography sx={{
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                gap: '0.5rem',
                                ':after': {
                                    content: '""',
                                    display: 'block',
                                    height: '0.5rem',
                                    width: '5rem',
                                    backgroundImage: 'linear-gradient(90deg,#0087cb 0,#0087cb 50%,#eb1c23 0,#eb1c24)',
                                }
                            }}>
                                <AlertOutlined style={{ color: "#0087cb" }} />
                                {' '}
                                {ticket?.name}
                            </Typography>
                            <Typography sx={{
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                            }}>
                                <FieldTimeOutlined style={{ color: "#eb1c23" }} />
                                {' '}
                                {formatDateWithHours(ticket?.create)}

                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
                {
                    loading
                        ?
                        (
                            <Box sx={{ display: "flex" }} justifyContent="center">
                                <CircularProgress />
                            </Box>
                        )
                        :
                        (
                            <>
                                <Paper sx={{
                                    borderRadius: 4,
                                    boxShadow: 10,
                                    margin: '0.5rem',
                                    // padding: '0.5rem',
                                    backgroundColor: '#ffffffd1'
                                }}>
                                    <TabPanel
                                        value={value}
                                        index={0}
                                    >
                                        <TabTicket
                                            ticket={ticket}
                                            setTicket={setTicket}
                                        />
                                    </TabPanel>

                                    <TabPanel
                                        value={value}
                                        index={1}
                                    >
                                        <TabDescription
                                            ticket={ticket}
                                            setValue={setValue}
                                        />
                                    </TabPanel>

                                    <TabPanel
                                        value={value}
                                        index={2}
                                    >
                                        <TabChat
                                            ticket={ticket}
                                            setTicket={setTicket}
                                        />
                                    </TabPanel>

                                    <TabPanel
                                        value={value}
                                        index={3}
                                    >
                                        {/* <QualityService/> */}
                                    </TabPanel>

                                </Paper>
                            </>
                        )
                }
            </Grid>
            <SnackbarAlert
                openSnackBar={openSnackBar}
                snackBarMessage={snackBarMessage}
                setOpenSnackBar={setOpenSnackBar}
                snackBarType={snackBarType}
            />
        </Grid >
    )
}

export default Sidebar