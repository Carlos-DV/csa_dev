import { useRouter } from "next/router";
import { Footer, MainLayout } from "../../components/layouts";
import { useEffect, useState } from "react";
import { baseConomientoAPI } from "../../server";
import { Typography } from "@mui/material";
import maletin from "../../assets/image/maletin.png";
import doc from "../../assets/image/docs.png";
import portafolio from "../../assets/image/maletin.gif";
import Image from "next/image";

const PkDepartmentPrivado = () => {
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

    const handleRedirect = (pkNotas: any, contenido: any) => {
        router.push({
            pathname: '/base-conocimiento/View/',
            query: { pkNotas: pkNotas, contenido: contenido },
        });
    }

    const handlerTemas = () => {
        baseConomientoAPI.getRegisterTemas(pkDepartment).then((res) => {
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingLeft: "150px",
                    }}
                >
                    {Array.from(new Set(departament.map((creador) => creador.tema))).map(
                        (tema, index) => (
                            <div
                                key={index}
                                style={{
                                    marginRight: "30px",
                                    marginBottom: "20px",
                                    width: "30%",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <Image
                                        style={{
                                            height: "2.8rem",
                                            width: "2.8rem",
                                            //marginTop: "5px",
                                            marginRight: "15px",
                                        }}
                                        alt=""
                                        src={portafolio}
                                    ></Image>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        style={{ marginTop: "10px", fontWeight: 'Bold' }}
                                    >
                                        {tema}
                                    </Typography>
                                </div>
                                {departament
                                    .filter((item) => item.tema === tema)
                                    .map((item, subIndex) => (
                                        <div
                                            key={subIndex}
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
                                                {...doc}
                                            ></Image>
                                            <Typography onClick={() => handleRedirect(item.pkNotas, item.contenido)} gutterBottom style={{ fontSize: "16px" }} >
                                                {item.titulo}
                                            </Typography>
                                        </div>
                                    ))}
                            </div>
                        )
                    )}
                </div>
                <br></br>
                <br></br>
                <br></br>
            </MainLayout>
            <Footer></Footer>
        </>
    );
};

export {PkDepartmentPrivado};