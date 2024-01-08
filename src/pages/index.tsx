import type { NextPage } from "next";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { Box } from "@mui/material";
import { PublicLayout } from "../components/layouts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import ImagenTicket from "../assets/image/boleto.gif";
import ImagenBase from "../assets/image/libro.gif";
import { useRouter } from "next/router";
import { Footer } from "../components/layouts";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { baseConomientoAPI } from "../server";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import doc from "../assets/image/docs.png";

const Home: NextPage = () => {
  const [departament, setDepartament] = useState<
    {
      pkNotas: number;
      titulo: string;
      nombre: string;
      contenido: string;
      tema: string;
    }[]
  >([]);

  const router = useRouter();
  const { user } = useAuth();

  const RedirectBaseConocimiento = () => {
    if (user?.fkPermission === 1) {
      router.push({ pathname: "/base-conocimiento/" });
    } else {
      router.push({ pathname: "/base-conocimiento-publico/" });
    }
  };

  const RedirectTicket = () => {
    if (user?.fkPermission === 1) {
      router.push({ pathname: "/ticket/" });
    } else {
      router.push({ pathname: "/ticket-publico/" });
    }
  };

  const handleRedirect = (pkNotas: any, contenido: any) => {
    router.push({
      pathname: "/base-conocimiento-publico/ViewBaseConocimiento/",
      query: { pkNotas: pkNotas, contenido: contenido },
    });
  };

  const handlerTopPublic = () => {
    baseConomientoAPI.GetTopPublic().then((res) => {
      const datos = res.map((item: any) => ({
        pkNotas: item.pkNotas || 0,
        titulo: item.titulo || "",
        nombre: item.nombre || "",
        tema: item.tema || "",
        contenido: item.contenido || "",
      }));
      setDepartament(res);
      console.log("Top de publico", res);
    });
  };

  const handlerTopRegister = () => {
    baseConomientoAPI.GetTopRegister().then((res) => {
      const datos = res.map((item: any) => ({
        pkNotas: item.pkNotas || 0,
        titulo: item.titulo || "",
        nombre: item.nombre || "",
        tema: item.tema || "",
        contenido: item.contenido || "",
      }));
      setDepartament(datos);
      console.log("register", res);
    });
  };

  const Validation = () => {
    if (user?.fkPermission === 1) {
      handlerTopRegister();
    } else {
      // handlerTopPublic();
      console.log("show public")
    }
  };

  useEffect(() => {
    Validation();
  }, []);

  return (
    <>
      <PublicLayout>
        <div className={styles.contentImage}>
          <Box
            sx={{
              flexDirection: "column",
              alignItems: "center", // Añade esta línea para centrar verticalmente
              justifyContent: "center", // Añade esta línea para centrar horizontalmente
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                paddingTop: "2rem",
                color: "white",
              }}
            >
              Le damos la bienvenida a CSA Centro de Servicios Ancona
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                paddingTop: "2rem",
                color: "white",
              }}
            >
              Busque en nuestra Base de conocimientos, pregunte a la Comunidad o
              envíe un Ticket.
            </Typography>
          </Box>
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-evenly",
            alignContent: "center",
            gap: "2 rem",
            marginTop: "3rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  textAlign: "center",
                  boxShadow: 5,
                  borderRadius: 3,
                  marginLeft: 25,
                }}
              >
                <CardActionArea onClick={RedirectBaseConocimiento}>
                  <Image
                    alt={"Image-Base-Conocimiento"}
                    src={ImagenBase}
                    width={64}
                    height={64}
                    style={{ marginTop: "20px" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Base de conocimientos
                    </Typography>
                    <Typography color="text.secondary">
                      Busque en nuestra colección de artículos, guías de usuario
                      y preguntas frecuentes.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  textAlign: "center",
                  boxShadow: 5,
                  borderRadius: 3,
                  marginRight: 25,
                }}
              >
                <CardActionArea onClick={RedirectTicket}>
                  <Image
                    alt={"Image-Base-Conocimiento"}
                    src={ImagenTicket}
                    width={64}
                    height={64}
                    style={{ marginTop: "20px" }}
                  />
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
                      Vea sus tickets anteriores, conozca el estado y la
                      solución a los mismos.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <div
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "80px",
            paddingLeft: "290px",
          }}
        >
          <div style={{ display: "flex" }}>
            <LibraryAddIcon
              style={{
                marginTop: "6px",
              }}
            ></LibraryAddIcon>
            <Typography
              style={{
                fontSize: "25px",
                paddingLeft: "10px",
                fontWeight: "Bold",
              }}
            >
              Artículos recientes
            </Typography>
          </div>
          {departament.map((creador, index) => (
            <div key={index}>
              <div
                style={{
                  marginLeft: "30px",
                  display: "flex",
                  marginTop: "15px",
                }}
              >
                <Image
                  style={{
                    height: "1.3rem",
                    width: "1.3rem",
                    //marginTop: '5px',
                    marginRight: "5px",
                  }}
                  alt=""
                  src={doc}
                ></Image>
                <Typography
                  onClick={() =>
                    handleRedirect(creador.pkNotas, creador.contenido)
                  }
                  gutterBottom
                  style={{ fontSize: "17px", cursor: 'pointer' }}
                >
                  {creador.titulo}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </PublicLayout>
      <Footer></Footer>
    </>
  );
};

export default Home;
