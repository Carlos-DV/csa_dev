import { Box } from '@mui/material';
import { TicketMainPage } from './TicketMainPage';
import { TicketSideBar } from './TicketSideBar';
import { useAuth } from '../../hooks';

const Ticket = () => {
  const { user } = useAuth();
  if (user?.isAgent === 'true' && user.id) return 'Error al cargar los datos'
  return (
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
      <TicketMainPage/>
      <TicketSideBar/>
    </Box>
  )
}

export default Ticket