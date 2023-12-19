import { useEffect, useState } from "react";
import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { BaseConocimientoPublico, MainLayout } from "../../components";
import { useRouter } from "next/router";
import { baseConomientoAPI } from "../../server";

const View = () => {

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
                console.log('sssss', e)
            })
    };

    const calculateDateDifference = (date: Date) => {
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - date.getTime();

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (days === 0) {
            return 'Hoy';
        } else if (days === 1) {
            return 'Ayer';
        } else if (days < 7) {
            return `${days} días atrás`;
        } else if (months < 1) {
            return `${Math.floor(days / 7)} semanas atrás`;
        } else if (years < 1) {
            return `${months} meses atrás`;
        } else {
            return `${years} años atrás`;
        }
    };


    const fetctSearch = () => {
        baseConomientoAPI.getSearchBaseConocimiento(pkNotas).then((res) => {
            // Asegúrate de ajustar esto según la estructura real de tu respuesta
            const creadores = res.map((item: any) => ({
                nombre: item.nombre || '',
                created: calculateDateDifference(new Date(item.created)),
                modified: calculateDateDifference(new Date(item.modified)),
            }));
            setCreadores(creadores);
        });
    };

    useEffect(() => {
        fetctSearch();
    }, [pkNotas]);

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
                {creadores.map((creador, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', paddingLeft: 12 }}>
                            <div style={{ paddingRight: '20px' }}>
                                <h4>{creador.nombre}</h4>
                                <h4>Creado: {creador.created}</h4>
                            </div>
                            <div>
                                <h4>{creador.nombre}</h4>
                                <h4>Ultima actualizacion: {creador.modified}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </MainLayout>
        </>
    );
}

export default View;