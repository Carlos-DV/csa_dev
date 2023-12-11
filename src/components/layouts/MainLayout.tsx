import { FC, ReactNode, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Box, Container } from '@mui/material';
import { Navbar } from '../ui';

interface Props {
    children: ReactNode
    title?: string;
}

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box>
        <Head>
            <title>CSA - Centro de Servicios de Ancona</title>
            <meta name="description" content="Home Page "/>
            <link rel="icon" href="../favicon.ic" />
        </Head>
        <Navbar/>
        <Box sx={{ marginTop: {
          xs: '2rem',
          md: '3rem'
        }}}>
        <Container
          maxWidth="xl"
        >
          {children}
        </Container>
        </Box>
    </Box>
  )
}

export { MainLayout }