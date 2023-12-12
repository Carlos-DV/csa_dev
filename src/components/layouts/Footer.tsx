import { FC, ReactNode, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Box, Button, Container, Grid } from '@mui/material';
import { Navbar } from '../ui';



const Footer = () => {
    return (
        <>
            <Grid style={{ backgroundColor: '#f5f5f5', textAlign: 'center', marginTop:'80px', display : 'flex'}}>
                <div>
                    <h3>¿Todavía no encuentra una respuesta?</h3>
                    <p>Envíenos un Ticket y nos pondremos en contacto con usted en breve.</p>
                </div>
                <div>
                    <Button sx={{backgroundColor: '#636363', color:'white', fontSize: '15px'}} variant="outlined" href="#outlined-buttons">
                        Link
                    </Button>
                </div>
            </Grid>
            <footer
                style={{
                    backgroundColor: '#7B8FA1', position: 'absolute',
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