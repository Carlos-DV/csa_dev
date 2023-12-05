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
import ComputerIcon from '@mui/icons-material/Computer';
import { useAdmin, useAuth } from '../../hooks';
import MenuIcon from '@mui/icons-material/Menu';
import CardActionArea from '@mui/material/CardActionArea';

const AdminCard = () => {
    const { admonTicket } = useAdmin();
    return (
      <>
        {
          admonTicket.length > 0 
          ?
            admonTicket.map(at => (
              <Card
                key={at.pkTicket}
                sx={{ 
                  boxShadow: 4,
                  marginTop: '0.5rem',
                  borderRadius: 1,
                  '&:hover': {
                    boxShadow: 8,
                    bgcolor: '#f1f1f1'
                  }
              }}
              >
                <CardContent
                  sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: '1rem'
                  }}
                >
                  <Box sx={{width: '1%', display:'flex',alignContent:'center', alignItems:'center', justifyContent:'center', textAlign:'center', marginLeft: 1}}>
                    <ComputerIcon sx={{color:'primary.main'}}/>
                  </Box>
                  <Box 
                    sx={{display: 'flex', flexDirection:'row', justifyContent:'space-between', flex:1}}
                  >
                    <Box>
                      <Box>
                      <Typography sx={{fontWeight:'700', textTransform:'uppercase', color:'primary.main'}}>{at.title}</Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', gap: '2rem', padding: '0.2rem' }}
                      >
                        <Typography sx={{ fontSize: '0.8rem', color: 'primary.light', 
                        }}
                        >
                          {at.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: 'primary.light',
                        }}>
                          {at.fkUser}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: 'primary.light',
                        }}>
                          {formatDate(at.create)}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: 'primary.light',
                        }}>
                          {formatDate(at.dueDate)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display:'flex',alignContent:'center', alignItems:'center', justifyContent:'center', textAlign:'center', gap:2}}
                    >
                      <Typography
                        sx={{fontSize: '1rem', color: 'primary.main'}}
                      >{at.status}</Typography>
                      <MenuIcon/>
                      <Typography
                        sx={{fontSize: '0.8rem', color: 'primary.main'}}
                      >{at.fkAgent}</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                <Link 
                    href={`/admin/adminDetail/${at.pkTicket}`} 
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
            ))
          :
            <Typography
              sx={{
                  marginTop: '2rem',
                  marginBottom: '2rem',
                  textAlign: 'center'
              }}
            >Aún no hay ningun admin adminste departamento</Typography>
        }
      </>
    )
}
export { AdminCard }