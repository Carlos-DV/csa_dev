import { FC, ReactNode, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Box, Button, Container, Grid } from '@mui/material';
import { Navbar } from '../ui';



const Footer = () => {
    return (
        <>
            <div style={{ backgroundColor: '#f5f5f5', textAlign: 'center', padding: '20px 0', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '50px' }}>
                <div>
                    <h2>¿Todavía no encuentra una respuesta?</h2>
                    <p>Envíenos un Ticket y nos pondremos en contacto con usted en breve.</p>
                </div>
                <div>
                    <Button sx={{ backgroundColor: '#636363', color: 'white', fontSize: '15px', borderRadius: '20px', height: '50px' }} variant="outlined" href="/formulario">
                        Envie un Ticket
                    </Button>
                </div>
            </div>

            <footer style={{
                backgroundColor: '#232D3F',
                position: 'relative',
                bottom: 0,
                width: '100%',
                height: '50px',
                color: '#F1F6F9',
                textAlign: 'center',
                paddingTop: '15px',
            }}>
                Creado por Ancona Autopartes | &copy; 2023 Todos los derechos reservados
            </footer>

        </>
    )
}

export { Footer }