import Ticket from '../../components/Ticket'
import { MainLayout } from '../../components/layouts'
import { UIProvider } from '../../context/ui/UIProvider'


const ticketPage = () => {
  return (
    <UIProvider>
      <MainLayout>
          <Ticket/>
      </MainLayout>
    </UIProvider>
  )
}

export default ticketPage