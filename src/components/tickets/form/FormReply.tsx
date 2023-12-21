'use client'
import { useAuth, useTickets, useUI } from "../../../hooks";
import { IMessageFollowUp, IResponseFollowUp, ITicket } from '../../../interfaces'
import { FC, useState, FormEvent } from 'react';
import { EditorSun } from "../../shared";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { useSession } from "next-auth/react";
import { getDateNowFormat } from "../../../helpers"; 
import { ticketAPI } from "../../../server";
// import AnimateButton from 'components/@extended/AnimateButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Stack from "@mui/material/Stack";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
interface IResponseProp {
  ticket: ITicket;
  setTicket: any;
  setOpenSnackBar:any;
  setSnackBarType:any;
  setSnackBarMessage:any;
}

const FormReply: FC<IResponseProp> = ({ ticket, setTicket,setOpenSnackBar,setSnackBarType,setSnackBarMessage }) => {
  const [description, setDescription] = useState<string>('');
  const { toogleReply } = useUI();
  const { user } = useAuth();
  // const { data } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeDataEditor = (content: string) => {
    setDescription(content)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([description].includes("")) {
      // handleSnackBar({ snackBarMessage: "El mensaje no puede ir vacio...", snackBarType: "error" });
      setSnackBarType('error');
      setSnackBarMessage('El mensaje no puede ir vacio...');
      setOpenSnackBar(true);
      return;
    }
    //msg for follow s3
    const newMessage: IMessageFollowUp = {
      idMessage: crypto.randomUUID(),
      pkTicket: ticket.pkTicket,
      message: description,
      date: getDateNowFormat(),
      fkUserName: user?.userName,
      fkUser: user?.id,
      type: user?.id !== ticket.fkUser ? "Receptor" : "Emisor",
    };

    //msg for db
    const newReponse: IResponseFollowUp = {
      fkTicket: ticket.pkTicket,
      message: JSON.stringify([newMessage]),
      timeForMessage: 5,
      ticketFollowUpFiles: ''
    }
    console.log(newReponse);
    handleSubmitAPI(newReponse);
    toogleReply();
  };

  const handleSubmitAPI = async (dataResponse: IResponseFollowUp) => {
    try {
      const data = await ticketAPI.createFollowUp(dataResponse);
      console.log(data);
      // handleSnackBar({ snackBarMessage: "Mensaje enviado correctamente...", snackBarType: "success" });
      setSnackBarType('success');
      setSnackBarMessage('Mensaje enviado correctamente...');
      setOpenSnackBar(true);
    } catch (error) {
      // handleSnackBar({ snackBarMessage: "Error al intentar enviar el mensaje...", snackBarType: "error" });
      setSnackBarType('error');
      setSnackBarMessage('Error al intentar enviar el mensaje...');
      setOpenSnackBar(true);
      console.log(`Excepción: ${error}`);
    }
  }

  const handleSubmitCloseAPI = async () => {

    const newMessage: IMessageFollowUp = {
      idMessage: crypto.randomUUID(),
      pkTicket: ticket.pkTicket,
      message: description,
      date: getDateNowFormat(),
      fkUserName: user?.userName,
      fkUser: user?.id,
      type: user?.id !== ticket.fkUser ? "Receptor" : "Emisor",
    };

    //msg for db
    const newReponse: IResponseFollowUp = {
      fkTicket: ticket.pkTicket,
      message: JSON.stringify([newMessage]),
      timeForMessage: 5,
      ticketFollowUpFiles: ''
    }
    // console.log(newMessage);
    // console.log(newReponse);
    try {
      const newInfo = {
        ...newReponse,
        IsFinish: true,
      }
      const data = await ticketAPI.createFollowUp(newInfo);
      // handleSnackBar({ snackBarMessage: "Mensaje enviado correctamente...", snackBarType: "success" });
      setSnackBarType('success');
      setSnackBarMessage('Mensaje enviado correctamente...');
      setOpenSnackBar(true);
      const closeTicket = { ...ticket, status: "Cerrado" };
      console.log(data);
      setTicket(closeTicket);
      handleClose();
      toogleReply();
    } catch (error) {
      // handleSnackBar({ snackBarMessage: "Error al intentar enviar el mensaje...", snackBarType: "error" });
      setSnackBarType('error');
      setSnackBarMessage('Error al intentar enviar el mensaje...');
      setOpenSnackBar(true);
      console.log(`Excepción: ${error}`);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
      >
        {/* <Accordion
          sx={{ marginTop: '2rem', marginBottom: '2rem' }}
          defaultExpanded={true}
          disabled={true}
        > */}
          {/* <AccordionSummary> */}
            {/* <Typography>Escribe tu respuesta</Typography> */}
          {/* </AccordionSummary> */}
          {/* <AccordionDetails> */}
          <Box sx={{marginTop:'1.5rem', marginBottom:'1.5rem'}}>
            <EditorSun
              handleChangeDataEditor={handleChangeDataEditor}
            />
            </Box>
          {/* </AccordionDetails> */}
        {/* </Accordion> */}
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}
        >
          <Stack direction="row" justifyContent="flex-end">
            {/* <AnimateButton> */}
              <Button
                variant='contained'
                size='small'
                type='submit'
                sx={{ borderRadius: '0.5rem 0 0 0.5rem' }}
              >
                Enviar
              </Button>
            {/* </AnimateButton>
            <AnimateButton> */}
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size='small'
                sx={{
                  borderRadius: '0 0.5rem 0.5rem 0',
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#fff'
                  }
                }}
                style={{ maxHeight: '31px', minHeight: '31px' }}
              >
                <ArrowDropDownIcon />
              </IconButton>
            {/* </AnimateButton> */}
          </Stack>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleSubmitCloseAPI()}>Enviar y Cerrar</MenuItem>
          </Menu>

          {/* <AnimateButton> */}
            <Button
              color='error'
              variant='contained'
              size='small'
              onClick={toogleReply}
            >
              Cancelar
            </Button>
          {/* </AnimateButton> */}
        </Box>
      </form>
    </>
  )
}
export { FormReply }