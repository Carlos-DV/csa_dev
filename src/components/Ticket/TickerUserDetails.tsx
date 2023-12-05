import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EditorSun } from '../shared/Editor';
import { FC, useEffect, useRef, useState } from 'react';
import { TicketSideBarUser } from './TicketSideBarUser';
import { TicketContent } from './TicketContent';
import { IResponseTicket } from '../../interfaces';
import { TicketS3API, ticketAPI } from '../../server';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuth, useTickets } from '../../hooks';

interface IResponse {
  convertId: number
}
  
const TickerUserDetails :FC<IResponse> = ({ convertId }) => {
  const { tickets } = useTickets()
  const [ticketsInformation, setTicketInformation] = useState(tickets)
    console.log(ticketsInformation)
  const [loadingContent, setLoadingContent] = useState(false)
  const [infoS3, setInfoS3] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [ticketData, setTicketData] = useState<IResponseTicket>({
      pkTicket: 0,
      name: '',
      fkBranch: 0,
      fkCntcCode: 0,
      fkSLA: 0,
      title: '',
      description: '',
      files: '',
      status: '',
      origin: '',
      priority: '',
      create: '',
      update: '',
      dueDate: '',
      firstResponse: '',
      closeDate: '',
      isFirstResponseExpired: false,
      isSLAExpired: false,
      fkUser: 0,
      fkAgent: 0
    });

    useEffect(() => {
      const getTicketById = async () => {
          setLoading(true);
          try {
            if(convertId !== 0){
              const res = await ticketAPI.getTicketById(convertId);
              setTicketData(res);
              
            }
          }  catch (error) {
              console.log(`ex: ${error}`)
          }
          setTimeout(() => {
              setLoading(false)
            }, 500);
      }
      getTicketById()
    }, [convertId]) 

    const { user } = useAuth()
  
    if (user?.isAgent === 'true' && user.id !== ticketData.fkUser) return 'Error al cargar los datos'
    
    return (
      <>
        {
          loading 
            ?
              <LinearProgress color="primary"/>
            :
              <Box
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 3,
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 
                  {
                    xs: 'column',
                    md: 'row',
                  },
                  gap: '1.5rem',
                  borderRadius: '.5rem'
                }}
              >    
                {
                  loading 
                    ? 
                      <LinearProgress color="primary"/>
                    : 
                      <>
                        <TicketContent ticketData={ticketData}/>
                        <TicketSideBarUser ticketData={ticketData} />
                      </>
                }
              </Box>
        }
      </>
    )
  }

export  { TickerUserDetails }