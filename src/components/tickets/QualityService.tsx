'use client'
//next
import { useSearchParams } from "next/navigation";
//material iu
import Paper from "@mui/material/Paper";
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
//ant
// import AnimateButton from 'components/@extended/AnimateButton';
// import { useTicket } from "hooks";

const QualityService = () => {
    
    const seachParams = useSearchParams();
    console.log(seachParams.get('token'));

    return (
        <>
            <Paper
                sx={{
                    borderRadius: 5,
                    boxShadow: 10,
                    margin: '0 auto',
                    padding: '1rem',
                    backgroundColor: '#ffffffd1',
                    width: { xs: '90%', md:'70%', lg:'40%'}
                }}
            >
                <Typography sx={{ textTransform: 'capitalize', fontSize: '1rem', textAlign: 'center', fontWeight: '500', marginTop: '0.5rem', marginBottom: '0.5rem', padding:'0.4rem' }}>califica nuestra atención y servicio según tu experiencia</Typography>
                <Typography sx={{ fontWeight: '400', paddingLeft:'1rem' }}>Debes seleccionar una para calificar</Typography>
                <ButtonGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        alignContent: 'center',
                        padding: '1rem',
                        gap: '1rem',
                    }}
                >
                    <Stack
                        direction={'column'}
                        sx={{
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <IconButton
                            sx={{
                                color: 'error.light',
                                transition: 'transform .25s ease-out',
                                '&:hover': {
                                    cursor: 'pointer',
                                    transform: 'scale(1.05)',
                                    color: '#fff',
                                    backgroundColor: 'error.main',
                                    borderRadius: '100%'
                                }
                            }}
                        >
                            <SentimentVeryDissatisfiedIcon sx={{ fontSize: '2rem', }} />
                        </IconButton>
                        <Typography sx={{ padding: '0.4rem' }}>Malo</Typography>
                    </Stack>
                    <Stack
                        direction={'column'}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <IconButton
                            sx={{
                                color: 'warning.light',
                                transition: 'transform .25s ease-out',
                                '&:hover': {
                                    cursor: 'pointer',
                                    transform: 'scale(1.05)',
                                    color: '#fff',
                                    backgroundColor: 'warning.main',
                                    borderRadius: '100%'
                                }
                            }}
                        >
                            <SentimentSatisfiedIcon sx={{ fontSize: '2rem', }} />
                        </IconButton>
                        <Typography sx={{ padding: '0.4rem' }}>Bien</Typography>
                    </Stack>
                    <Stack
                        direction={'column'}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <IconButton
                            sx={{
                                color: 'success.light',
                                transition: 'transform .25s ease-out',
                                '&:hover': {
                                    cursor: 'pointer',
                                    transform: 'scale(1.05)',
                                    color: '#fff',
                                    backgroundColor: 'success.main',
                                    borderRadius: '100%'
                                }
                            }}
                        >
                            <SentimentVerySatisfiedIcon sx={{ fontSize: '2rem', }} />
                        </IconButton>
                        <Typography sx={{ padding: '0.4rem' }}>Excelente</Typography>
                    </Stack>
                </ButtonGroup>
                <Box
                    sx={{ padding: '1rem' }}>
                    <TextField
                        id="filled-multiline-static"
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
        </>
    )
}

export { QualityService } 