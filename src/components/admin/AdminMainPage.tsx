import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useAdmin, useAuth } from '../../hooks';
import { AdminCard } from './AdminCard';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { TicketMainPage, TicketSideBar } from '../Ticket';
import { AdminSideBar } from './AdminSideBar';

const AdminMainPage = () => {
    const { user } = useAuth()
    const { admonTicket } = useAdmin();

    const count = admonTicket.length;
    return (
        <>
            <Box
                sx={{
                backgroundColor: 'white',
                boxShadow: 3,
                padding: '1rem',
                display: 'flex',
                flexDirection: 
                {
                    xs: 'column-reverse',
                    md: 'row',
                },
                gap: '1.5rem',
                borderRadius: '.5rem'
                }}
            >
                <AdminSideBar/>
                <Box
                    sx={{flex:'1'}}
                >
                    <Card
                        sx={{
                            marginTop: '2.5rem',
                            padding: '1rem',
                            borderRadius: 1,
                            boxShadow: 2,
                            backgroundColor: "#f5f5f4"
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'primary',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                fontSize: '2.3rem'
                            }}
                        >Cola de Tickets</Typography>
                        <Divider>
                            <Chip label={`${count}`} />
                        </Divider>
                        <AdminCard/>
                    </Card>
                </Box>
            </Box>
        </>
  )
}

export { AdminMainPage }