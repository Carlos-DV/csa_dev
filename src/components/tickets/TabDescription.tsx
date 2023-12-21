'use client'
//react
import { Dispatch, FC, SetStateAction } from 'react'
//components
import { ShowEditorSun } from '../shared'; 
//material ui
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
//interfaces
import { ITicket } from '../../interfaces'; 


interface IResponseProp {
    ticket: ITicket;
    setValue: Dispatch<SetStateAction<number>>
}


const TabDescription: FC<IResponseProp> = ({ ticket, setValue }) => {

    let service = '';
    if (ticket && ticket.description !== '') {
        service = ticket?.description
    } else {
        service = 'Error.'
    }

    const handleChange = () => {
        setValue(2);
    }

    return (
        <>
            <Paper sx={{
                // // borderRadius: 4,
                // // boxShadow: 10,
                // margin: '0rem',
                // padding: '0rem',
                backgroundColor: '#ffffffd1'
            }}
            >
                {ticket && ticket.description !== '' ? (
                    <ShowEditorSun infoS3={service} />
                ) : (
                    <Typography>Cargando...</Typography>
                )}
            </Paper>
            <form
                onSubmit={() => { }}
            >
                <Stack direction="row" justifyContent="flex-end" sx={{marginBottom:'0.4rem'}}>

                    {/* <AnimateButton> */}
                        <Button
                            startIcon={<QuestionAnswerIcon />}
                            size="small"
                            variant="contained"
                            onClick={ handleChange }
                            color="primary"
                            disabled={ticket.status === "Cerrado"}
                            sx={{
                                my: 3,
                                ml: 1,
                            }}
                        >
                            Responder
                        </Button>
                    {/* </AnimateButton> */}

                    {/* <AnimateButton> */}
                        {/* <Button
                            variant="contained"
                            type='submit'
                            sx={{
                                my: 3,
                                ml: 1,
                                backgroundColor: ticket.status === "Cerrado" ? 'success.main' : 'error.main',
                                '&:Hover': {
                                    backgroundColor: ticket.status === "Cerrado" ? 'success.main' : 'error.main'
                                }
                            }}
                            size="small"
                            disabled={ticket.status === "Cerrado"}
                        >
                            {ticket.status === "Cerrado" ? 'Ticket Cerrado' : 'Cerrar Ticket'}
                        </Button> */}
                    {/* </AnimateButton> */}
                </Stack>
            </form>
        </>
    )
}

export {
    TabDescription
}
