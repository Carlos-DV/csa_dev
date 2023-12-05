import React from 'react'
import { UIProvider } from '../../context/ui/UIProvider'
import { MainLayout } from '../../components/layouts'
import { TicketFormTI } from '../../components/Ticket/Forms'
import { useAuth } from '../../hooks'

const newTicket = () => {

  return (
    <UIProvider>
    <MainLayout>
        <TicketFormTI/>
    </MainLayout>
  </UIProvider>
  )
}

export default newTicket