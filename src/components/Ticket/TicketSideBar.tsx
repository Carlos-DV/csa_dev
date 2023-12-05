import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import TimerIcon from '@mui/icons-material/Timer';
import MessageIcon from '@mui/icons-material/Message';
import DraftsIcon from '@mui/icons-material/Drafts';
import { TicketModal } from './';
import { useUI } from '../../hooks';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

const TicketSideBar = () => {

  const { modalOpen, toogleMenu} = useUI(); 

  return (
    <Box
        sx={{
          display:'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
        }}
    >
      <Button 
        sx={{
          marginTop: '1.5rem',
          padding:'0.5rem',
          width: '100%'
        }}
        variant="contained" 
        endIcon={<SendIcon />}
        size="small"
        onClick={toogleMenu}
      >
        Crear Ticket
      </Button>
      <Typography
        sx={{
          marginTop: '2rem',
          marginLeft: '0.5rem'
        }}
      >
        Selecciona una opcíon para filtrar tus tickets
      </Typography>


      <List sx={style} component="nav" aria-label="mailbox folders">

        <ListItem disablePadding >
          <ListItemButton>
          <ListItemIcon>
            <LocalActivityIcon/>
          </ListItemIcon>
          <ListItemText primary="Mis Tickets" />
          </ListItemButton>
        </ListItem>

      <Divider />

      <ListItem  divider disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon/>
        </ListItemIcon>
        <ListItemText primary="Mis Tickets abiertos" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
        <ListItemIcon>
          <MarkEmailReadIcon/>
        </ListItemIcon>
        <ListItemText primary="Mis Tickets cerrados" />
        </ListItemButton>
      </ListItem>

      <Divider  />

      <ListItem disablePadding >
        <ListItemButton>
        <ListItemIcon>
          <TimerIcon/>
        </ListItemIcon>
        <ListItemText primary="Mis En espera Tickets" />
        </ListItemButton>
      </ListItem>

      <Divider  />

      <ListItem disablePadding>
        <ListItemButton>
        <ListItemIcon>
          <MarkunreadMailboxIcon/>
        </ListItemIcon>
        <ListItemText primary="Mis Tickets vencidos" />
        </ListItemButton>
      </ListItem>

    </List>
    <TicketModal/>
    </Box>
  )
}

export  {TicketSideBar}