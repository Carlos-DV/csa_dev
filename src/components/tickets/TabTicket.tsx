//material ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { FC } from 'react';
import { ITicket } from '../../interfaces'; 
import { formatDateWithHours } from '../../helpers'; 


interface IProps {
  ticket: ITicket
  setTicket: any
}

const TabTicket: FC<IProps> = ({ ticket }) => {
  return (


    < Box
      sx={{
        padding: '0.5rem',
      }
      }>
      <Typography
        sx={{
          fontWeight: 700,
          textTransform: 'capitalize',
          fontSize: '1rem',
          marginBottom: '1rem',
          ':after': {
            content: '""',
            display: 'block',
            height: '0.4rem',
            width: '5rem',
            backgroundImage: 'linear-gradient(90deg,#0087cb 0,#0087cb 50%,#eb1c23 0,#eb1c24)',
          }
        }}
      >Información Adicional del ticket</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <Stack>
            <Typography
              sx={{
                marginBottom: '0.2rem',
                fontWeight: '700'
              }}
            >Sucursal:
            </Typography>
            <Tooltip title={ticket?.branch}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  marginBottom: '0.8rem',
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
                {ticket?.branch}
              </Typography>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>

          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Departamento:
          </Typography>
          <Tooltip title={ticket?.department}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.department}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Categoría:
          </Typography>
          <Tooltip title={ticket?.category}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.category}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Subcategoría:
          </Typography>
          <Tooltip title={ticket?.subCategory}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.subCategory}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >SLA:
          </Typography>
          <Tooltip title={ticket?.sla}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.sla}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Primera Respuesta:
          </Typography>
          <Tooltip title={`${ticket?.slA_Minutes} Minutos`}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.slA_Minutes} Minutos
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Tiempo de Resolución:
          </Typography>
          <Tooltip title={`${ticket?.slA_Hours} Horas`}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.slA_Hours} Horas
            </Typography>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Origen:
          </Typography>
          <Tooltip title={ticket?.origin}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.origin}
            </Typography>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Creado:
          </Typography>
          <Tooltip title={formatDateWithHours(ticket?.create)}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {formatDateWithHours(ticket?.create)}
            </Typography>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Fecha de Vencimiento:
          </Typography>
          <Tooltip title={formatDateWithHours(ticket?.dueDate)}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {formatDateWithHours(ticket?.dueDate)}
            </Typography>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Primera Respuesta:
          </Typography>

          <Tooltip title={ticket?.update === null ? 'Sin completar' : formatDateWithHours(ticket?.update)}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                textOverflow: 'ellipsis',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.update === null ? 'Sin completar' : formatDateWithHours(ticket?.update)}
            </Typography>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography
            sx={{
              marginBottom: '0.2rem',
              fontWeight: '700'
            }}
          >Finalizado:
          </Typography>
          <Tooltip title={ticket?.closeDate === null ? 'Sin completar' : formatDateWithHours(ticket?.closeDate)}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginBottom: '0.8rem',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {ticket?.closeDate === null ? 'Sin completar' : formatDateWithHours(ticket?.closeDate)}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  )
}

export { TabTicket }