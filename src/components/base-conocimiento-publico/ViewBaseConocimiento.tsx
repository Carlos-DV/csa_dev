import { useEffect, useState } from "react";
import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Footer, MainLayout } from "../../components/layouts";
import { useRouter } from "next/router";
import { baseConomientoAPI } from "../../server";
import { FilePdfOutlined, FileWordOutlined, FileExcelOutlined } from "@ant-design/icons";


const ViewBaseConocimiento = () => {

    const [key, setKey] = useState('');
    const [creadores, setCreadores] = useState<
        { nombre: string; created: string; modified: string }[]
    >([]);
    const router = useRouter();

    const SunEditor = dynamic(() => import("suneditor-react"), {
        ssr: false,
    });

    const contenido = Array.isArray(router.query.contenido)
        ? router.query.contenido[0]
        : router.query.contenido || '';
    console.log('datos', contenido);

    const pkNotas = Array.isArray(router.query.pkNotas)
        ? router.query.pkNotas[0]
        : router.query.pkNotas || '';

    console.log('pk', pkNotas);

    const archivo = Array.isArray(router.query.archivo)
        ? router.query.archivo[0]
        : router.query.archivo || null;

    console.log('name', archivo);

    useEffect(() => {
        fetctSearch();
    }, [pkNotas]);

    if (!archivo) {
        return <div>No hay archivos disponibles.</div>;
    }
    console.log(archivo)
    const enlacesArray = archivo.split(',').map(link => link.trim());
    console.log('lista de link', enlacesArray);

    function obtenerParteAnteFinal(url: any) {
        const partes = url.split('/');
        return partes.slice(-1).join('/');
    }

    const IdAWSS3 = obtenerParteAnteFinal(contenido);
    console.log('obtener key', IdAWSS3);

    const handleObject = () => {
        baseConomientoAPI.GetObject(IdAWSS3).then((res) => {
            setKey(res);
            console.log('endpoint', res);
        }).
            catch((e) => {
                console.log('error', e)
            })
    };

    const calculateDateDifference = (inputDate: Date | null) => {


        if (!inputDate || isNaN(inputDate.getTime()) || inputDate.getFullYear() <= 1) {
            return 'Hoy'; // Si la fecha es nula o inválida, devolver 'Hoy'
        }

        // Convertir ambas fechas a la medianoche del mismo día
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputDateCopy = new Date(inputDate);
        inputDateCopy.setHours(0, 0, 0, 0);

        const timeDifference = currentDate.getTime() - inputDateCopy.getTime();

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (days === 0) {
            return 'Hoy';
        } else if (days === 1) {
            return 'Ayer';
        } else if (days < 7) {
            return `${days} día${days !== 1 ? 's' : ''} atrás`;
        } else if (weeks < 1) {
            return `${days} día${days !== 1 ? 's' : ''} atrás`; // Cambiado a días si es menos de una semana
        } else if (months < 1) {
            return `${weeks} semana${weeks !== 1 ? 's' : ''} atrás`;
        } else if (years < 1) {
            return `${months} mes${months !== 1 ? 'es' : ''} atrás`;
        } else {
            return `${years} año${years !== 1 ? 's' : ''} atrás`;
        }
    };

    const fetctSearch = async () => {
        await baseConomientoAPI.getSearchBaseConocimiento(pkNotas).then((res) => {
            // Asegúrate de ajustar esto según la estructura real de tu respuesta
            const creadores = res.map((item: any) => ({
                nombre: item.nombre || '',
                created: calculateDateDifference(new Date(item.created)),
                modified: calculateDateDifference(new Date(item.modified)),
            }));
            setCreadores(creadores);
        });
    };

    handleObject();

    return (
        <>
            <MainLayout>
                <br></br><br></br><br></br>
                <SunEditor
                    lang="es"
                    // getSunEditorInstance={getSunEditorInstance} 
                    width="100%"
                    height="auto"
                    hideToolbar={true}
                    // defaultValue="Teclea...."
                    disable={true} // Para deshabilitar el editor
                    disableToolbar={true} // Para ocultar la barra de herramientas
                    setContents={key} // Contenido inicial
                />
                <div style={{ display: 'flex' }}>
                    {enlacesArray.map((enlace, index) => (
                        <div key={index}>
                            <a href={enlace} target="_blank" rel="noopener noreferrer">
                                {/* Agregar condición para renderizar la imagen según la extensión del archivo */}
                                {enlace !== null && (() => {
                                    const url = new URL(enlace);
                                    const path = url.pathname;
                                    const extensionMatch = path.match(/\.([^.]+)$/);
                                    const extension = extensionMatch ? extensionMatch[1].toLowerCase() : '';

                                    switch (extension) {
                                        case 'pdf':
                                            return <FilePdfOutlined alt={'Imagen PDF'} style={{ fontSize: '60px', height: '100px' }} />;
                                        case 'docx':
                                            return <FileWordOutlined alt={'Imagen DOCX'} style={{ fontSize: '60px', height: '100px' }} />;
                                        case 'xlsx':
                                            return <FileExcelOutlined alt={'Imagen XLSX'} style={{ fontSize: '60px', height: '100px' }} />;
                                        case 'doc':
                                            return <FileWordOutlined alt={'Imagen DOC'} style={{ fontSize: '60px', height: '100px' }} />;
                                        default:
                                            return <div>No hay imagen disponible.</div>;
                                    }
                                })()}
                            </a>
                        </div>
                    ))}
                </div>
                {creadores.map((creador, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', paddingLeft: 12 }}>
                            <div style={{ paddingRight: '20px' }}>
                                <h4 style={{ marginBottom: '0px' }}>{creador.nombre}</h4>
                                <p style={{ marginTop: '0px' }}>Creado: {creador.created}</p>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: '0px' }}>{creador.nombre}</h4>
                                {creador.modified !== 'Hoy' && creador.modified !== 'Ayer' ? (
                                    <p style={{ marginTop: '0px' }}>Ultima actualizacion: {creador.modified}</p>
                                ) : (
                                    <p style={{ marginTop: '0px' }}>Ultima actualizacion: {creador.modified === 'Hoy' ? 'Hoy' : 'Ayer'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </MainLayout>
            <Footer></Footer>
        </>
    );
}

export { ViewBaseConocimiento };