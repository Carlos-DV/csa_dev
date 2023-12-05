import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Box, Link } from '@mui/material';
import NextLink from 'next/link';
import { FC, useEffect, useState } from 'react';
import { ticketAPI } from '../../server';
import { IResponseTicket, IResponseTicketFullData } from '../../interfaces';
import { formatDate } from '../../helpers';
import { useAuth } from '../../hooks';

interface TicketCardProps {
    ticket: IResponseTicketFullData;
  }
  
const TicketCard :FC<TicketCardProps>= ({ ticket }) => {
    // console.log(ticket)
    const { pkTicket, name, fkBranch, fkCntcCode, slaName, title, description, status, origin, priority, create, update, closeDate, isFirstResponseExpired, isSLAExpired, fkAgent, fkUser, dueDate } = ticket;
    // console.log(`${create} --- ${dueDate}`)
    const { isLoggedIn } = useAuth();
    // console.log(isLoggedIn)
    // isLoggedIn
    return (
        <Card
            sx={{ 
                boxShadow: 3,
                marginTop: '1.5rem',
                borderRadius: 2
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '2rem'
                }}
            >
                <div>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                            marginTop: '0.5rem'
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        sx={{
                            marginTop: '0.5rem'
                        }}
                    >
                        {`Recibido: ${formatDate(create)}`}
                    </Typography>    
                    <Typography
                        sx={{
                            marginTop: '0.5rem'
                        }}
                    >
                        {`Vence: ${formatDate(dueDate)}`}
                    </Typography>               
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        // alignContent: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <Avatar sx={{ 
                        bgcolor: '#000',
                        width: 50, 
                        height: 50
                        }}
                    >CA</Avatar>
                    <Divider
                        sx={{
                            // marginTop: '0.5rem',
                            color: '#8f5959'
                        }}
                    >
                        <Chip label={status}/>
                    </Divider>
                    {/* <Button 
                    size='small' 
                    variant='contained'
                    endIcon={<VisibilityIcon />}
                    sx={{
                        textAlign:'center'
                    }}
                >
                    Ver más
                </Button> */}
                </Box>
            </CardContent>
            <CardActions>
                <Link 
                    href={`/ticket/ticketDetail/${pkTicket}`} 
                    component={NextLink}
                    underline='none'
                >                
                    <Button 
                        size='small' 
                        variant='contained'
                        endIcon={<VisibilityIcon />}
                    >
                        Ver más
                    </Button>
                </Link>
            </CardActions>
        </Card>
  )
}

export { TicketCard }