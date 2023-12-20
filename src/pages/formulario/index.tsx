import React from "react";
import { useEffect, useState } from "react";
import { baseConomientoAPI } from "../../server";
import { Footer } from '../../components/layouts';
import { Formulario, MainLayout } from "../../components";
import imagecard from '../../assets/image/apoyo-tecnico.gif';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import { DisplaySettings } from "@mui/icons-material";

const formulario = () => {
    const [departament, setDepartament] = useState<
        { pkDepartment: number; name: string; description: string }[]
    >([]);

    const handlerDepartament = () => {
        baseConomientoAPI.getDepartament().then((res) => {
            const creadores = res.map((item: any) => ({
                pkDepartment: item.pkDepartment || 0,
                name: item.name || "",
                description: item.description || "",
            }));
            console.log(creadores);
            setDepartament(creadores);
        });
    };

    useEffect(() => {
        handlerDepartament();
    }, []);

    return (
        <>
            <MainLayout>
                <Formulario></Formulario>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {departament.map((creador, index) => (
                        <Card key={index} sx={{ maxWidth: 400, marginTop: '50px', flex: '0 0 30%' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{ height: '100px', width: '100px' }}
                                    {...imagecard}
                                    alt="Card"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {creador.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Typography variant="body2" color="text.secondary">
                                {creador.description}
                            </Typography>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Enviar Ticket
                                </Button>
                            </CardActions>
                        </Card>
                    ))}

                </div>
            </MainLayout>
            <Footer></Footer>
        </>
    );
};

export default formulario;
