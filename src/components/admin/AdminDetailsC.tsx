import { FC, useEffect, useRef, useState } from 'react';
import { IResponseTicket } from '../../interfaces';
import { ticketAPI } from '../../server';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
import { TicketContent, TicketSideBarUser } from '../Ticket';
import { AdminContent } from './AdminContent';

interface IResponse {
    convertId: number
  }

const AdminDetailsC : FC<IResponse> = ({convertId}) => {

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
                        <AdminContent ticketData={ticketData}/>
                        <TicketSideBarUser ticketData={ticketData} />
                      </>
                }
              </Box>
        }
      </>
    )

}

export { AdminDetailsC }