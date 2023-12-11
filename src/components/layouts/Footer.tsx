import { FC, ReactNode, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Box, Container } from '@mui/material';
import { Navbar } from '../ui';



const Footer = () => {
    return (
        <>
            <footer
                style={{
                    backgroundColor: '#7B8FA1', position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '50px',
                    color: '#F1F6F9',
                    textAlign: 'center',
                    paddingTop: '15px',
                }}>Creado por Ancona Autopartes | Condiciones del servicio | Politicas de privacidad 
            </footer>
        </>
    )
}

export { Footer }