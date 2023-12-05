import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTickets, useUI } from '../../hooks';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import BugReportIcon from '@mui/icons-material/BugReport';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

// import { forwarr}

const TicketModal = () => {

  const { modalOpen, toogleMenu } = useUI();
  const { branchOffices, departaments } = useTickets();

  return (    
    <Dialog
      open={modalOpen}
      onClose={toogleMenu}
    >
      <DialogTitle>
        Selecciona un Departamento
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={toogleMenu}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'white',
          backgroundColor: 'red',
          height: '2rem',
          width: '2rem'
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <List>
          {
            departaments?.length > 0 
              ?
                departaments.map(departament => (
                  <ListItem
                    key={departament.pkDepartment}
                    disablePadding
                    sx={{display: 'flex', flex: '1'}}
                  >
                    <Link href='/ticket/newTicket' component={NextLink} underline='none'>
                      <ListItemButton>
                        <ListItemIcon>
                          <BugReportIcon />
                        </ListItemIcon>
                        <ListItemText primary={departament.name}/>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))
              : 
                <ListItem>
                  <Link href='/ticket/newTicket' component={NextLink} underline='none'>
                    <ListItemButton>
                      <ListItemIcon>
                        <BugReportIcon />
                      </ListItemIcon>
                      <ListItemText primary="Error al Cargar Departamentos..." />
                    </ListItemButton>
                  </Link>
                </ListItem>

          }
        </List>
      </DialogContent>
    </Dialog>
  )
}

export { TicketModal }