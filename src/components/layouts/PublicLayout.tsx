import { FC, ReactNode, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Box, Container } from '@mui/material';
import { Navbar } from '../ui';
import React from 'react';

interface Props {
    children: ReactNode
    title?: string;
}

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
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
                    xs: '2rem',
                    md: '3rem'
                }
            }}>
                {children}
            </Box>
        </Box>
    );
}

export { PublicLayout }