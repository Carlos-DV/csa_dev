import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import TimerIcon from '@mui/icons-material/Timer';
import MessageIcon from '@mui/icons-material/Message';
import DraftsIcon from '@mui/icons-material/Drafts';
import { TicketModal } from './';
import { useTickets, useUI } from '../../hooks';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { FC } from 'react';
import { IResponseTicket, IResponseTicketFullData } from '../../interfaces';
import { formatDate } from '../../helpers';

interface IResponseProp {
  ticketData: IResponseTicket;
  // currentTicket: IResponseTicketFullData[]
}
const TicketSideBarUser :FC<IResponseProp>= ({ticketData}) => {

  const { tickets } = useTickets();
  const dataFilter = tickets.filter(info => info.pkTicket === ticketData.pkTicket)
  return (
    <Box
        sx={{
            // flexWrap: 1,
            flex:'30%'
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
        onClick={() => {}}
      >
        Crear Ticket
      </Button>
        <Box
          sx={{
            marginTop: '1.5rem'
          }}
        >
          <Divider>
            <Chip 
              label="Propiedades del Ticket" 
              sx={{
                fontSize: '1rem',
                fontWeight: '700'
              }}
            />
          </Divider> 
          <Typography 
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }}
          >Ticket: 
              <Typography 
                component={"span"}
                sx={{
                  color: "primary.light",
                  fontSize: 14.5
                }}
              > {dataFilter[0]?.name}</Typography>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Estado:
            <Typography                 
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.status}</Typography>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Asginado a:
            <Typography               
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}> {dataFilter[0]?.fkAgent}</Typography>
          </Typography>
          <Typography
              variant='subtitle1'
              sx={{
                color: "primary.main",
              }} 
            >Canal:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.origin}</Typography>
          </Typography>
          <Typography 
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Sucursal
            <Typography               
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.fkBranch}</Typography>
          </Typography>
          <Divider>
            <Chip 
              label="Información del Ticket" 
              sx={{
                fontSize: '1rem',
                fontWeight: '700'
              }}
            />
          </Divider> 
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Departamento:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.departmentName}</Typography>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Categoría:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.categoryName}</Typography>
          </Typography>
          <Typography 
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >SubCategoría:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.subCategoryName}</Typography>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >SLA:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.slaName}</Typography>
          </Typography>
          <Divider>
            <Chip 
              label="Información adicional"             
              sx={{
                fontSize: '1rem',
                fontWeight: '700'
              }}
            />
          </Divider> 
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Prioridad:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.priority}</Typography>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Fecha de creación:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.create !== undefined  ? formatDate(dataFilter[0]?.create) : 'sin asginar'}</Typography>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Primera respuesta:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.firstResponse !== undefined  ? formatDate(dataFilter[0]?.create) : 'sin asginar'}</Typography>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Fecha de vencimiento:
            <Typography
              component={"span"}
              sx={{
                color: "primary.light",
                fontSize: 14.5
              }}
            > {dataFilter[0]?.create !== undefined  ? formatDate(dataFilter[0]?.dueDate) : 'sin asginar'}</Typography>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
            }} 
          >Correo electrónico: </Typography>
        </Box>
    </Box>
  )
}

export  { TicketSideBarUser }