import {
  AppBar,
  Box,
  Container,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import AnconaLogo from "../../assets/AnconaLogo.png";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../hooks";
import { userAgent } from "next/server";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  console.log(typeof user?.isAgent);
  return (
    <AppBar
      //position='sticky'
      elevation={5}
      sx={
        {
          // padding: '0.5rem'
        }
      }
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            gap: "1rem",
            padding: 0,
            margin: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: {
                xs: "1",
                md: "none",
              },
              flexDirection: {
                xs: "column",
                md: "row",
              },
              justifyContent: {
                xs: "center",
                md: "space-between",
              },
              alignContent: "center",
              alignItems: "center",
              gap: ".5rem",
              padding: 0,
              margin: 0,
            }}
          >
            <IconButton>
              <Image src={AnconaLogo} alt="logo" width={150} priority={true} />
            </IconButton>
            <ListItemText style={{ color: "white" }}>
              CSA Centro de Servicios Ancona
            </ListItemText>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link
                href={"/"}
                component={NextLink}
                underline="none"
                sx={{
                  color: "white",
                }}
              >
                <ListItemButton>
                  <ListItemText>Inicio</ListItemText>
                </ListItemButton>
              </Link>
              {user && user?.isAgent === "true" ? (
                <>
                  <Link
                    href={"/admin"}
                    component={NextLink}
                    underline="none"
                    color={"white"}
                  >
                    <ListItemButton>
                      <ListItemText>Admin</ListItemText>
                    </ListItemButton>
                  </Link>
                  <Link
                    href={"/base-conocimiento"}
                    component={NextLink}
                    underline="none"
                    color={"white"}
                  >
                    <ListItemButton>
                      <ListItemText>Base Conocimiento</ListItemText>
                    </ListItemButton>
                  </Link>
                </>
              ) : user && user?.isAgent === "false" ? (
                <>
                  <Link
                    href={"/ticket"}
                    component={NextLink}
                    underline="none"
                    color={"white"}
                  >
                    <ListItemButton>
                      <ListItemText>Ticket</ListItemText>
                    </ListItemButton>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={"ticket-publico"}
                    component={NextLink}
                    underline="none"
                    color={"white"}
                  >
                    <ListItemButton>
                      <ListItemText>Ticket Público</ListItemText>
                    </ListItemButton>
                  </Link>
                  <Link
                    href={"/base-conocimiento-publico"}
                    component={NextLink}
                    underline="none"
                    color={"white"}
                    sx={{ fontWeight: "blod" }}
                  >
                    <ListItemButton>
                      <ListItemText>Base de Conocimiento</ListItemText>
                    </ListItemButton>
                  </Link>
                </>
              )}
              {
                !isLoggedIn ? (
                  <Link
                    href={"/login"}
                    component={NextLink}
                    underline="none"
                    color={"white"}
                  >
                    <ListItemButton>
                      <ListItemText>Login</ListItemText>
                    </ListItemButton>
                  </Link>
                ) : (
                  // <Link
                  //   href={'/'}
                  //   component={NextLink}
                  //   underline='none'
                  //   color={'white'}
                  // >
                  <ListItemButton onClick={logout}>
                    <ListItemText>Logout</ListItemText>
                  </ListItemButton>
                )
                // </Link>
              }
            </List>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Navbar };
