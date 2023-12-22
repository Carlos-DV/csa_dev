import { Tickets } from '../../components'
import { MainLayout } from '../../components/layouts'
import { UIProvider } from '../../context/ui/UIProvider'


const ticketPage = () => {
  return (
    <UIProvider>
      <MainLayout>
          <Tickets/>
      </MainLayout>
    </UIProvider>
  )
}

export default ticketPage