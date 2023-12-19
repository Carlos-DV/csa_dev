import React from "react";
import { useEffect, useState } from "react";
import { baseConomientoAPI } from "../../server";
import { Formulario, MainLayout } from "../../components";
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";

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
                {departament.map((creador, index) => (
                    <Card key={index} sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {creador.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {creador.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Enviar Ticket
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </MainLayout>
        </>
    );
};

export default formulario;
