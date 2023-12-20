import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { Footer, MainLayout } from "../layouts";


const FormularioRH = () => {
    return (
        <>
            <MainLayout >
                <div style={{ marginTop: '100px' }}>
                    <Typography style={{ fontWeight: 'Bold', fontSize: '30px' }} gutterBottom variant="h4" component="div">
                        Envíe un Ticket
                    </Typography>
                    <Typography style={{ fontWeight: 'Bold', fontSize: '18px' }} variant="body2" color="text.secondary">
                        Información de Ticket
                    </Typography>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Marca *"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Modelo *"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Año *"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Es numero parte Original? *"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Numero de parte *"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Nombre de Contacto *"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="¿Quién levanta el ticket? "
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Correo electrónico"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Teléfono *"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="Asunto *"
                                name="folio"
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                </div>
            </MainLayout>
            <Footer></Footer>
        </>
    );
}

export { FormularioRH };