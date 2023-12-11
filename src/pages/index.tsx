import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { Box } from '@mui/material'
import { PublicLayout, Footer } from '../components/layouts'
import SchoolIcon from '@mui/icons-material/School';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import ImagenTicket from '../assets/tickets.png';
import ImagenBase from '../assets/book.png';

const Home: NextPage = () => {
  return (
    <>
      <PublicLayout>
        <div
          className={styles.contentImage}
        >
          <Box
            sx={{
              flexDirection: 'column',
              alignItems: 'center', // Añade esta línea para centrar verticalmente
              justifyContent: 'center', // Añade esta línea para centrar horizontalmente
            }}
          >
            <Typography
              variant='h4'
              sx={{
                textAlign: 'center',
                textTransform: 'uppercase',
                paddingTop: '2rem',
                color: 'white'
              }}
            >Le damos la bienvenida a CSA Centro de Servicios Ancona</Typography>
            <Typography
              sx={{
                textAlign: 'center',
                textTransform: 'uppercase',
                paddingTop: '2rem',
                color: 'white'
              }}
            >
              Busque en nuestra Base de conocimientos, pregunte a la Comunidad o envíe un Ticket.
            </Typography>
          </Box>
        </div>

        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            justifyContent: 'space-evenly',
            alignContent: 'center',
            gap: '2 rem',
            marginTop: '3rem'
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Card
                sx={{
                  textAlign: 'center',
                  boxShadow: 5,
                  borderRadius: 3,
                  marginLeft: 25

                }}
              >
                <CardActionArea>
                  <Image style={{
                    height: '4rem',
                    width: '4rem', marginTop: '20px'
                  }} alt={''} {...ImagenBase}></Image>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Base de conocimientos
                    </Typography>
                    <Typography color="text.secondary">
                      Busque en nuestra colección de artículos, guías de usuario y preguntas frecuentes.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Card
                sx={{
                  textAlign: 'center',
                  boxShadow: 5,
                  borderRadius: 3,
                  marginRight: 25
                }}
              >
                <CardActionArea>
                  <Image style={{
                    height: '4rem',
                    width: '4rem', marginTop: '20px'
                  }} alt={''} {...ImagenTicket}></Image>
                  {/* <LocalActivityIcon
                  sx={{
                    marginTop: '1rem',
                    height: '4rem',
                    width: '4rem',
                  }}
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Tickets
                    </Typography>
                    <Typography color="text.secondary">
                      Vea sus tickets anteriores, conozca el estado y la solución a los mismos.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PublicLayout>
      <Footer></Footer>
    </>
  )
}

export default Home
