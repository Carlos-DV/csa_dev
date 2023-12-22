import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Footer, MainLayout } from "../layouts";
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


const FormularioRH = () => {

    const SunEditor = dynamic(() => import("suneditor-react"), {
        ssr: false,
    });


    return (
        <>
            <MainLayout>
                <div style={{ marginTop: '100px' }}>
                    <Typography style={{ fontWeight: 'Bold', fontSize: '30px' }} gutterBottom variant="h4" component="div">
                        Envíe un Ticket
                    </Typography>
                    <Typography style={{ fontWeight: 'Bold', fontSize: '18px' }} variant="body2" color="text.secondary">
                        Información de Ticket
                    </Typography>
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <Grid item xs={1}>
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
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Es numero parte Original?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Si</MenuItem>
                            <MenuItem value={20}>No</MenuItem>
                        </Select>
                    </FormControl>
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
                    <SunEditor
                        lang="es"
                        // getSunEditorInstance={getSunEditorInstance} 
                        width="100%"
                        height="auto"
                        setOptions={{
                            buttonList: [
                                ['undo', 'redo'],
                                ['font', 'fontSize', 'formatBlock'],
                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                ['removeFormat'],
                                ['fontColor', 'hiliteColor'],
                                ['indent', 'outdent'],
                                ['align', 'horizontalRule', 'list', 'lineHeight'],
                                ['table', 'link', 'image'],
                                ['fullScreen', 'showBlocks', 'codeView'],
                                ['preview', 'print'],
                                ['save']
                            ]
                        }}
                    />
                    <Typography style={{ fontWeight: 'Bold', fontSize: '18px' }} variant="body2" color="text.secondary">
                        Información adicional
                    </Typography>
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Prioridad</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Alta</MenuItem>
                            <MenuItem value={20}>Mediana</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid item xs={12}>
                        <FormControl >
                            <TextField
                                fullWidth
                                label="N. de Orden de Compra"
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