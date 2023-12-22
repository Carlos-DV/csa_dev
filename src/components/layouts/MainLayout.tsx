import { FC, ReactNode, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Box, Container } from '@mui/material';
import { Navbar } from '../ui';
import { Footer } from './Footer';

interface Props {
  children: ReactNode
  title?: string;
}

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box>
      <Head>
        <title>CSA - Centro de Servicios de Ancona</title>
        <meta name="description" content="Home Page " />
        <link rel="icon" href="../favicon.ic" />
      </Head>
      <Navbar />
      <Box sx={{
        marginTop: {
          xs: '10rem',
          md: '8rem'
        },
        height: '100vh'
      }}>
        <Container
          maxWidth="xl"
        >
          {children}
        </Container>
      </Box>
      <Footer />
        </Box>
  )
}

export { MainLayout }