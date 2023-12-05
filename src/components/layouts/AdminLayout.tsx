import { FC, ReactNode, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Box, Container } from '@mui/material';
import { Navbar } from '../ui';

interface Props {
    children: ReactNode
    title?: string;
}

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box>
        <Head>
            <title>Administrador de tickets</title>
            <meta name="description" content="Home Page "/>
            <link rel="icon" href="../favicon.ic" />
        </Head>
        <Navbar/>
        <Box sx={{marginTop: '2rem'}}>
          <Container
            maxWidth="xl"
          >
            {children}
          </Container>
        </Box>
    </Box>

  )
}

export { AdminLayout }