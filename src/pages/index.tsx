import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { Box } from '@mui/material'
import { PublicLayout } from '../components/layouts'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import ImagenTicket from '../assets/image/boleto.gif';
import ImagenBase from '../assets/image/libro.gif';
import { useRouter } from 'next/router'
import {Footer} from '../components/layouts';
import { useAuth } from "../hooks";

const Home: NextPage = () => {

  const router = useRouter();
  const { user } = useAuth();

  const RedirectBaseConocimiento = () => {
    if(user?.isAgent === "true")
    {
      router.push({pathname : '/base-conocimiento/'});
    }
    else{
      router.push({pathname : '/base-conocimiento-publico/'});
    }
  }

  const RedirectTicket = () => {
    if(user?.isAgent === "true")
    {
      router.push({ pathname :'/ticket/'});
    }
    else
    {
      router.push({ pathname :'/ticket-publico/'});
    }
  }

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
                <CardActionArea onClick={RedirectBaseConocimiento}>
                  <Image
                    alt={'Image-Base-Conocimiento'}
                    src={ImagenBase}
                    width={64}
                    height={64}
                    style={{ marginTop: '20px' }}
                  />
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
                <CardActionArea onClick={RedirectTicket}>
                  <Image
                    alt={'Image-Base-Conocimiento'}
                    src={ImagenTicket}
                    width={64}
                    height={64}
                    style={{ marginTop: '20px' }}
                  />
                  {/* <LocalActivityIcon
                  sx={{
                    marginTop: '1rem',
                    height: '4rem',
                    width: '4rem',
                  }}
                /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >
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
