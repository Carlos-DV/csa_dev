import { useRouter } from "next/router";
import { BaseConocimiento, MainLayout } from "../../components";
import { useEffect, useState } from "react";
import { baseConomientoAPI } from "../../server";
import { Typography } from "@mui/material";
import maletin from "../../assets/image/maletin.png";
import doc from "../../assets/image/docs.png";
import portafolio from "../../assets/image/portafolio.png";
import Image from "next/image";

const ViewBaseConocimiento = () => {
    const router = useRouter();
    const [departament, setDepartament] = useState<
        {
            pkNotas: number;
            titulo: string;
            nombre: string;
            contenido: string;
            tema: string;
        }[]
    >([]);

    const pkDepartment = Array.isArray(router.query.pkDepartment)
        ? router.query.pkDepartment[0]
        : router.query.pkDepartment || "";
    console.log("datos", pkDepartment);

    const handlerTemas = () => {
        baseConomientoAPI.getPublicTemas(pkDepartment).then((res) => {
            const datos = res.map((item: any) => ({
                pkNotas: item.pkNotas || 0,
                titulo: item.titulo || "",
                nombre: item.nombre || "",
                tema: item.tema || "",
                contenido: item.contenido || "",
            }));
            setDepartament(datos);
        });
    };

    useEffect(() => {
        handlerTemas();
    }, []);

    return (
        <>
            <MainLayout>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div style={{ display: "flex" }}>
                    <Image
                        style={{
                            height: "2.8rem",
                            width: "2.8rem",
                            marginTop: "5px",
                        }}
                        alt=""
                        {...portafolio}
                    ></Image>
                    <Typography gutterBottom variant="h5" component="div" style={{marginTop: '15px', marginLeft:'15px'}}>
                        AWS
                    </Typography>
                </div>
                {departament.map((creador, index) => (
                    <div key={index} style={{ display: "flex", marginLeft:'30px' }}>
                        <Image
                            style={{
                                height: "1.3rem",
                                width: "1.3rem",
                                marginTop: "20px",
                                marginRight: '10px',
                            }}
                            alt=""
                            {...doc}
                        ></Image>
                        <Typography gutterBottom variant="h6" component="div" style={{marginTop:'15px'}}>
                            {creador.titulo}
                        </Typography>

                        {/* <Typography gutterBottom variant="h5" component="div">
                            {creador.titulo}
                        </Typography> */}
                    </div>
                ))}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </MainLayout>
        </>
    );
};

export default ViewBaseConocimiento;
