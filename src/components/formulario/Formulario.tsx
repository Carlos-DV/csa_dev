import React from "react";
import { useEffect, useState } from "react";
import { baseConomientoAPI } from "../../server";
import { Footer, MainLayout } from "../../components/layouts";
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

const Formulario = () => {
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
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {departament.map((creador, index) => (
                        <Card key={index} sx={{ maxWidth: 400, marginTop: '50px', flex: '0 0 30%' }}>
                            <CardActionArea style={{ display: 'flex', justifyContent: 'left' }}>
                                <CardMedia
                                    component="img"
                                    style={{ height: '100px', width: '100px', textAlign: 'left' }}
                                    {...imagecard}
                                    alt="Card"
                                />
                                <CardContent>
                                    <Typography style={{ paddingTop: '30px' }} gutterBottom variant="h5" component="div">
                                        {creador.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Typography style={{ margin: '10px', paddingLeft: '11px' }} variant="body2" color="text.secondary">
                                {creador.description}
                            </Typography>
                            <CardActions style={{ paddingLeft: '15px' }}>
                                <Button size="small" color="info" href="formulario/rh">
                                    Enviar Ticket
                                </Button>
                                <Typography style={{ margin: '10px', paddingLeft: '11px' }} variant="body2" color="text.secondary">
                                    1 formulario
                                </Typography>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </MainLayout>
            <Footer></Footer>
        </>
    );
};

export { Formulario };
