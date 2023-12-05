import { Box } from '@mui/material'
import React from 'react'
import { TicketSelectFilter } from './TicketSelectFilter'
import { ListOfTickets } from './ListOfTickets'

const TicketMainPage = () => {
  return (
    <Box
        sx={{
            flex: '1',
        }}
    >
        <TicketSelectFilter/>
        <ListOfTickets/>
    </Box>
  )
}

export {TicketMainPage}