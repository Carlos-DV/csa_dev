'use client'
//react
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
//next
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/router';
//interfaces
import { IQuality, IToken } from "../../interfaces";
//material iu
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
//componentes
import { SnackbarAlert, Spinner } from "../shared";
//api
import { ticketAPI } from "../../server";

const QualityService = () => {

    const seachParams = useSearchParams();
    const token = seachParams.get('token')
    const router = useRouter();

    const [checkToken, setCheckToken] = useState<IToken>({
        pkTicket: 0,
        token: false,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<IQuality>({
        pkQuality: 0,
        fkTicket: 0,
        comment: '',
        number: 0,
        text: ''
    })

    // Snackbar
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarType, setSnackBarType] = useState('info');
    const [snackBarMessage, setSnackBarMessage] = useState("");

    useEffect(() => {
        const validToken = async () => {
            try {
                if (token && token !== '') {
                    const res = await ticketAPI.validToken(token);
                    setCheckToken(res);
                    setSnackBarType('success');
                    setSnackBarMessage('Token Validado');
                    setOpenSnackBar(true);
                }
            } catch (error) {
                setCheckToken({
                    pkTicket: 0,
                    token: false,
                });
                console.log(error);
                setSnackBarType('error');
                setSnackBarMessage('Token Invalido');
                setOpenSnackBar(true);
            } finally {
                setLoading(false);
            }
        }
        validToken();
    }, [token])

    const getNumberFromText = (text: string): number => {
        switch (text) {
            case 'excelente':
                return 5;
            case 'muy bien':
                return 4;
            case 'bien':
                return 3;
            case 'malo':
                return 2;
            default:
                return 1;
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'text') {
            setFormData({
                ...formData,
                [name]: value,
                number: getNumberFromText(value),
                fkTicket: checkToken.pkTicket,
            });

        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([formData.text, formData.number].includes("")) {
            console.log("Errror");
            setSnackBarType('error');
            setSnackBarMessage('Selecciona al menos una calificación');
            setOpenSnackBar(true);
            return;
        }
        console.log(formData)
        try {
            const data = await ticketAPI.createQuality(formData);
            console.log("enviadoo..." + data)
            setSnackBarType('success');
            setSnackBarMessage('Mensaje enviado');
            setOpenSnackBar(true);
            setTimeout(() => {
                router.push('/');
            }, 5000);
        } catch (error) {
            setSnackBarType('error');
            setSnackBarMessage(`${error}`);
            setOpenSnackBar(true);
            setTimeout(() => {
                router.push('/');
            }, 5000);
        }

    }
    // if (loading) return <Spinner />
    return (
        <>
            {
                loading
                    ? <Spinner /> :
                    checkToken.token
                        ?
                        (
                            <form
                                onSubmit={handleSubmit}
                            >
                                <Paper
                                    sx={{
                                        borderRadius: 5,
                                        boxShadow: 10,
                                        margin: '0 auto',
                                        padding: '1rem',
                                        backgroundColor: '#ffffffd1',
                                        width: { xs: '90%', md: '70%', lg: '40%' }
                                    }}
                                >
                                    <Typography sx={{ textTransform: 'capitalize', fontSize: '1rem', textAlign: 'center', fontWeight: '500', marginTop: '0.5rem', marginBottom: '0.5rem', padding: '0.4rem' }}>califica nuestra atención y servicio según tu experiencia</Typography>
                                    <Typography sx={{ fontWeight: '400', paddingLeft: '1rem' }}>Debes seleccionar una para calificar</Typography>
                                    <RadioGroup
                                        // onChange={(e) => setRating(e.target.value)}
                                        id="text"
                                        name="text"
                                        onChange={(e) => handleChange(e)}
                                        value={formData.text}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            margin: '0.5rem',
                                            justifyContent: 'space-around',
                                            // alignItems: 'center',
                                            // alignContent: 'center',
                                            // padding: '1rem',
                                            // gap: '1rem',
                                        }}
                                    >
                                        <Stack
                                            direction={'column'}
                                            sx={{
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <FormControlLabel
                                                value="pesimo"
                                                control={<Radio sx={{ display: 'none' }} />}
                                                label={
                                                    <>
                                                        {
                                                            formData.text === 'pesimo' ?
                                                                <>
                                                                    <SentimentVeryDissatisfiedIcon sx={{
                                                                        fontSize: '2.3rem',
                                                                        color: '#fff',
                                                                        backgroundColor: 'error.main',
                                                                        borderRadius: '100%',

                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem', fontWeight: '700' }}>Pesimo</Typography>
                                                                </>
                                                                :
                                                                <>
                                                                    <SentimentVeryDissatisfiedIcon sx={{
                                                                        fontSize: '2rem',
                                                                        color: 'error.light',
                                                                        transition: 'transform .25s ease-out',
                                                                        '&:hover': {
                                                                            cursor: 'pointer',
                                                                            transform: 'scale(1.05)',
                                                                            color: '#fff',
                                                                            backgroundColor: 'error.main',
                                                                            borderRadius: '100%'
                                                                        }
                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem' }}>Pesimo</Typography>
                                                                </>
                                                        }
                                                    </>
                                                }
                                            />
                                        </Stack>
                                        <Stack
                                            direction={'column'}
                                            sx={{
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <FormControlLabel
                                                value="malo"
                                                control={<Radio sx={{ display: 'none' }} />}
                                                label={
                                                    <>
                                                        {
                                                            formData.text === 'malo' ?
                                                                <>
                                                                    <SentimentDissatisfiedIcon sx={{
                                                                        fontSize: '2.3rem',
                                                                        color: '#fff',
                                                                        backgroundColor: 'error.main',
                                                                        borderRadius: '100%',

                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem', fontWeight: '700' }}>Malo</Typography>
                                                                </>
                                                                :
                                                                <>
                                                                    <SentimentDissatisfiedIcon sx={{
                                                                        fontSize: '2rem',
                                                                        color: 'error.light',
                                                                        transition: 'transform .25s ease-out',
                                                                        '&:hover': {
                                                                            cursor: 'pointer',
                                                                            transform: 'scale(1.05)',
                                                                            color: '#fff',
                                                                            backgroundColor: 'error.main',
                                                                            borderRadius: '100%'
                                                                        }
                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem' }}>Malo</Typography>
                                                                </>
                                                        }
                                                    </>
                                                }
                                            />
                                        </Stack>
                                        <Stack
                                            direction={'column'}
                                            sx={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <FormControlLabel
                                                value="bien"
                                                control={<Radio sx={{ display: 'none' }} />}
                                                label={
                                                    <>
                                                        {
                                                            formData.text === 'bien'
                                                                ?
                                                                <>
                                                                    <SentimentNeutralIcon sx={{
                                                                        fontSize: '2.3rem',
                                                                        color: '#fff',
                                                                        backgroundColor: 'warning.main',
                                                                        borderRadius: '100%'
                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem', fontWeight: '700' }}>Bien</Typography>
                                                                </>
                                                                :
                                                                <>
                                                                    <SentimentNeutralIcon sx={{
                                                                        fontSize: '2rem',
                                                                        transition: 'transform .25s ease-out',
                                                                        color: 'warning.light',
                                                                        '&:hover': {
                                                                            cursor: 'pointer',
                                                                            transform: 'scale(1.05)',
                                                                            color: '#fff',
                                                                            backgroundColor: 'warning.main',
                                                                            borderRadius: '100%'
                                                                        }
                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem' }}>Bien</Typography>
                                                                </>
                                                        }
                                                    </>
                                                }
                                            />
                                        </Stack>
                                        <Stack
                                            direction={'column'}
                                            sx={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <FormControlLabel
                                                value="muy bien"
                                                control={<Radio sx={{ display: 'none' }} />}
                                                label={
                                                    <>
                                                        {
                                                            formData.text === 'muy bien'
                                                                ?
                                                                <>
                                                                    <SentimentSatisfiedIcon sx={{
                                                                        fontSize: '2.3rem',
                                                                        color: '#fff',
                                                                        backgroundColor: 'success.main',
                                                                        borderRadius: '100%',

                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem', fontWeight: '700' }}>Muy Bien</Typography>
                                                                </>
                                                                :
                                                                <>
                                                                    <SentimentSatisfiedIcon sx={{
                                                                        fontSize: '2rem',
                                                                        color: 'success.light',
                                                                        transition: 'transform .25s ease-out',
                                                                        '&:hover': {
                                                                            cursor: 'pointer',
                                                                            transform: 'scale(1.05)',
                                                                            color: '#fff',
                                                                            backgroundColor: 'success.main',
                                                                            borderRadius: '100%'
                                                                        }
                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem' }}>Muy Bien</Typography>
                                                                </>
                                                        }
                                                    </>
                                                }
                                            />
                                        </Stack>
                                        <Stack
                                            direction={'column'}
                                            sx={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <FormControlLabel
                                                value="excelente"
                                                control={<Radio sx={{ display: 'none' }} />}
                                                label={
                                                    <>
                                                        {
                                                            formData.text === 'excelente'
                                                                ?
                                                                <>
                                                                    <SentimentVerySatisfiedIcon sx={{
                                                                        fontSize: '2.3rem',
                                                                        color: '#fff',
                                                                        backgroundColor: 'success.main',
                                                                        borderRadius: '100%',

                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem', fontWeight: '700' }}>Excelente</Typography>
                                                                </>
                                                                :
                                                                <>
                                                                    <SentimentVerySatisfiedIcon sx={{
                                                                        fontSize: '2rem',
                                                                        color: 'success.light',
                                                                        transition: 'transform .25s ease-out',
                                                                        '&:hover': {
                                                                            cursor: 'pointer',
                                                                            transform: 'scale(1.05)',
                                                                            color: '#fff',
                                                                            backgroundColor: 'success.main',
                                                                            borderRadius: '100%'
                                                                        }
                                                                    }} />
                                                                    <Typography sx={{ padding: '0.4rem' }}>Excelente</Typography>
                                                                </>
                                                        }
                                                    </>
                                                }
                                            />
                                        </Stack>
                                    </RadioGroup>
                                    <Box
                                        sx={{ padding: '1rem' }}>
                                        <TextField
                                            id="comment"
                                            name="comment"
                                            value={formData.comment}
                                            onChange={handleChange}
                                            label="¿Deseas dejar un comentario?"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Box>
                                    <Stack direction="row" justifyContent="flex-end" sx={{ paddingRight: '1rem' }}>
                                        {/* <AnimateButton> */}
                                        <Button
                                            variant='contained'
                                            size='small'
                                            type='submit'
                                        >
                                            Enviar
                                        </Button>
                                        {/* </AnimateButton> */}
                                    </Stack>
                                </Paper>
                            </form>
                        )
                        :
                        (
                            <Typography
                                sx={{
                                    fontSize: '1.5rem',
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                }}
                            >Error en el token</Typography>
                        )
                // )}
            }
            <SnackbarAlert
                openSnackBar={openSnackBar}
                snackBarMessage={snackBarMessage}
                setOpenSnackBar={setOpenSnackBar}
                snackBarType={snackBarType}
            />
        </>
    )
}

export { QualityService } 