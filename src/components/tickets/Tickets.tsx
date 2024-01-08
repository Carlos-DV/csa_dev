import { Paper, Typography, Grid, Stack, Tooltip, Box } from '@mui/material'
import NextLink from "next/link";
import Link from "@mui/material/Link";
import { EmptyTable } from '../shared'
import { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { ITickets } from '../../interfaces'
import { ticketAPI } from '../../server'
import { useAuth } from '../../hooks'
import { formatDateWithHours } from '../../helpers'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const Tickets = () => {

    const [rows, setRows] = useState<ITickets[]>([]);
    const { user } = useAuth()

    useEffect(() => {
        const getListByUser = async () => {
            try {
                if (user && user.id) {
                    const res = await ticketAPI.getListTickets(user.id);
                    setRows(res);
                }
            } catch (error) {
                console.log(`ex: ${error} | <---`)
            }
        }
        getListByUser()
    }, [user])

    const rowsFormat = rows?.map(row => {
        return {
            id: row.pkTicket,
            name: row.name,
            title: row.title,
            branch: row.branch,
            sla: row.sla,
            department: row.department,
            status: row.status,
            isFirstResponseExpired: row.isFirstResponseExpired,
            isSLAExpired: row.isSLAExpired,
            create: row.create,
            dueDate: row.dueDate,
            closeDate: row.closeDate,
            fkUser: row.fkUser,
            fkUserNum: row.fkUserNum,
            fkAgent: row.fkAgent,
            fkAgentNum: row.fkAgentNum,
        }
    })
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            // minWidth: 80,
            // maxWidth: 80,
            flex: 1,
        },
        {
            field: '#',
            headerName: '#',
            // minWidth: 120,
            maxWidth: 120,
            flex: 1,
            renderCell: (params) => {
                const ticketName = params.row.name;
                const truncatedName = ticketName.length > 20 ? `${ticketName.slice(14, 18)}...` : ticketName;
                return (
                    <Stack>
                        <Tooltip title={ticketName}>
                            <Typography>
                                {truncatedName}
                            </Typography>
                        </Tooltip>
                    </Stack>
                )
            }
        },
        {
            field: 'Descripción',
            headerName: 'Descripción',
            minWidth: 800,
            maxWidth: 800,
            flex: 1,
            headerAlign: 'left',
            align: "left",
            renderCell: (params) => {
                const ticketName = params.row.title;
                const truncatedName = ticketName.length > 70 ? `${ticketName.slice(0, 65)}...` : ticketName;
                return (
                    <Stack>
                        <Link
                            href={`/tickets/${params.row.id}`}
                            component={NextLink}
                            underline="none"
                            sx={{
                            //   color: "#000000",
                            }}
                        >
                            <Tooltip
                                title={params.row.title}
                            >
                                <Typography variant="body2"
                                    sx={{
                                        fontWeight: '700',
                                        textTransform: 'uppercase',
                                        fontSize: '1rem'
                                    }}>
                                    {truncatedName}
                                </Typography>
                            </Tooltip>
                            <Stack direction={"row"} spacing={5}>
                                <Tooltip title={`Solicita: ${params.row.fkUser}`}>
                                    <Typography variant="body2">
                                        {`Solicita: ${params.row.fkUser}`}
                                    </Typography>
                                </Tooltip>
                                <Tooltip title={`Sucursal: ${params.row.branch}`}>
                                    <Typography variant="body2">{`Sucursal: ${params.row.branch}`}</Typography>
                                </Tooltip>
                            </Stack>
                            <Stack direction={"row"} spacing={5}>
                                <Tooltip title={`
                                        Fecha de creación: ${formatDateWithHours(params.row.create)}
                                    `}>
                                    <Typography variant="body2">
                                        {`Fecha de creación: ${formatDateWithHours(params.row.create)}`}
                                    </Typography>
                                </Tooltip>
                                <Tooltip title={`
                                        Fecha de Vencimiento: ${formatDateWithHours(params.row.dueDate)}
                                    `}>
                                    <Typography variant="body2">{`Fecha de Vencimiento: ${formatDateWithHours(params.row.dueDate)}`}</Typography>
                                </Tooltip>
                            </Stack>
                        </Link>
                    </Stack>

                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            // minWidth: 100,
            // maxWidth: 100,
            flex: 1,
            headerAlign: 'center',
            align: "center",
            renderCell: (params) => (
                <Stack direction="column" spacing={2} sx={{ margin: 3 }}>
                    {
                        params.row.status === 'Abierto'
                            ?
                            (
                                <Tooltip title={params.row.status}>
                                    <Stack
                                        sx={{
                                            backgroundColor: 'primary.light',
                                            borderRadius: 3,
                                            color: '#fff',
                                            padding: 1,
                                        }}
                                    >
                                        {params.row.status}
                                    </Stack>
                                </Tooltip>
                            )
                            : params.row.status === 'Cerrado'
                                ?
                                (
                                    <Tooltip title={params.row.status}>
                                        <Stack
                                            sx={{
                                                backgroundColor: 'success.light',
                                                padding: 1,
                                                borderRadius: 3,
                                                color: '#fff'
                                            }}
                                        >
                                            {params.row.status}
                                        </Stack>
                                    </Tooltip>
                                )
                                : params.row.status === 'Escalado'
                                    ?
                                    (
                                        <Tooltip title={params.row.status}>
                                            <Stack
                                                sx={{
                                                    backgroundColor: 'warning.main',
                                                    padding: 1,
                                                    borderRadius: 3,
                                                    color: '#fff'
                                                }}
                                            >
                                                {params.row.status}
                                            </Stack>
                                        </Tooltip>
                                    )
                                    :
                                    (
                                        <Tooltip title={params.row.status}>
                                            <Stack
                                                sx={{
                                                    backgroundColor: 'info.main',
                                                    padding: 1,
                                                    borderRadius: 3,
                                                    color: '#fff'
                                                }}
                                            >
                                                {params.row.status}
                                            </Stack>
                                        </Tooltip>
                                    )
                    }
                </Stack>
            ),
        },
        {
            field: 'fkAgent',
            headerName: 'Agente',
            // minWidth: 100,
            // maxWidth: 100,
            flex: 1,
            headerAlign: 'center',
            align: "center",
        },
    ]

    if(user?.fkPermission === 0 || user?.fkPermission === undefined) return <Typography>Error al cargar los datos</Typography>

    return (
        <>
            {/* <Paper sx={{ boxShadow: 4, p: 4, marginBottom: 5, borderRadius: 3 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ boxShadow: 4, p: 4, }}>
                            aaa
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ boxShadow: 4, p: 4, }}>
                            aaa
                        </Paper>

                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ boxShadow: 4, p: 4, }}>
                            aaa
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ boxShadow: 4, p: 4, }}>
                            aaa
                        </Paper>
                    </Grid>
                </Grid>
            </Paper> */}
            <Paper sx={{ boxShadow: 4, p: 4, borderRadius: 3 }}>
                {
                    rows.length > 0
                        ?
                        (
                            // />

                            <DataGrid
                                columns={columns}
                                rows={rowsFormat}
                                getRowId={(row) => row.id}
                                rowHeight={120}
                                slots={{ toolbar: GridToolbar }}
                                columnVisibilityModel={{
                                    id: false,
                                  }}
                                sx={{padding: '0.5rem'}}
                            />

                            // <></>

                        )
                        :
                        <>
                            <EmptyTable
                                msg='Cargando....'
                            />
                        </>
                }
            </Paper>
        </>
    )
}
export { Tickets }